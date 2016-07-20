ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      clientId: '471584135384-574afafjms570m3v6t1sekijh1lptral.apps.googleusercontent.com',
      secret: 'W9napBOnGFb9FcPz2Tud6fqE'
    }
  }
)

Books = new Meteor.Collection('books')
BookVotes = new Meteor.Collection('book_votes')
Categories = new Meteor.Collection('categories')


Accounts.validateLoginAttempt((attempt) => {
  if (
    attempt.user &&
    !attempt.user.services.google.email.includes('@10clouds.com')
  ) {
    throw new Meteor.Error('Must be 10clouds email')
  } else {
    return true
  }
})


Accounts.onCreateUser(function(options, user) {
  user.emails = [
    {
      address: user.services.google.email,
      verified: true
    }
  ]
  return user
})
