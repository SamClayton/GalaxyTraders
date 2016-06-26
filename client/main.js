import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './templates/app/main.html';


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  }
});

/*
Template.nav.helpers({
  tasks() {
    console.log("attempting to insert class with jquery");
    template.$("#login-dropdown-list, .dropdown-menu").addClass("dropdown-menu-right");
    return "";
  }
});
  */

// Make the login popup stay on the page
Template.nav.events({
  'click .dropdown-toggle'(event, instance) {
    $("#login-dropdown-list, .dropdown-menu").addClass("dropdown-menu-right");
  }
});