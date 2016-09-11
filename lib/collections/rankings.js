Rankings = new Mongo.Collection("rankings");

// TODO: Research whether to move some of this functionality to client-only or server-only blocks
if (Meteor.isClient || Meteor.isServer) {
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