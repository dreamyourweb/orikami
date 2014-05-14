Package.describe({
    summary: 'tween.js'
});

Package.on_use(function (api) {
    api.add_files(['tween.js'], 'client');
    api.export('TWEEN', 'client');
});