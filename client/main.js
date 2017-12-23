import { Template } from 'meteor/templating'
import { Games } from '../lib/collections/games.js'

Meteor.startup(function () {
  // TODO do we need subscription handles?
  const Users = Meteor.subscribe('Users')
  const gamesHandle = Meteor.subscribe('Games')
  const Rankings = Meteor.subscribe('Rankings')
  Meteor.subscribe('Sectors')

  // console.log(Users.ready())

  // Configure sAlert
  // TODO move this into its own file
  sAlert.config({
    effect: 'jelly',
    position: 'top-right',
    timeout: 5000,
    html: false,
    // False = don't close alerts when the route changes
    onRouteClose: false,
    stack: {
      spacing: 10 // in px
    },
    offset: 70, // in px - will be added to first alert (bottom or top - depends of the position in config)
    beep: false,
  })

  Avatar.setOptions({
    fallbackType: 'initials'
  })
})

// Boot the user back to site root upon logout with a reactive tracker
Tracker.autorun(() => {
  if (!Meteor.userId()) {
    FlowRouter.go('/')
  }
})

// Callback from accounts-ui-bootstrap-3 package
accountsUIBootstrap3.logoutCallback = function (error) {
  if (error) {
    sAlert.error('Error: ' + error)
  } else {
    sAlert.info('You have logged out.')
    FlowRouter.go('site-root')
  }
}

// Make the login popup stay within bounds of the page
Template.nav.events({
  'click .dropdown-toggle' (event, instance) {
    $('#login-dropdown-list, .dropdown-menu').addClass('dropdown-menu-right')
  }
})
