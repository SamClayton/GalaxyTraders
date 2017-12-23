import SimpleSchema from 'simpl-schema'
export const Ships = new Mongo.Collection('ships')

Ships.schema = new SimpleSchema({
  userId: {type: String, label: 'User ID', regEx: SimpleSchema.RegEx.Id, index: true},
  sector: {type: String, label: 'Sector', regEx: SimpleSchema.RegEx.Id, index: true},
  class: {type: String, label: 'User ID', regEx: SimpleSchema.RegEx.Id},
  name: {type: String, label: 'Ship Name', max: 140},
  hull: {type: SimpleSchema.Integer, label: 'Hull', min: 0},
  engines: {type: SimpleSchema.Integer, label: '', min: 0},
  power: {type: SimpleSchema.Integer, label: '', min: 0},
  fighter: {type: SimpleSchema.Integer, label: 'Fighter Level', min: 0},
  sensors: {type: SimpleSchema.Integer, label: '', min: 0},
  beams: {type: SimpleSchema.Integer, label: '', min: 0},
  armor: {type: SimpleSchema.Integer, label: 'Armor Level', min: 0},
  cloak: {type: SimpleSchema.Integer, label: '', min: 0},
  torp: {type: SimpleSchema.Integer, label: 'Torpedo Level', min: 0},
  ecm: {type: SimpleSchema.Integer, label: '', min: 0},
  fighters: {type: SimpleSchema.Integer, label: 'Fighters', min: 0},
  torps: {type: SimpleSchema.Integer, label: 'Torpedoes', min: 0},
  armors: {type: SimpleSchema.Integer, label: 'Armor', min: 0},
  active: {type: Boolean, label: 'Active'},
  lastTrade: {type: Date, label: 'Last trade', optional: true},
  updatedAt: {type: Date, label: 'Updated at', autoValue: function () { return new Date() }}
})
Ships.attachSchema(Ships.schema)
