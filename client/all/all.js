Template.all.books = function (argument) {
  var statusFilter = Session.get('status_filter');

  if (_.isString(statusFilter)) statusFilter = [statusFilter];
  if (_.isUndefined(statusFilter)) statusFilter = [];

  if (statusFilter) {
    return Meteor.filterBooks(statusFilter);
  } else {
    return Meteor.filterBooks();
  }
}
