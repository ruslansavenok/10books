Router.configure({
  layoutTemplate: 'layout',
  waitOn: function () {
    return [
      Meteor.subscribe('books'),
      Meteor.subscribe('book_votes'),
      Meteor.subscribe('categories'),
      Meteor.subscribe('users')
    ]
  }
})

Router.onBeforeAction(function () {
  Session.set('query', null)
  Session.set('status_filter', null)

  if (!Meteor.userId()) {
    this.redirect('home')
  }
  this.next()
})

Router.map(function () {
  this.route('home', {
    path: '/',
    controller: RouteController.extend({
      layoutTemplate: false,
    }),
    waitOn: null,
    onBeforeAction: function() {
      if (Meteor.userId()) {
        Router.go('library')
      } else {
        this.next()
      }
    }
  })
  this.route('library', {
    path: '/library',
  });
  this.route('orders', {
    path: '/orders',
  });
  this.route('all', {
    path: '/all',
  })
})
