import { Template } from 'meteor/templating';

// Make the login popup stay within bounds of the page
Template.nav.events({
  'click .dropdown-toggle'(event, instance) {
    $("#login-dropdown-list, .dropdown-menu").addClass("dropdown-menu-right");
  }
});


Meteor.subscribe('Games');
Meteor.subscribe('Rankings');