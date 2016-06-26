Rankings = new Mongo.Collection("rankings");

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