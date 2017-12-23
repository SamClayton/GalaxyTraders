import SimpleSchema from 'simpl-schema'
export const Autotrades = new Mongo.Collection('autotrades')

Autotrades.schema = new SimpleSchema({
  userId: {type: String, label: 'User ID', regEx: SimpleSchema.RegEx.Id, index: true},
  origin: {type: Number, label: 'Origin ID'},
  destination: {type: Number, label: 'Destination ID'},
  originOrder: {type: String, allowedValues: ['buy', 'sell']},
  originCommodity: {type: String, regEx: SimpleSchema.RegEx.Id},
  destinationOrder: {type: String, allowedValues: ['buy', 'sell']},
  destinationCommodity: {type: String, regEx: SimpleSchema.RegEx.Id},
  active: {type: Boolean, label: 'Active'},
  lastTrade: {type: Date, label: 'Last trade', optional: true},
  updatedAt: {type: Date, label: 'Updated at', autoValue: function () { return new Date() }}
})
Autotrades.attachSchema(Autotrades.schema)
