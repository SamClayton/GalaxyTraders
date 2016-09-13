Template.rankings.helpers({
    rankings: function(){
        return Rankings.find();
    },
    // TODO bind this somewhere available to all templates?
    formatNumber: function(raw) {
        // Using the underscore.string manipulation package
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

