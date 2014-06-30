Template.library.books = function (argument) {
  return Meteor.filterBooks(['in_library', 'taken']);
}
