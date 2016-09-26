Books = new Meteor.Collection('books')
Meteor.publish('books', () => Books.find())

Books.allow({
  insert(userId) {
    return userId
  },

  update(userId) {
    return userId
  },

  remove(userId, doc) {
    return Roles.userIsInRole(userId, 'admin') ||
      (doc.requested_by == userId && doc.status == 'requested')
  }
})
