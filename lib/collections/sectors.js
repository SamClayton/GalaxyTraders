Sectors = new Mongo.Collection("sectors");

Sectors.schema = new SimpleSchema({
    name:       {type: String, label: "Sector Name", unique: true, index: true},
    fedSpace:   {type: Boolean, label: "FedSpace", optional: true, defaultValue: false},
    warps:      {type: [String], label: "", optional: true},
});
Sectors.attachSchema(Sectors.schema);

// TODO add some hook or other logic to enforce that "warps" array values are only composed of valid destination sectors
/*  However, need to think through how/when to enforce, because otherwise destroyed/deleted sectors could have stale links
    As I'm thinking this out, this would create a requirement that new destination sector documents be created before warps to
        them are updated. This seems okay, and I cannot yet think of a use case for creating the link 1st then
        creating the sector.
    However, this could cause issues when we do ops like seeding a new game with sectors, where links to as-yet-uncreated
        sectors would fail to be created. Would it be possible to bind/instantiate the schema hooks only after initial
        universe creation?
*/


// TODO Put this and other seeds in JSON doc, since this is config data?
// TODO move to server-only files for security/to obscure from players?
if (Meteor.isServer) {
    var sectorSeeds = [
        {
            "name": "Sol",
            "fedSpace": true,
            "warps": ["Andromeda Base", "Outbound Colony Depot", "Proxima Centauri", "Wolf-359"]
        },
        {
            "name": "Andromeda Base",
            "fedSpace": true,
            "warps": ["Outbound Colony Depot", "Proxima Centari", "Sol", "Wolf-359"]
        },
        {
            "name": "Outbound Colony Depot",
            "fedSpace": true,
            "warps": ["Andromeda Base", "Sol", "Proxima Centauri", "Wolf-359"]
        },
        {
            "name": "Proxima Centauri",
            "fedSpace": true,
            "warps": ["Andromeda Base", "Outbound Colony Depot", "Sol", "Wolf-359"]
        },
        {
            "name": "Wolf-359",
            "fedSpace": true,
            "warps": ["Andromeda Base", "Outbound Colony Depot", "Proxima Centauri", "Sol"]
        },
    ];

    console.log(Sectors.find().count());
    if (Sectors.find().count() === 0) {
        _.each(sectorSeeds, function (sector) {
            Sectors.insert(sector);
            console.log("Inserted ", sector.name);
        })
    }
}