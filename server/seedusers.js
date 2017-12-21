// Seed users collection for initial creation

if (Meteor.users.find().count() === 0) {
  let id = Accounts.createUser({
    username: 'Administrator',
    email: 'admin@test.com',
    password: 'admin123',
    profile: {name: 'Big Admin'},
    roles: []
  })

  Roles.addUsersToRoles(id, ['Administrator'])
  console.log('Added Admin user...')
}
