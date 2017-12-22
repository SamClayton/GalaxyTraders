// import { Accounts } from 'meteor/accounts-base'
import {moment} from 'meteor/momentjs:moment'

Template.player_list.helpers({
  players: function () {
    // console.log(Users)
    // return Meteor.users.find()
    return Users.find()
  },
  formatDate: function (raw) {
    console.log('formatted date ' + moment(raw).format('MMM DD YYYY'))
    return moment(raw).format('MMM DD YYYY')
  }
})
