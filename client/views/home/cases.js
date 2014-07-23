Template['cases'].helpers({
  tabSettings: function() {
    return {
      defaultPath: this.tab || "kplusv",
      type: 'horizontal',
      tabs: [
        {

          path: 'kplusv',
          name: 'ik wil hier een plaatje'
          //img.png(src="images/kplusv.png" float="center" width="20%" data-equalizer-watch)

        }, {

          path: 'umap',
          name: 'U-map'
        }
      ]
    };
  }
});