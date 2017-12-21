Template.nav.helpers({
  serverUsage: function () {
    return serverUsage.find({}, {sort: {date_created: -1}})
  }
})

