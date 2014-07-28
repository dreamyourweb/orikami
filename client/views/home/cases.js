Template['cases'].helpers({
  tabSettings: function() {
    return {
      defaultPath: this.tab || "1",
      type: 'horizontal',
      tabs: [
        {

          path: '1',
          name: 'KplusV'
          //img.png(src="images/kplusv.png" float="center" width="20%" data-equalizer-watch)

        }, {

          path: '2',
          name: 'U-map'
        }, {

          path: '3',
          name: 'BierApp'
          
        }
      ]
    };
  }

});