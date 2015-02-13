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

Meteor.startup(function() {
    SeoCollection.update(
    {
        route_name: 'lean-management'
    },
    {
        $set: {
            route_name: 'lean-management',
            title: 'Lean management - Een universele strategie om snel en efficiënt goede resultaten te behalen bij een innovatief project',
            meta: {
                'description': 'Lean management is een systematische manier van processen begeleiden en coördineren, zodat optimaal gebruik wordt gemaakt van resources en capaciteiten.'
            },
            og: {
                'title': 'Lean management',
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
        route_name: 'machine-learning'
    },
    {
        $set: {
            route_name: 'machine-learning',
            title: 'Machine learning - Geautomatiseerd leren van data',
            meta: {
                'description': 'De modernste technieken om geautomatiseerd te leren van data, en informatie waardevol te maken voor alle bedrijfsniveaus.'
            },
            og: {
                'title': 'Machine learning',
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
        route_name: 'Ruby-on-rails'
    },
    {
        $set: {
            route_name: 'Ruby-on-rails',
            title: 'Ruby on Rails. Efficiente, flexibele en schaalbare webapplicaties met Ruby on Rails"',
            meta: {
                'description': 'Efficiënte, flexibele en schaalbare webapplicaties met Ruby on Rails.'
            },
            og: {
                'title': 'Ruby on rails',
                }
        }
    },
    {
        upsert: true
    }
  );
});

