// TODO should i restrict this to server-only? Seems likely

if (Meteor.isClient) {
    // Wait for the Roles subscription to load before routing to avoid not misrepresenting roles when they are not loaded yet
    FlowRouter.wait();
    Tracker.autorun(function() {
        if (Roles.subscription.ready() && !FlowRouter._initialized) {
            FlowRouter.initialize()
        }
    });
}

FlowRouter.route('/', {
    action: function(params, queryParams) {
        name: "site-root",
        // This works as long as there's both a 'content' and 'secondary' area defined
        BlazeLayout.render("galaxyMain", {content: "splash", secondary: "rankings"});
    }
});

FlowRouter.route('/rankings', {
    name: "rankings",
    action: function(params, queryParams) {
        BlazeLayout.render("galaxyMain", {content: "rankings"});
    }
});

FlowRouter.route('/about', {
    name: "about",
    action: function(params, queryParams) {
        BlazeLayout.render("galaxyMain", {content: "about"});
    }
});

// TODO add route names to remaining

FlowRouter.route('/contact', {
    action: function(params, queryParams) {
        BlazeLayout.render("galaxyMain", {content: "contact"});
    }
});

FlowRouter.route('/terms-of-service', {
    action: function(params, queryParams) {
        BlazeLayout.render("galaxyMain", {content: "tos"});
    }
});

FlowRouter.route('/privacy', {
    action: function(params, queryParams) {
        BlazeLayout.render("galaxyMain", {content: "privacy"});
    }
});

FlowRouter.route('/help', {
    action: function(params, queryParams) {
        BlazeLayout.render("galaxyMain", {content: "help"});
    }
});


// TODO add some routes to this route group, accessible only by logged-in players
var playerRoutes = FlowRouter.group({
    // prefix: '/admin',
    name: 'player',
    triggersEnter: [function(context, redirect) {
        if (!Meteor.loggingIn() && !Meteor.userId()) {
            FlowRouter.go(FlowRouter.path('/'));
        }
    }]
});


// TODO add handling of redirecting after admin logout on any of the admin pages
// Currently, this allows the user to stay on the admin-only pages even after they log out
var adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',
    triggersEnter: [function(context, redirect) {
        if (!Roles.userIsInRole(Meteor.user(), ['Administrator'])) {
            FlowRouter.go(FlowRouter.path('/'));
        }

        // TODO log failed access to admin area
    }]
});

// handling /admin route
adminRoutes.route('/', {
    name: "admin_home",
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "admin"});
    }
});

adminRoutes.route('/games-list', {
    name: "games_list",
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "games_list"});
    }
});

adminRoutes.route('/sector', {
    name: "sector_admin",
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "admin_sector"});
    }
});

adminRoutes.route('/create-game', {
    action: function() {
        // TODO remove this later -- used to console log AutoForm errors
        /* AutoForm.addHooks(null, {
            onError: function (name, error, template) {
                console.log(name + " error:", error);
            }
        }); */
        BlazeLayout.render("galaxyMain", {content: "newGameForm"});
    }
});

adminRoutes.route('/suspend-game', {
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "suspend-game"});
    }
});

adminRoutes.route('/end-game', {
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "end-game"});
    }
});

adminRoutes.route('/player-list', {
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "player-list"});
    }
});

adminRoutes.route('/ban', {
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "ban"});
    }
});

adminRoutes.route('/admin-log', {
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "admin-log"});
    }
});

adminRoutes.route('/analytics', {
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "analytics"});
    }
});



FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "404"});
    }
};