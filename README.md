# Cradle - A Flexible Code Generator
## What is Cradle?
Cradle is a tool that can be used to eliminate the manual creation of redundant and tedious code within your project/application. We provide the ability to create specs and templates that can, in turn, be executed with the output resulting in the code you wish to use. Cradle doesn't care which language or platform you are using.

[Getting Started](#getting-started)   
[An Example Cradle Spec](#an-example-cradle-spec)   
[Defining Properties](#defining-properties)   
[Model References](#model-references)   
[Metadata](#metadata)   
[The Cradle CLI](#the-cradle-cli)   
[Configuration](#configuration)   
[Loaders](#loaders)   
[Emitters](#emitters)


## Getting Started
To get started, first install Cradle in your local project folder:
`npm i --save-dev @gatewayapps/cradle`

## An Example Cradle Spec
Cradle leverages the yaml document format for its spec files. Below is an example of a Cradle spec:
```
Training:
  properties:
    trainingId: integer primary auto(1,1)
    name: string(100)
    description: string?
    commonNameId: integer[]?
    attachmentLink: string?
    equipmentType: integer?
    isRecurring: boolean? default(0)
    recurringInterval: integer?
    recurringPeriod: string(10)?

    #nested object
    gracePeriod:
      isArray: true
      properties:
        graceInterval: string
        graceDuration: integer
        testExtended:
          properties:
            extendProperty: uniqueidentifier

    requiresSignOff: boolean? default(0)
    isDeleted: boolean default(0) delete
    createdBy:
      isArray: true
      modelRef: User
    createdBy2:
      isArray: true
      properties:
        birthday: datetime max(NOW)
    createdDate: datetime
    modifiedBy: integer max(100)
    modifiedDate: datetime
    externalCompletionPackage: string(255)?
    externalCompletionId: integer?
    isDocumentReview: boolean? default(0)
  references:
    Categories: multiple of Category via TrainingCategories
    CommonName: single of CommonName on commonNameId

User:
  properties:
    birthday: datetime max(NOW)

CommonName:
  properties:
    id: integer auto(1,1) primary unique
    uuid: uniqueidentifier auto unique
    uuidValue: uniqueidentifier default(00000000-0000-0000-0000-000000000000)
    commonName: string(100)
    deleted: boolean default(0)
    createdBy: integer
    createdDate: datetime default(NOW) min(1990-01-01)
    modifiedBy: integer
    modifiedDate: datetime default(NOW)

Category:
  meta:
    tableName: Categories
  properties:
    categoryId: integer auto(1,1) primary
    categoryName: string(100) allow("test", "test2")
    categoryDescription: string?
    deleted: boolean default(0)
    createdBy: integer allow(1, 2, 3, 4)
    createdDate: datetime
    modifiedBy: integer
    modifiedDate: datetime
  references:
    Trainings: multiple of Training via TrainingCategories

TrainingCategories:
  properties:
    trainingId: integer
    categoryId: integer
  references:
    Training: single of Training on trainingId
    Category: single of Category on categoryId

TrainingAssignment: ./TrainingAssignment.yaml#TrainingAssignment
UserTrainingDueDate: ./UserTrainingDueDate.yaml#UserTrainingDueDate
```

## Defining Properties
- Cradle can accept common data types. So if you want to define a string, you'd describe the property as `propertyName: string`
- Cradle can accept nullable properties. Just add a `?` to the end of the data type and the property is now nullable
- Cradle can accept default values. After the data type, just add `default(value)` where `value` is your default.
- At the moment, enumerations have to be defined inline. In order to do so, the pattern is `dataType allow(value1, value2, ...)`

## Model References
Referencing an entity within another Cradle entity is easy. Just make sure you've defined the other entity and then: 
```
    propertyName:
        modelRef: AnotherEntity
```
In the same manner, if the property needs to be an array of entities:
```
    propertyName:
        isArray: true
        modelRef: AnotherEntity
```
References could be defined as such:
```
EntityB:
    properties:
        primaryKey: integer primary auto(1,1)
ReferenceEntity:
    properties:
        id1: integer
        id2: integer
    references:
        EntityB: single of EntityB on primaryKey
Entity:
    properties:
        propertyA:
        ...
    references:
        propertyB: single of EntityB on primaryKey # this says "add a reference to EntityB using primaryKey"
        propertyC: multiple of EntityB via ReferenceEntity # this says "add a n to n reference of EntityB by cross referencing through ReferenceEntity"
```

Cradle supports the following syntax for defining References:
- `single of Entity on key`: from the Model, creates a reference to Entity on a particular key
- `single[?] of Entity`: from the model, creates a reference to Entity and returns the primary key properties from Entity
- `multiple of Entity via ReferenceEntity`: from the Model, creates a many-to-many reference from Entity via a cross reference table(ReferenceEntity)
- `multiple[?] of Entity`: from the Model, creates a reference to Entity and returns an array of the primary key properties from Entity


## Metadata
Metadata can be added to any entity by using the `meta` syntax. Any data you may need but doesn't need to be a property can be added here:
```
Entity:
  meta:
    tableName: theTableName
    someOtherThing: 1234AbCDe
```

## The Cradle CLI
Cradle provides a CLI that can be used to verify and generate spec files:

### verify
Use the `verify` command to ensure that any given spec file is valid:     
`npx cradle verify -c [path to cradle config]`

This command will output the cradle spec in the terminal or command window in which the command was executed. Any warnings or errors will also be output.

### emit
Use the `emit` command to generate code output:      
`npx cradle emit -c [path to cradle config] -e spec`

This command will generate code based on the configured emitters(see the Configuration section). Use the `-e` argument to specify a particular emitter or omit it to run all configured emitters.

## Configuration
Cradle uses a JavaScript based configuration file in order to execute loading the spec and emitting generated code. Below is an example configuration file:

```
const cradle = require('@gatewayapps/cradle')
const path = require('path')

const loaderOptions = new cradle.LoaderOptions('spec', {
    source: './examples/specs/cradle-base.yaml'
}, console)

const emitterOpts = [
    new cradle.EmitterOptions('schemaTest', '@gatewayapps/cradle-template-emitter', {
        sourcePath: './examples/templates/schemaTest.handlebars',
        outputPath: './examples/server/test/schemaTest.ts',
        overwriteExisting: true,
        mode: 'schema',
        shouldEmit: (model) => {
            return model.Meta !== undefined && model.Meta.topLevel
        }
    }, console),
    new cradle.EmitterOptions('serverModels', '@gatewayapps/cradle-template-emitter', {
        sourcePath: './examples/templates/serverModel.handlebars',
        outputPath: './examples/server/models/{{Name}}.ts',
        overwriteExisting: true,
        languageType: 'mongoose',
        shouldEmit: (model) => {
            return model.Meta !== undefined && model.Meta.topLevel
        }
    }, console)
]

module.exports = new cradle.CradleConfig(loaderOptions, emitterOpts)

```

Let's break down the configuration file in more detail:
```
const loaderOptions = new cradle.LoaderOptions('spec', {
    source: './examples/specs/cradle-base.yaml'
}, console)
```
This section configures the cradle spec loader. This is required in order to read the cradle spec files. The first option is the type of loader(`spec`), the second option is the location of the cradle spec file.

```
const emitterOpts = [
    new cradle.EmitterOptions('schemaTest', '@gatewayapps/cradle-template-emitter', {
        sourcePath: './examples/templates/schemaTest.handlebars',
        outputPath: './examples/server/test/schemaTest.ts',
        overwriteExisting: true,
        mode: 'schema',
        shouldEmit: (model) => {
            return model.Meta !== undefined && model.Meta.topLevel
        }
    }, console),
    new cradle.EmitterOptions('serverModels', '@gatewayapps/cradle-template-emitter', {
        sourcePath: './examples/templates/serverModel.handlebars',
        outputPath: './examples/server/models/{{Name}}.ts',
        overwriteExisting: true,
        languageType: 'mongoose',
        shouldEmit: (model) => {
            return model.Meta !== undefined && model.Meta.topLevel
        }
    }, console)
]
```
This section is configuring emitters. These two examples uses the [cradle template emitter](https://github.com/gatewayapps/cradle-template-emitter) in order to generate code. More information about these arguments can be found in the ReadMe for that particular library.

## Loaders
- Cradle Spec Loader: This is included in cradle and drives the loading of the cradle spec files
- [MSSQL Loader](cradle-mssql-loader): This loader can be used to read the database schema from a MSSQL database and generate a cradle spec

## Emitters
- Cradle Spec Emitter: This is included in cradle and can be used to output a generated spec file
- [Cradle Template Emitter](https://github.com/gatewayapps/cradle-template-emitter): This emitter leverages Handlebars  templating in order to generate pretty much any code desired
- [Cradle React Emitter](https://github.com/gatewayapps/cradle-react-emitter): This emitter generates basic React components for model properties. Rather than starting a UI from scratch, this emitter provides a starting point with functional components that can then be tweaked/altered.
