Router.configure({
  layoutTemplate: 'layout',
  trackPageView: true
});

Router.map(function() {
  this.route('home', {path: '/'});
});
