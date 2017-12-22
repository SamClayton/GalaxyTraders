import { Sectors } from '../../../lib/collections/sectors.js'

Template.admin_sector.helpers({
  sectors: function () {
    return Sectors.find()
  }
})

Template.rankings.events({
  // add your events here
})

Template.rankings.onCreated(function () {
  // add your statement here
})

Template.rankings.onRendered(function () {
  // add your statement here
})

Template.rankings.onDestroyed(function () {
  // add your statement here
})

