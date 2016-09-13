import { Meteor } from 'meteor/meteor';
import { BrowserPolicy } from 'meteor/browser-policy-common';

Meteor.startup(() => {
    // Configure CSP module, including allowing Google web fonts to load
    BrowserPolicy.content.disallowInlineStyles();
    BrowserPolicy.content.allowFontOrigin("https://fonts.googleapis.com");
    BrowserPolicy.content.allowFontOrigin("https://fonts.gstatic.com");

    /* TODO Not sure that adding allowStyleOrigin or the Google Fonts CSS that is imported in main.html is necessary.
       I only added the CSS based on this http://stackoverflow.com/questions/26192316/violating-content-security-policy-directive-after-ember-cli-0-0-47-upgrade */
    BrowserPolicy.content.allowStyleOrigin("https://fonts.googleapis.com");

    // TODO disallowInlineScripts is recommended, but not sure I understand the implications
    BrowserPolicy.content.disallowInlineScripts();
});
