import { Sectors } from '../lib/collections/sectors.js'

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
