/* on login screen, meteor renders default layout before disabling it ;(
Router.configure({
  layoutTemplate: 'layout'
});
*/

Router.configure({
  onBeforeAction: function () {
    Session.set('query', null); // this should be setted per page
    Session.set('status_filter', []);
  }
})


Router.map(function () {
  this.route('home', {
    path: '/',
    layoutTemplate: false,
    onBeforeAction: function () {
      if (Meteor.user()) {
        Router.go('library')
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
});
