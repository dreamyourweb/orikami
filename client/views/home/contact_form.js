Template.contactForm.helpers({
  contactFormSchema: function() {
    return Schema.contact;
  }
});

AutoForm.hooks({
  contactForm: {
    onSuccess: function(operation, result, template) {
      Notifications.success('Contact Form', 'your message was successfully send. Thank you for contacting us. We will get back to you shortly.');
    },
    onError: function(operation, result, template) {
      // Notifications.error('title', 'message');
    }
  }
});
