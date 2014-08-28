Template['cases'].helpers({
  tabSettings: function() {
    return {
      defaultPath: this.path,
      type: 'horizontal',
      tabs: [
        {
          path: '1',
          name: 'KplusV'
        }, {
          path: '2',
          name: 'U-map'
        }, {
          path: '3',
          name: 'Mozart'
        }, {
          path: '4',
          name: 'BierApp'
        }
      ]
    };
  }
});
