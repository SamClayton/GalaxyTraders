isAdmin = function () {
  let loggedInUser = Meteor.user()
  let result = false

  if (loggedInUser) {
    if (Roles.userIsInRole(loggedInUser, ['Administrator'])) {
      result = true
    }
  }

  return result
}
