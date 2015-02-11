Meteor.startup(function() {
    SeoCollection.update(
    {
        route_name: 'data-visualisatie'
    },
    {
        $set: {
            route_name: 'data-visualisatie',
            title: 'Data visualisatie - Door inzicht naar de juiste bedrijfsbeslissing',
            meta: {
                'description': 'Maatwerk oplossingen om informatie uit uw data te halen en deze overzichtelijk te presenteren.'
            },
            og: {
                'title': 'Data visualisaties',
                }
        }
    },
    {
        upsert: true
    }
  );
});  // als je niet precies weet wat de route_name is, kan je in de console (bij element inspecteren) typen: 'Router.current().route.getName()'

Meteor.startup(function() {
    SeoCollection.update(
    {
        route_name: 'data-analyse'
    },
    {
        $set: {
            route_name: 'data-analyse',
            title: 'Data analyse - Van data naar geïnformeerde beslissingen',
            meta: {
                'description': 'Maatwerk oplossingen om data inzichtelijk te maken, de juiste informatie uit uw data te halen en om de juiste beslissingen te maken.'
            },
            og: {
                'title': 'Data analyse',
                }
        }
    },
    {
        upsert: true
    }
  );
});

Meteor.startup(function() {
    SeoCollection.update(
    {
        route_name: 'survey-app'
    },
    {
        $set: {
            route_name: 'survey-app',
            title: 'Enquête-app - Enquêtes afnemen via je smartphone',
            meta: {
                'description': 'Enquêtes afnemen via je smartphone'
            },
            og: {
                'title': 'Enquête-app',
                }
        }
    },
    {
        upsert: true
    }
  );
});