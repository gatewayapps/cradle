# Cradle - A Schema Pipeline 
## What is Cradle?
Cradle is a tool for loading data models from one place and outputting it to another. This can be leveraged to eliminate the manual creation of redundant and tedious code within your project/application. We provide the ability to create specs that can, in turn, be executed against emitters with the output resulting in the code you wish to use.

[Getting Started](#getting-started)   
[An Example Cradle Spec](#an-example-cradle-spec)   
[Cradle Schema](#cradle-schema)   
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
