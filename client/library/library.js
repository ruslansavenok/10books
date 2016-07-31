Template.library.helpers({
  books(argument) {
    return Meteor.filterBooks(['in_library', 'taken']);
  }
})
