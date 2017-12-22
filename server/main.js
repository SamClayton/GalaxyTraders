import { Meteor } from 'meteor/meteor'
// import BrowserPolicy from './browserpolicy.js-disabled'
import { Games } from '../lib/collections/games.js'
import { Rankings } from '../lib/collections/rankings.js'
import { Sectors } from '../lib/collections/sectors.js'
// import { Users } from '../lib/collections/users.js'

Meteor.startup(() => {
  configureContentSecurityPolicy()
  publishCoreGameData()

  Avatar.setOptions({
    fallbackType: 'initials'
  })
})

function publishCoreGameData () {
  Meteor.publish('Games', function () {
    // console.log("user: " + this.userId)
    // console.log(isAdminForPublication(this.userId))
    // console.log(Games)
    if (isAdminForPublication(this.userId)) {
      return Games.find({}, {sort: {date_created: -1}})
    } else {
      // Return actively-running games to non-admin users
      return Games.find({isActive: true, isEnded: false}, {sort: {date_created: -1}})
      // For now, return empty set for non-admin users
      // return this.ready()
    }
  })

  Meteor.publish('Rankings', function () {
    // console.log(Rankings.find().count())
    return Rankings.find()
  })

  // Override the default Users publication/collection, with the FB ID included for Avatar functionality
  Meteor.publish('Users', function () {
    // Administrators can access all users
    if (Roles.userIsInRole(this.userId, ['Administrator'])) {
      return Meteor.users.find({}, {
        fields: {
          username: true,
          email: true,
          profile: true,
          roles: true,
          'services.facebook.id': true,
          'services.facebook.email': true,
          'services.twitter.profile_image_url_https': true,
          'services.google.picture': true,
          'services.github.username': true,
          'services.instagram.profile_picture': true,
          'services.linkedin.pictureUrl': true
          // 'user_profile_picture': true
        }
      })
    } else {
      return Meteor.users.find({
        _id: this.userId
      }, {
        fields: {
          username: true,
          email: true,
          profile: true,
          roles: true,
          'services.facebook.id': true,
          'services.facebook.email': true,
          'services.twitter.profile_image_url_https': true,
          'services.google.picture': true,
          'services.github.username': true,
          'services.instagram.profile_picture': true,
          'services.linkedin.pictureUrl': true
          // 'user_profile_picture': true
        }
      })
    }
  })

  // We also deny all client-side write to user objects
  // https://guide.meteor.com/accounts.html#dont-use-profile
  Meteor.users.deny({
    update () { return true }
  })

  // TODO this needs helpers and ACLs to only publish sector data the user can see
  Meteor.publish('Sectors', function () {
    return Sectors.find()
  })
}

// Can we just use isAdmin, or otherwise move this to another file?
function isAdminForPublication (userId) {
  if (Roles.userIsInRole(userId, ['Administrator'])) {
    // console.log("Subscribing user is admin")
    return true
  }
  // console.log("Subscribing user is NOT admin")
  return false
}

function configureContentSecurityPolicy () {
  // Configure CSP module, including allowing Google web fonts and local fonts (e.g. meteortoys package) to load
  BrowserPolicy.content.allowFontOrigin('https://fonts.googleapis.com')
  BrowserPolicy.content.allowFontOrigin('https://fonts.gstatic.com')
  BrowserPolicy.content.allowFontOrigin('data:')

  // Allow profile images from Avatar package
  BrowserPolicy.content.allowImageOrigin('https://secure.gravatar.com')
  BrowserPolicy.content.allowImageOrigin('graph.facebook.com')
  BrowserPolicy.content.allowImageOrigin('*.fbcdn.net')

  // TODO re-enable in production, since I only disabled for the meteortoys dev package to work
  // Alternately, enable conditionally for production environments
  // BrowserPolicy.content.disallowInlineStyles()

  /* TODO Not sure that adding allowStyleOrigin or the Google Fonts CSS that is imported in main.html is necessary.
   I only added the CSS based on this http://stackoverflow.com/questions/26192316/violating-content-security-policy-directive-after-ember-cli-0-0-47-upgrade */
  BrowserPolicy.content.allowStyleOrigin('https://fonts.googleapis.com')

  // TODO disallowInlineScripts is recommended, but not sure I understand the implications
  // Disabled because the Avatar package was throwing errors. Re-enable later.
  // BrowserPolicy.content.disallowInlineScripts()
}

// Set the user profile photo on account creation. The login nav will use this field's value.
Accounts.onCreateUser(function (options, user) {
  if (options.profile) {
    user.profile = options.profile
    if (user.services.facebook.id) {
      user.profile.display_picture = Avatar.getUrl(user)
            // Not sure this next one is ever provided
      user.profile.username = user.services.facebook.username
    }
  }
  return user
})
