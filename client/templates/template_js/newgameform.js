import { Games } from '../../../lib/collections/games.js'

Template.newGameForm.helpers({
  boop: function () {
    console.log('booooop')
  }
})

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
