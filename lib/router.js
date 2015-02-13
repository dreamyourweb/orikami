Router.configure({
  layoutTemplate: 'layout',
  trackPageView: true,
  notFoundTemplate: 'home'
});

Router.map(function() {
  this.route('home', {path: '/'});
});

Router.route('/data-visualisatie', function () {
  this.render('datavisualisatie');
});

Router.route('/data-analyse', function () {
  this.render('dataAnalyse');
});

Router.route('/survey-app', function () {
  this.render('survey_app');
});

Router.route('/lean-management', function () {
  this.render('lean_management');
});

Router.route('/machine-learning', function () {
  this.render('machine_learning');
});

Router.route('/ruby-on-rails', function () {
  this.render('ruby_on_rails');
});

Router.route('/admin', function () {
  this.render('admin');
});



