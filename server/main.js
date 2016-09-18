import { Meteor } from 'meteor/meteor';
import { BrowserPolicy } from 'meteor/browser-policy-common';

Meteor.startup(() => {
    configureContentSecurityPolicy();
    publishCoreGameData();
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

function isAdminForPublication(userId) {
    if(Roles.userIsInRole(userId, ['Administrator'])) {
        // console.log("Subscribing user is admin");
        return true;
    }
    // console.log("Subscribing user is NOT admin");
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