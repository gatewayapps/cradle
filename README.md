# Cradle - A Flexible Code Generator
## What is Cradle?
Cradle is a tool that can be used to eliminate the manual creation of redundant and tedious code within your project/application. We provide the ability to create specs and templates that can, in turn, be executed with the output resulting in the code you wish to use. Cradle doesn't care which language or platform you are using.

[Getting Started](#getting-started)   
[An Example Cradle Spec](#an-example-cradle-spec)   
[Cradle Schema](#cradle-schema)   
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

## Cradle Schema
Let's see what a cradle schema looks like:
```
{
  "Models": [
    {
      "Name": "Training",
      "Properties": {
        "trainingId": {
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
        "description": {
          "TypeName": "String",
          "IsPrimaryKey": false,
          "AllowNull": true,
          "Unique": false
        },
        "commonNameId": {
          "TypeName": "Array",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "DefaultValue": [],
          "Unique": false,
          "MemberType": {
            "TypeName": "Integer",
            "IsPrimaryKey": false,
            "AllowNull": true,
            "Unique": false
          }
        },
        "attachmentLink": {
          "TypeName": "String",
          "IsPrimaryKey": false,
          "AllowNull": true,
          "Unique": false
        },
        "equipmentType": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": true,
          "Unique": false
        },
        "isRecurring": {
          "TypeName": "Boolean",
          "IsPrimaryKey": false,
          "AllowNull": true,
          "DefaultValue": false,
          "Unique": false
        },
        "recurringInterval": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": true,
          "Unique": false
        },
        "recurringPeriod": {
          "TypeName": "String",
          "IsPrimaryKey": false,
          "AllowNull": true,
          "Unique": false,
          "MaximumLength": 10
        },
        "gracePeriod": {
          "TypeName": "Array",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "DefaultValue": [],
          "Unique": false,
          "MemberType": {
            "TypeName": "Object",
            "IsPrimaryKey": false,
            "AllowNull": true,
            "DefaultValue": null,
            "Unique": false,
            "Members": {
              "graceInterval": {
                "TypeName": "String",
                "IsPrimaryKey": false,
                "AllowNull": false,
                "Unique": false
              },
              "graceDuration": {
                "TypeName": "Integer",
                "IsPrimaryKey": false,
                "AllowNull": false,
                "Unique": false
              },
              "testExtended": {
                "TypeName": "Object",
                "IsPrimaryKey": false,
                "AllowNull": true,
                "DefaultValue": null,
                "Unique": false,
                "Members": {
                  "extendProperty": {
                    "TypeName": "UniqueIdentifier",
                    "IsPrimaryKey": false,
                    "AllowNull": false,
                    "Unique": false
                  }
                }
              }
            }
          }
        },
        "requiresSignOff": {
          "TypeName": "Boolean",
          "IsPrimaryKey": false,
          "AllowNull": true,
          "DefaultValue": false,
          "Unique": false
        },
        "isDeleted": {
          "TypeName": "Boolean",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "DefaultValue": false,
          "Unique": false
        },
        "createdBy": {
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
            "ModelName": "User",
            "ModelType": {
              "TypeName": "Object",
              "IsPrimaryKey": false,
              "AllowNull": false,
              "Unique": false,
              "Members": {
                "birthday": {
                  "TypeName": "DateTime",
                  "IsPrimaryKey": false,
                  "AllowNull": false,
                  "Unique": false,
                  "MaxValue": "DateTimeNow"
                }
              }
            }
          }
        },
        "createdBy2": {
          "TypeName": "Array",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "DefaultValue": [],
          "Unique": false,
          "MemberType": {
            "TypeName": "Object",
            "IsPrimaryKey": false,
            "AllowNull": true,
            "DefaultValue": null,
            "Unique": false,
            "Members": {
              "birthday": {
                "TypeName": "DateTime",
                "IsPrimaryKey": false,
                "AllowNull": false,
                "Unique": false,
                "MaxValue": "DateTimeNow"
              }
            }
          }
        },
        "createdDate": {
          "TypeName": "DateTime",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "modifiedBy": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false,
          "MaximumValue": 100
        },
        "modifiedDate": {
          "TypeName": "DateTime",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "externalCompletionPackage": {
          "TypeName": "String",
          "IsPrimaryKey": false,
          "AllowNull": true,
          "Unique": false,
          "MaximumLength": 255
        },
        "externalCompletionId": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": true,
          "Unique": false
        },
        "isDocumentReview": {
          "TypeName": "Boolean",
          "IsPrimaryKey": false,
          "AllowNull": true,
          "DefaultValue": false,
          "Unique": false
        }
      },
      "References": {
        "Categories": {
          "ForeignModel": "Category",
          "AllowNull": false,
          "RelationType": 3,
          "LocalProperty": "",
          "ProxyModel": "TrainingCategories"
        },
        "CommonName": {
          "ForeignModel": "CommonName",
          "AllowNull": false,
          "RelationType": 1,
          "LocalProperty": "commonNameId"
        }
      }
    },
    {
      "Name": "User",
      "Properties": {
        "birthday": {
          "TypeName": "DateTime",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false,
          "MaxValue": "DateTimeNow"
        }
      },
      "References": {}
    },
    {
      "Name": "CommonName",
      "Properties": {
        "id": {
          "TypeName": "Integer",
          "IsPrimaryKey": true,
          "AllowNull": false,
          "Unique": true,
          "Autogenerate": {
            "Seed": 1,
            "Increment": 1
          }
        },
        "uuid": {
          "TypeName": "UniqueIdentifier",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": true,
          "Autogenerate": true
        },
        "uuidValue": {
          "TypeName": "UniqueIdentifier",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "DefaultValue": "00000000-0000-0000-0000-000000000000",
          "Unique": false
        },
        "commonName": {
          "TypeName": "String",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false,
          "MaximumLength": 100
        },
        "deleted": {
          "TypeName": "Boolean",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "DefaultValue": false,
          "Unique": false
        },
        "createdBy": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "createdDate": {
          "TypeName": "DateTime",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "DefaultValue": "DateTimeNow",
          "Unique": false,
          "MinValue": "1990-01-01T00:00:00.000Z"
        },
        "modifiedBy": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "modifiedDate": {
          "TypeName": "DateTime",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "DefaultValue": "DateTimeNow",
          "Unique": false
        }
      },
      "References": {}
    },
    {
      "Name": "Category",
      "Meta": {
        "tableName": "Categories"
      },
      "Properties": {
        "categoryId": {
          "TypeName": "Integer",
          "IsPrimaryKey": true,
          "AllowNull": false,
          "Unique": false,
          "Autogenerate": {
            "Seed": 1,
            "Increment": 1
          }
        },
        "categoryName": {
          "TypeName": "String",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false,
          "AllowedValues": [
            "\"test\"",
            "\"test2\""
          ],
          "MaximumLength": 100
        },
        "categoryDescription": {
          "TypeName": "String",
          "IsPrimaryKey": false,
          "AllowNull": true,
          "Unique": false
        },
        "deleted": {
          "TypeName": "Boolean",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "DefaultValue": false,
          "Unique": false
        },
        "createdBy": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "createdDate": {
          "TypeName": "DateTime",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "modifiedBy": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "modifiedDate": {
          "TypeName": "DateTime",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        }
      },
      "References": {
        "Trainings": {
          "ForeignModel": "Training",
          "AllowNull": false,
          "RelationType": 3,
          "LocalProperty": "",
          "ProxyModel": "TrainingCategories"
        }
      }
    },
    {
      "Name": "TrainingCategories",
      "Properties": {
        "trainingId": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "categoryId": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        }
      },
      "References": {
        "Training": {
          "ForeignModel": "Training",
          "AllowNull": false,
          "RelationType": 1,
          "LocalProperty": "trainingId"
        },
        "Category": {
          "ForeignModel": "Category",
          "AllowNull": false,
          "RelationType": 1,
          "LocalProperty": "categoryId"
        }
      }
    },
    {
      "Name": "TrainingAssignment",
      "Properties": {
        "trainingId": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "nodeId": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        }
      },
      "References": {}
    },
    {
      "Name": "UserTrainingDueDate",
      "Properties": {
        "trainingId": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "userAccountId": {
          "TypeName": "Integer",
          "IsPrimaryKey": false,
          "AllowNull": false,
          "Unique": false
        },
        "dueDate": {
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
