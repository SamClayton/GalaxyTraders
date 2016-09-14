Games = new Mongo.Collection("games");

Games.schema = new SimpleSchema({
    name: {type: String, label: "Game Name", unique: true},
    // TODO Can I auto-populate the playerCount, onlinePlayerCount, and dailyPlayerCount here? Read more on denormalized counts
    playerCount: {type: Number, label: "Player Count", optional: true},
    onlinePlayerCount: {type: Number, label: "Players Online", optional: true},
    dailyPlayerCount: {type: Number, label: "Active Player Last 24h", optional: true},
    startDate: {type: Date, label: "Start Date", optional: true, autoValue: function() {
        if (this.isInsert) {
            return new Date();
        } else if (this.isUpsert) {
            return {$setOnInsert: new Date()};
        } else {
            this.unset();  // Prevent user from supplying their own value
        }
    }},
    endDate: {type: Date, label: "End Date", optional: true},
    ageDays: {type: Number, label: "Game Age", optional: true, autoValue: function () {
        if (this.isInsert) {
            return 0;
        } else if (this.isUpsert) {
            return {$setOnInsert: 0};
        } else {
            this.unset();  // Prevent user from supplying their own value
            if (this.siblingField("startDate").isSet && this.siblingField("startDate").value != null) {
                console.log("Calculating new age in days from startDate: "
                    + Math.round((new Date() - new Date(this.siblingField("startDate").value))
                    / (1000 * 60 * 60 * 24)));
                return Math.round((new Date() - new Date(this.siblingField("startDate").value))
                    / (1000 * 60 * 60 * 24));
            }
        }
    }},
    isActive: {type: Boolean, label: "Active?", defaultValue: false},
    isEnded: {type: Boolean, label: "Ended?", defaultValue: false},
});

Settings = new SimpleSchema({
    inventoryFactor: {type: Number, name: "Inventory Factor", label: "", defaultValue: 1},
    upgradeCost: {type: Number, name: "Upgrade Cost", label: "", defaultValue: 500},
    upgradeFactor: {type: Number, label: "Upgrade Factor", defaultValue: 1.0767},
    planetUpgradeFactor: {type: Number, label: "", defaultValue: 1.0671},
    sdUpgradeFactor: {type: Number, label: "", defaultValue: 1.0743},
    levelFactor: {type: Number, label: "", defaultValue: 1.04138},
    maxTechLevel: {type: Number, label: "", defaultValue: 600},
    portPriceControl: {type: Number, label: "", defaultValue: 50},
/*    : {type: Number, label: "", defaultValue: },
    : {type: Number, label: "", defaultValue: },
    : {type: Number, label: "", defaultValue: },
    : {type: Number, label: "", defaultValue: },
*/
});

Games.attachSchema(Games.schema);

// Meteor example of how to extend to hook into denormalization maintenance functions
/* class Games extends Mongo.Collection {
    insert(doc, callback) {
        doc.createdAt = doc.createdAt || new Date();
        const result = super.insert(doc, callback);
        incompleteCountDenormalizer.afterInsertTodo(doc);
        return result;
    }
} */

// TODO: Research whether to move some of this functionality to client-only or server-only blocks
if (Meteor.isClient || Meteor.isServer) {

}