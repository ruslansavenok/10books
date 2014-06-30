Template.all.books = function (argument) {
  var statusFilter = Session.get('status_filter');

  console.log('statusFilter', statusFilter);

  if (statusFilter && statusFilter.length) {
    return Meteor.filterBooks(statusFilter);
  } else {
    return Meteor.filterBooks();
  }
}
