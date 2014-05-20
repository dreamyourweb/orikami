Package.describe({
    summary: 'three.js'
});

Package.on_use(function (api) {
    api.add_files(['three.js', 'transform_svg.js'], 'client');
    api.export('THREE', 'client');
});