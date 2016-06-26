Template.rankings.helpers({
    //add you helpers here
    rankings : function(){
        var rankings = Rankings.find();
        return rankings;
    },
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

