Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function () {
	this.route('home', {path: '/'})
	this.route('orders', {path: '/orders'})
});