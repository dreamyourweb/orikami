Meteor.startup(function() {
 if(Meteor.isClient){
      return SEO.config({
        title: 'orikami Data Science Boutique',
        meta: {
          'description': 'We get max(value) 2 from your data. orikami is not your run-of-the-mill data science company. Our company is specialised in helping you innovate with data and learn from data. We are not statisticians. We are data scientists. We know how to uncover patterns from (big) data.'
        },
        og: {
          'image': 'https://pbs.twimg.com/profile_images/450964622950924288/Jgor9T8u.png' 
        }
      });
    }
});