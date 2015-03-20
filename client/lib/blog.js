if (Meteor.isClient) {
  Blog.config({
    syntaxHighlighting: true,
    syntaxHighlightingTheme: 'github'
  });
}