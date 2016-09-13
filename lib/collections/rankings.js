Rankings = new Mongo.Collection("rankings");

Rankings.schema = new SimpleSchema({
    rank: {type: Number, label: "Rank", defaultValue: 0},
    username: {type: String, label: "Username"},
    empire: {type:String, optional: true, label: "Empire"},
    score: {type: Number, label: "Score", defaultValue: 0},
    updatedAt: {type: Date, label: "Updated at", optional: true, autoValue: function(){return new Date()}}
});
Rankings.attachSchema(Rankings.schema);

// TODO: Research whether to move some of this functionality to client-only or server-only blocks
if (Meteor.isClient || Meteor.isServer) {
    // TODO this seems highly self-referential and wrong
    Rankings.getAll = function(){
        return Rankings.getAll();
    };

    Rankings.allow({
        update : function(userid, ranking){
            return isAdmin();
        },
        insert : function(userid, ranking){
            return isAdmin();
        },
        remove : function(userid, ranking){
            return isAdmin();
        }
    });
}