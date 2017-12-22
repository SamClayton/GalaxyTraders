import SimpleSchema from 'simpl-schema'
export const Sectors = new Meteor.Collection('sectors')

// TODO associate each sector with a game
Sectors.schema = new SimpleSchema({
  name: {type: String, label: 'Sector Name', unique: true, index: true},
  // gameId:     {type: String, label: "Game", index: true},
  fedSpace: {type: Boolean, label: 'FedSpace', optional: true, defaultValue: false},
  warps: {type: Array, label: 'Warps', optional: true},
  'warps.$': {type: String}
})
Sectors.attachSchema(Sectors.schema)

// TODO add some hook or other logic to enforce that "warps" array values are only composed of valid destination sectors
/*  However, need to think through how/when to enforce, because otherwise destroyed/deleted sectors could have stale links
    As I'm thinking this out, this would create a requirement that new destination sector documents be created before warps to
        them are updated. This seems okay, and I cannot yet think of a use case for creating the link 1st then
        creating the sector.
    However, this could cause issues when we do ops like seeding a new game with sectors, where links to as-yet-uncreated
        sectors would fail to be created. Would it be possible to bind/instantiate the schema hooks only after initial
        universe creation?
*/
