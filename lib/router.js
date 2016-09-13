FlowRouter.route('/', {
    action: function(params, queryParams) {
        // This works as long as there's both a 'content' and 'secondary' area defined
        BlazeLayout.render("galaxyMain", {content: "splash", secondary: "rankings"});
    }
});

FlowRouter.route('/rankings', {
    action: function(params, queryParams) {
        BlazeLayout.render("galaxyMain", {content: "rankings"});
    }
});

FlowRouter.route('/about', {
    action: function(params, queryParams) {
        BlazeLayout.render("galaxyMain", {content: "about"});
    }
});

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


var adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',
    triggersEnter: [function(context, redirect) {
        console.log('running admin route group triggers');
        // TODO add check on users' role, else boot them back to main & log
    }]
});

// handling /admin route
adminRoutes.route('/', {
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "admin"});
    }
});

adminRoutes.route('/games-list', {
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "games-list"});
    }
});

adminRoutes.route('/create-game', {
    action: function() {
        BlazeLayout.render("galaxyMain", {content: "create-game"});
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
