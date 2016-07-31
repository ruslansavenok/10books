Template.orders.helpers({
  books() {
    return Meteor.filterBooks(['requested', 'accepted', 'ordered']);
  }
})
