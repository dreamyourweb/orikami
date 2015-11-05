// var T = new TwitMaker({
//     consumer_key:         'afbvpV2fmC5ALGgTKzbnHw'
//   , consumer_secret:      'cqsQYYAb8hcuQ0ppeWZ7T7W9QZjOUsgv5AduGrtWwI'
//   , access_token:         '73969502-XjtY0hMJtmBQBhF0N55JrzL2paq1nF2DAmDHAAsFC'
//   , access_token_secret:  'MqKGXuwCRJ1oQgmTFYjuwo5D0cRf18dOqvHUhdPLNCFqs'
// })

// Meteor.startup(function () {
//  Future = Npm.require('fibers/future');

//   Meteor.methods({
//     'get_tweet': function() {

//       var future = new Future();

//       T.get('search/tweets', { q: 'opinion', count: 1 }, function(err, reply) {
//         future['return'](reply)
//       });
//       return future.wait();
//     }
//   });

// });
