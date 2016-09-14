import { Meteor } from 'meteor/meteor';
import { BrowserPolicy } from 'meteor/browser-policy-common';

Meteor.startup(() => {
    // Configure CSP module, including allowing Google web fonts and local fonts (e.g. meteortoys package) to load
    BrowserPolicy.content.allowFontOrigin("https://fonts.googleapis.com");
    BrowserPolicy.content.allowFontOrigin("https://fonts.gstatic.com");
    BrowserPolicy.content.allowFontOrigin("data:");

    // TODO re-enable in production, since I only disabled for the meteortoys dev package to work
    // BrowserPolicy.content.disallowInlineStyles();

    /* TODO Not sure that adding allowStyleOrigin or the Google Fonts CSS that is imported in main.html is necessary.
       I only added the CSS based on this http://stackoverflow.com/questions/26192316/violating-content-security-policy-directive-after-ember-cli-0-0-47-upgrade */
    BrowserPolicy.content.allowStyleOrigin("https://fonts.googleapis.com");

    // TODO disallowInlineScripts is recommended, but not sure I understand the implications
    BrowserPolicy.content.disallowInlineScripts();

    cpuStats();
});

function cpuStats(){
    var processId = process.pid;

    // If processId == null use process.pid as default
    var stats = Usage.getUsage(processId);

    console.log('Memory usage:', stats.memory); //those are bytes
    console.log('CPU % usage :', stats.cpu);


    // Unmonitor process by id - default process.pid
    Usage.unmonitor(processId);
}
