# Cradle - A Schema Pipeline [![Build Status](https://gatewayapps.visualstudio.com/Cradle/_apis/build/status/Cradle%20CI)](https://gatewayapps.visualstudio.com/Cradle/_build/latest?definitionId=34)

## What is Cradle?

Cradle is a tool for loading data models from one place and emitting it to another. This can be leveraged to eliminate the manual creation of redundant and tedious code within your project/application. We provide the ability to create specs that can, in turn, be executed against emitters with the output resulting in the code you wish to use.

[Getting Started](#getting-started)  
[An Example Cradle Spec](#an-example-cradle-spec)  
[Cradle Schema](#cradle-schema)  
[The Cradle CLI](#the-cradle-cli)  
[Configuration](#configuration)  
[Loaders](#loaders)  
[Emitters](#emitters)

## Getting Started

To get started, first install Cradle in your local project folder:
`npm i --save-dev @cradlejs/core`

## The Cradle Flow

Cradle was built to load a schema from any source via CradleLoaders and emit to any destination via CradleEmitters.

When you execute `npx cradle emit`, it will load your schema, then send it to each of your configured emitters. We have developed a few emitters for you to use (@cradlejs/template-emitter and @cradlejs/react-emitter), but the API is simple to understand and implement.

## Cradle Loader API

If you want to develop a custom Cradle Loader, (for instance, loading from Postgres or Mongo), all you have to do is implement ICradleLoader in a npm module.

```
    prepareLoader: (options: {[key: string]: any}, console: IConsole) => Promise < void >
    readModelNames: () => Promise < string[] >
    readModelPropertyNames: (modelName: string) => Promise < string[] >
    readModelPropertyType: (modelName: string, propertyName: string) => Promise < PropertyType >
    readModelReferenceNames: (modelName: string) => Promise < string[] >
    readModelReferenceType: (modelName: string, referenceName: string) => Promise < ModelReference >
    readModelMetadata: (modelName: string) => Promise < object >
    finalizeSchema: (schema: CradleSchema) => Promise < CradleSchema >
    loadSchema: () => Promise<CradleSchema>
```

You can reference @cradlejs/sql-loader for a functioning loader

## Cradle Emitter API

You can also write a custom emitter. Suppose you wanted to write your schema to a database, you could implement a sql-emitter by implementing the ICradleEmitter interface.

```
  prepareEmitter(options: IEmitterOptions, console: IConsole)
  emitSchema(schema: CradleSchema)
```

You can reference @cradlejs/template-emitter or @cradlejs/react-emitter to see a functioning emitter.

## An Example Cradle Spec

Cradle provides a custom loader and emitter out of the box called spec. The cradle spec is something we developed for easily modeling our data in an agnostic way. Here's a sample

```
Film:
  properties:
    id: integer primary auto(1,1)
    name: string(100)
    totalBoxOffice: decimal min(0)
    releaseDate: datetime
    isDeleted: boolean default(false) delete
    actors:
      isArray: true
      modelRef: Actor
  operations:
    createFilm:
      returns: Film
      arguments:
        name:

Actor:
  properties:
    id: integer primary auto(1,1)
    firstName: string(100)
    lastName: string(100)
    dateOfBirth: datetime
```

To learn more about defining a cradle spec, see the wiki page [here](https://github.com/gatewayapps/cradle/wiki/The-Cradle-Spec)

## Cradle Schema

Let's see what a cradle schema looks like as a JSON object:

```
{
  "Models": [
    {
      "Name": "Film",
      "Properties": {
        "id": {
          "TypeName": "Integer",
          "IsPrimaryKey": true,
          "AllowNull": false,
          "Unique": false,
          "Autogenerate": {
            "Seed": 1,
            "Increment": 1
          }
        },
        "name": {
          "TypeName": "String",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false,
          "MaximumLength": 100
        },
        "totalBoxOffice": {
          "TypeName": "Decimal",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false,
          "MinimumValue": 0,
          "Precision": 18,
          "Scale": 2
        },
        "releaseDate": {
          "TypeName": "DateTime",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "isDeleted": {
          "TypeName": "Boolean",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "DefaultValue": false,
          "Unique": false
        },
        "actors": {
          "TypeName": "Array",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "DefaultValue": [],
          "Unique": false,
          "MemberType": {
            "TypeName": "ModelReference",
            "IsPrimaryKey": false,
            "AllowNull": true,
            "DefaultValue": null,
            "Unique": false,
            "ModelName": "Actor",
            "ModelType": {
              "TypeName": "Object",
              "IsPrimaryKey": false,
              "AllowNull": false,
              "Unique": false,
              "Members": {
                "id": {
                  "TypeName": "Integer",
                  "IsPrimaryKey": true,
                  "AllowNull": false,
                  "Unique": false,
                  "Autogenerate": {
                    "Seed": 1,
                    "Increment": 1
                  }
                },
                "firstName": {
                  "TypeName": "String",
                  "IsPrimaryKey": false,
                  "AllowNull": false,
                  "Unique": false,
                  "MaximumLength": 100
                },
                "lastName": {
                  "TypeName": "String",
                  "IsPrimaryKey": false,
                  "AllowNull": false,
                  "Unique": false,
                  "MaximumLength": 100
                },
                "dateOfBirth": {
                  "TypeName": "DateTime",
                  "IsPrimaryKey": false,
                  "AllowNull": false,
                  "Unique": false
                }
              }
            }
          }
        }
      },
      "References": {}
    },
    {
      "Name": "Actor",
      "Properties": {
        "id": {
          "TypeName": "Integer",
          "IsPrimaryKey": true,
          "AllowNull": false,
          "Unique": false,
          "Autogenerate": {
            "Seed": 1,
            "Increment": 1
          }
        },
        "firstName": {
          "TypeName": "String",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false,
          "MaximumLength": 100
        },
        "lastName": {
          "TypeName": "String",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false,
          "MaximumLength": 100
        },
        "dateOfBirth": {
          "TypeName": "DateTime",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        }
      },
      "References": {}
    }
  ]
}
```

- `Models`: is an array of the models defined in the cradle spec file(s)
- `TypeName`: is the cradle data type
- `AllowNull`: is true if the `?` notation was used to define the property
- `Unique`: is true if the `unique` keyword was used to define the property
- If the property is an array, then there is a `MemberType` property which contains the values and data type of the array

## The Cradle CLI

Cradle provides a CLI with a few different commands:

### verify

Use the `verify` command to ensure that any given spec file is valid:  
`npx cradle verify -c [path to cradle config]`

This command will output the cradle spec in the terminal or command window in which the command was executed. Any warnings or errors will also be output.

### emit

Use the `emit` command to run the specified emitter:  
`npx cradle emit -c [path to cradle config] -e spec`

This command will run the specified emitters(see the Configuration section). Use the `-e` argument to specify a particular emitter or omit it to run all configured emitters.

## Configuration

Cradle uses a JavaScript based configuration file in order to execute loading the spec and executing emitters. Below is an example configuration file:

```
const cradle = require('@cradlejs/core')
const path = require('path')

const loaderOptions = new cradle.LoaderOptions('spec', {
    source: './examples/specs/cradle-base.yaml'
}, console)

const emitterOpts = [
    new cradle.EmitterOptions('schemaTest', '@cradlejs/template-emitter', {
        sourcePath: './examples/templates/schemaTest.handlebars',
        outputPath: './examples/server/test/schemaTest.ts',
        overwriteExisting: true,
        mode: 'schema',
        shouldEmit: (model) => {
            return model.Meta !== undefined && model.Meta.topLevel
        }
    }, console),
    new cradle.EmitterOptions('serverModels', '@cradlejs/template-emitter', {
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
    new cradle.EmitterOptions('schemaTest', '@cradlejs/template-emitter', {
        sourcePath: './examples/templates/schemaTest.handlebars',
        outputPath: './examples/server/test/schemaTest.ts',
        overwriteExisting: true,
        mode: 'schema',
        shouldEmit: (model) => {
            return model.Meta !== undefined && model.Meta.topLevel
        }
    }, console),
    new cradle.EmitterOptions('serverModels', '@cradlejs/template-emitter', {
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
- [Cradle Template Emitter](https://github.com/gatewayapps/cradle-template-emitter): This emitter leverages Handlebars templating in order to generate pretty much any code desired
- [Cradle React Emitter](https://github.com/gatewayapps/cradle-react-emitter): This emitter generates basic React components for model properties. Rather than starting a UI from scratch, this emitter provides a starting point with functional components that can then be tweaked/altered.
