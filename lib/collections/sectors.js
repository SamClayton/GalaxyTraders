import SimpleSchema from 'simpl-schema'
Sectors = new Mongo.Collection('sectors')

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

// TODO figure out how to associate with an active game, maybe by finding the first active game and associating?
// TODO Put this and other seeds in JSON doc, since this is config data?
// TODO move to server-only files for security/to obscure from players?
/* If we do not restrict this to server, then it runs on the client each page load before subscription data arrives,
    creating errors when the duplicate key data is received from the client and attempts insertion */
if (Meteor.isServer) {
  let sectorSeeds = [
    {
      'name': 'Sol',
      'fedSpace': true,
      'warps': ['Andromeda Base', 'Outbound Colony Depot', 'Proxima Centauri', 'Wolf-359']
    },
    {
      'name': 'Andromeda Base',
      'fedSpace': true,
      'warps': ['Outbound Colony Depot', 'Proxima Centari', 'Sol', 'Wolf-359']
    },
    {
      'name': 'Outbound Colony Depot',
      'fedSpace': true,
      'warps': ['Andromeda Base', 'Sol', 'Proxima Centauri', 'Wolf-359']
    },
    {
      'name': 'Proxima Centauri',
      'fedSpace': true,
      'warps': ['Andromeda Base', 'Outbound Colony Depot', 'Sol', 'Wolf-359']
    },
    {
      'name': 'Wolf-359',
      'fedSpace': true,
      'warps': ['Andromeda Base', 'Outbound Colony Depot', 'Proxima Centauri', 'Sol']
    }
  ]

    // TODO we also may need to seed for a particular game, so just count ===0 won't be true for the 2nd game we define
    // console.log("Sectors in DB: " + Sectors.find().count());
  if (Sectors.find().count() === 0) {
    _.each(sectorSeeds, function (sector) {
      Sectors.insert(sector)
      console.log('Inserted ', sector.name)
    })
  }
}
