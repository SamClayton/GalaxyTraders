import SimpleSchema from 'simpl-schema'
export const Ships = new Mongo.Collection('ships')

Ships.schema = new SimpleSchema({
  userId: {type: String, label: 'User ID', regEx: SimpleSchema.RegEx.Id, index: true},
  sector: {type: String, label: 'Sector', regEx: SimpleSchema.RegEx.Id, index: true},
  class: {type: String, label: 'User ID', regEx: SimpleSchema.RegEx.Id},
  name: {type: String, label: 'Ship Name'},
  hull: {type: SimpleSchema.Integer, label: 'Hull'},
  engines: {type: SimpleSchema.Integer, label: ''},
  power: {type: SimpleSchema.Integer, label: ''},
  fighter: {type: SimpleSchema.Integer, label: 'Fighter Level'},
  sensors: {type: SimpleSchema.Integer, label: ''},
  beams: {type: SimpleSchema.Integer, label: ''},
  armor: {type: SimpleSchema.Integer, label: 'Armor Level'},
  cloak: {type: SimpleSchema.Integer, label: ''},
  torp: {type: SimpleSchema.Integer, label: 'Torpedo Level'},
  ecm: {type: SimpleSchema.Integer, label: ''},
  fighters: {type: SimpleSchema.Integer, label: 'Fighters'},
  torps: {type: SimpleSchema.Integer, label: 'Torpedoes'},
  armors: {type: SimpleSchema.Integer, label: 'Armor'},
  active: {type: Boolean, label: 'Active'},
  lastTrade: {type: Date, label: 'Last trade', optional: true},
  updatedAt: {type: Date, label: 'Updated at', autoValue: function () { return new Date() }}
})
Ships.attachSchema(Ships.schema)
