import { Meteor } from 'meteor/meteor';
import { BrowserPolicy } from 'meteor/browser-policy-common';

Meteor.startup(() => {
    // Configure CSP module, including allowing Google web fonts to load
    BrowserPolicy.content.disallowInlineStyles();
    BrowserPolicy.content.allowFontOrigin("https://fonts.googleapis.com");
    BrowserPolicy.content.allowFontOrigin("https://fonts.gstatic.com");
    BrowserPolicy.content.allowStyleOrigin("https://fonts.googleapis.com");
    // TODO recommended, but not sure I understand the implications
    // BrowserPolicy.content.disallowInlineScripts()
});
