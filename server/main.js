import { Meteor } from 'meteor/meteor';
import { BrowserPolicy } from 'meteor/browser-policy-common';

Meteor.startup(() => {
    configureContentSecurityPolicy();
    publishCoreGameData();
    publishProcessData();
});

function publishCoreGameData() {
    // TODO lock this down to active games for non-admins
    Meteor.publish('Games', function() {
        // console.log("user: " + this.userId);
        if (isAdminForPublication(this.userId)) {
            return Games.find({}, {sort: {date_created: -1}});
        } else {
            // Return actively-running games to non-admin users
            return Games.find({isActive: true, isEnded: false}, {sort: {date_created: -1}});
            // For now, return empty set for non-admin users
            // return this.ready();
        }
    });
    Meteor.publish('Rankings', function() {
        return Rankings.find();
    });
}

function publishProcessData() {
    // console.log("cpu " + Usage.getUsage(process.pid).cpu);

    CPU = new Mongo.Collection('serverUsage');

    Meteor.publish('serverUsage', function() {
        var generatedId = new Meteor.Collection.ObjectID()._str;
        // console.log("generatedId " + generatedId);

        var processId = process.pid;
        this.added('serverUsage', generatedId, {memory: Usage.getUsage(processId).memory, cpu: Usage.getUsage(processId).cpu});
        // Experimental addition to unmonitor, in case that was causing our problem with login
        Usage.unmonitor(processId);

        // We can call ready to indicate to the client that the initial document sent has been sent
        this.ready();

        // TODO setTimeout not firing, it seems. What I want is for this to update periodically, maybe triggered by polling?
        Meteor.setTimeout(() => {
            console.log("changing custom pub which is subbed from " + this.connection.clientAddress + " with doc id " + generatedId);
            // If we want to modify a document that we've already added
            this.changed('serverUsage', generatedId, {
                date: new Date(),
                memory: Usage.getUsage(processId).memory,
                cpu: Usage.getUsage(processId).cpu
            });
            this.ready();

            // Or if we don't want the client to see it any more
            // this.removed('collection-name', 'id');

            this.onStop(() => {
                // Unmonitor process by id - default process.pid
                Usage.unmonitor(processId);
            });
        });
    });
}

function isAdminForPublication(userId) {
    if(Roles.userIsInRole(userId, ['Administrator'])) {
        console.log("Subscribing user is admin");
        return true;
    }
    console.log("Subscribing user is NOT admin");
    return false;
}

function configureContentSecurityPolicy() {
    // Configure CSP module, including allowing Google web fonts and local fonts (e.g. meteortoys package) to load
    BrowserPolicy.content.allowFontOrigin("https://fonts.googleapis.com");
    BrowserPolicy.content.allowFontOrigin("https://fonts.gstatic.com");
    BrowserPolicy.content.allowFontOrigin("data:");

    // TODO re-enable in production, since I only disabled for the meteortoys dev package to work
    // Alternately, enable conditionally for production environments
    // BrowserPolicy.content.disallowInlineStyles();

    /* TODO Not sure that adding allowStyleOrigin or the Google Fonts CSS that is imported in main.html is necessary.
     I only added the CSS based on this http://stackoverflow.com/questions/26192316/violating-content-security-policy-directive-after-ember-cli-0-0-47-upgrade */
    BrowserPolicy.content.allowStyleOrigin("https://fonts.googleapis.com");

    // TODO disallowInlineScripts is recommended, but not sure I understand the implications
    BrowserPolicy.content.disallowInlineScripts();
}