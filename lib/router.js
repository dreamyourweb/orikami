Router.configure({
  layoutTemplate: 'layout',
  trackPageView: true
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