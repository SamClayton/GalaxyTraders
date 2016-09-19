import { Template } from 'meteor/templating';

Meteor.startup(function() {
    Meteor.subscribe('Games');
    Meteor.subscribe('Rankings');

    sAlert.config({
        effect: 'jelly',
        position: 'top-right',
        timeout: 5000,
        html: false,
        // False = don't close alerts when the route changes
        onRouteClose: false,
        stack: true,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 20, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
        onClose: _.noop //
        // examples:
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });
});

// Boot the user back to site root upon logout with a reactive tracker
Tracker.autorun(() => {
    if (!Meteor.userId()) {
        FlowRouter.go('/');
    }
});

// Callback from accounts-ui-bootstrap-3 package
accountsUIBootstrap3.logoutCallback = function(error) {
    if (error) {
        sAlert.error('Error: ' + error);
    } else {
        sAlert.info('You have logged out.');
        FlowRouter.go('site-root');
    }
}

// Make the login popup stay within bounds of the page
Template.nav.events({
  'click .dropdown-toggle'(event, instance) {
    $("#login-dropdown-list, .dropdown-menu").addClass("dropdown-menu-right");
  }
});