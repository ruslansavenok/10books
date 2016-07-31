Books = new Meteor.Collection('books')
Meteor.publish('books', () => Books.find())

Books.allow({
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
