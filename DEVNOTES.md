Bignumber upgrade:

v3.0 09/11/2016
Remove require('crypto') - leave it to the user.
Add BigNumber.set as BigNumber.config alias.
Default POW_PRECISION to 0.


Autoform (and mainly its dependency SimpleSchema, which is now an npm pkg and not a meteor one)
6.0.0
This version is updated to work with the new SimpleSchema NPM package. It is not backwards compatible with the Meteor SimpleSchema package. See:

https://github.com/aldeed/node-simple-schema
https://github.com/aldeed/meteor-simple-schema/blob/master/CHANGELOG.md#200
https://github.com/aldeed/meteor-collection2#important-note-the-version-in-this-repo-is-deprecated

SimpleSchema:
2.0.0
SimpleSchema is now an NPM package located here: https://github.com/aldeed/node-simple-schema. The version numbering started over, but you can consider v0.x.x of the NPM package to be v2 of the Meteor package. The Meteor package will get critical fixes only. You should attempt to migrate to using the NPM package as soon as you can.
You should now import SimpleSchema from 'simpl-schema' (NPM package) in every file where you use SimpleSchema.
Renamed:
SimpleSchemaValidationContext -> SimpleSchema.ValidationContext
validationContext.resetValidation() -> validationContext.reset()
validationContext.invalidKeys() -> validationContext.validationErrors()
validationContext.addInvalidKeys() -> validationContext.addValidationErrors()
Removed:
validationContext.removeInvalidKeys(): It was effectively the same as validationContext.reset().
validationContext.getErrorObject(): The ValidationError thrown by simpleSchema.validate() fills this need.
validationContext.validateOne(): Instead you can pass a keys array as an option to validationContext.validate().
Other Breaking Changes:
decimal is no longer a valid schema option. Instead, decimal/float is the default, and you can set the type to SimpleSchema.Integer to specify that you want only integers.
The syntax of array-brackets new SimpleSchema({ foo: { type: [String] } }) has been replaced by a more declarative solution: new SimpleSchema({ foo: { type: Array }, 'foo.$': { type: String } }). This only applies when defining the full type. The short version new SimpleSchema({ foo: [String] }) is still valid.
Error message changes:
SimpleSchema now uses MessageBox to manage validation error messages. Among other things, this means that placeholder text should now use handlebars syntax, {{label}} instead of [label]
In the message context (for placeholders), [type] is now {{dataType}} and [key] is now {{name}}, though key still works for now.
SimpleSchema.messages is removed. You can call MessageBox.defaults directly instead.
SimpleSchema.prototype.messages is removed. You can call simpleSchemaInstance.messageBox.messages() instead, and you must pass in the messages in the format required by that package.
SimpleSchema._globalMessages and SimpleSchema._depsGlobalMessages internal properties are removed.
If you have custom regEx messages, you now need to do this by overriding the regEx messages function.
SimpleSchema constructor no longer accepts an array to merge schemas. Instead, pass a single schema and then use schema.extend(otherSchema) to extend it.
When validating, objects with a custom prototype were previously treated as blackbox objects. Now they are validated by default, so you must add blackbox: true to your schema if you want to keep the old behavior. The exceptions are Date objects and TypedArray objects, which are always treated as blackbox.
The internal storage of your schema object has changed, so calling simpleSchemaInstance.schema() will now return an object that looks different. One of the differences is that subschemas are not merged into it. To get an object with subschemas merged, you can call simpleSchemaInstance.mergedSchema(). However, there are still differences due to how groups/oneOf is handled internally.
Implicit keys are no longer added for you. You must define every key.
A SimpleSchema can no longer be used with the check package check function. Instead, use simpleSchema.validate(), which throws a more helpful ValidationError and satisfies audit-argument-checks.
If you have custom validation that returns the error strings "expectedString", "expectedNumber", "expectedBoolean", "expectedArray", "expectedObject", or "expectedConstructor", you should now return { type: SimpleSchema.ErrorTypes.EXPECTED_TYPE, dataType: 'String' } instead, where dataType is "Boolean", "String", "Object", "Array", "Integer", or "Number".
Cleaning an object no longer mutates it. However, you can pass mutate: true option to improve performance if you don't mind the object being mutated.
Reactivity of labels and error messages in client code is no longer automatic. When creating your SimpleSchema instance, pass { tracker: Tracker } in the options to enable Tracker reactivity.
New Features
If you prefer keys to be optional by default, you can pass requiredByDefault: false as a SimpleSchema constructor option and then use required: true for each key that should be required.
You can now use shorthand for keys when your schema is extra super duper simple. See https://github.com/aldeed/node-simple-schema#shorthand-definitions
The error objects returned by validationErrors() and attached to thrown ValidationError objects now have additional properties that help describe the particular error.
In custom validation functions, you can now do this.addValidationErrors(errors), where errors is an array of error objects. This allows you to add errors for keys other than the one you are validating.
The SimpleSchema.ErrorTypes object now contains constants for all of the built-in error type strings.
You can now specify multiple combinations of type and certain other validation criteria for a single field. This is done using SimpleSchema.oneOf. Refer to https://github.com/aldeed/node-simple-schema#multiple-definitions-for-one-key
You can now add custom whole-document validators, either globally or for one schema. See SimpleSchema.addDocValidator and simpleSchemaInstance#addDocValidator.
If you pass an array of objects to simpleSchemaInstance#validate, all objects will be validated, and an error will be thrown for the first invalid object.

