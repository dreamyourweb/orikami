Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('brain', {path: '/brain'});
});