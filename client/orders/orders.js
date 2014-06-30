Template.orders.books = function (argument) {
  return Meteor.filterBooks(['requested', 'accepted', 'ordered']);
}
