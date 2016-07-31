BookVotes = new Meteor.Collection('book_votes')
Meteor.publish('book_votes', () => BookVotes.find())

BookVotes.allow({
  insert(userId) {
    return userId
  },

  update(userId) {
    return userId
  },

  remove(userId) {
    return Roles.userIsInRole(userId, 'admin')
  }
})
