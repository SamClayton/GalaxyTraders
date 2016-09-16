/**
 * Created by Sam on 9/15/16.
 */
Template.nav.helpers({
    serverUsage: function () {
        return serverUsage.find({}, {sort: {date_created: -1}});
    },
});

