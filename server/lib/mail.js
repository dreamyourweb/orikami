Meteor.methods({
  sendEmail: function(doc) {
    check(doc, Schema.contact);

    var text = "Name: " + doc.name + "\n\n"
            + "Email: " + doc.email + "\n\n\n\n"
            + doc.message;

    this.unblock();

    // Send the e-mail
    Email.send({
        to: "info@orikami.nl",
        from: doc.email,
        subject: "Orikami Contact Form - Message From " + doc.name,
        text: text
    });
  }
});