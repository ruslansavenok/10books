Router.configure({
  layoutTemplate: 'layout'
})

Router.onBeforeAction(function () {
  Session.set('query', null)
  Session.set('status_filter', null)

  if (!Meteor.user() && !Meteor.loggingIn() && this.route.name !== 'home') {
    this.render('home')
  } else {
    this.next()
  }
})

Router.map(function () {
  this.route('home', {
    path: '/',
    controller: RouteController.extend({
      layoutTemplate: false,
    }),
    onBeforeAction: function() {
      if (Meteor.user()) {
        Router.go('library')
      } else {
        this.next()
      }
    }
  })
  this.route('library', {
    path: '/library',
    layoutTemplate: 'layout'
  });
  this.route('orders', {
    path: '/orders',
    layoutTemplate: 'layout'
  });
  this.route('all', {
    path: '/all',
    layoutTemplate: 'layout'
  })
})
