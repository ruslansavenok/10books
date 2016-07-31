Categories = new Meteor.Collection('categories')
Meteor.publish('categories', () => Categories.find())

Categories.allow({
  insert(userId) {
    return Roles.userIsInRole(userId, 'admin')
  },

  update(userId) {
    return Roles.userIsInRole(userId, 'admin')
  },

  remove(userId) {
    return Roles.userIsInRole(userId, 'admin')
  }
})
