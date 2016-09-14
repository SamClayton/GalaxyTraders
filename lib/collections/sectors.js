Sectors = new Mongo.Collection("sectors");

Sectors.schema = new SimpleSchema({
    name: {type: String, label: "Sector Name", unique: true},
});