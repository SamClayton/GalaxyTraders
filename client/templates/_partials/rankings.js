Template.rankings.helpers({
    rankings : function(){
        var rankings = Rankings.find();
        return rankings;
    },
    // TODO bind this somewhere available to all templates?
    formatNumber : function(raw) {
        return s.numberFormat(raw, 0, ",");
    }
});

Template.rankings.events({
    //add your events here
});

Template.rankings.onCreated(function () {
    //add your statement here
});

Template.rankings.onRendered(function () {
    //add your statement here
});

Template.rankings.onDestroyed(function () {
    //add your statement here
});

