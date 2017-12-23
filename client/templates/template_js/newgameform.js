import { Games } from '../../../lib/collections/games.js'
// import { AutoForm } from 'meteor/aldeed:autoform'

Template.newGameForm.helpers({
  boop: function () {
    console.log('booooop')
  }
})

/*
// This onSubmit never seems to get called
AutoForm.addHooks('newGameForm', {
  onSuccess: function (operation, result) {
    console.log(arguments)
    Router.go(Games)
  },
  onSubmit: function (insertDoc, updateDoc, currentDoc) {
    console.log('game form submitted')
    console.log(arguments)
    return false
  }
})
*/

/*
Template.newGameForm.events({
  // add your events here
})
*/

Template.newGameForm.onCreated(function () {
  // console.log('new game form created')
  // Supply the collection so that Autoform can do its magic
  window.Games = Games
})

/*
Template.newGameForm.onRendered(function () {
  // add your statement here
})

Template.newGameForm.onDestroyed(function () {
  // add your statement here
})
*/
