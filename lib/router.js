FlowRouter.route('/', {
    action: function(params, queryParams) {

    }
});

FlowRouter.route('/about', {
    action: function(params, queryParams) {
    }
});


FlowRouter.route('/contact', {
    action: function(params, queryParams) {
    }
});

FlowRouter.route('/login', {
    action: function(params, queryParams) {
    }
});

FlowRouter.route('/signup', {
    action: function(params, queryParams) {
    }
});

/* FlowRouter.route('/blog/:postId', {
 action: function(params, queryParams) {
 console.log("Yeah! We are on the post:", params.postId);
 }
 });
 */


var adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',
    triggersEnter: [function(context, redirect) {
        console.log('running admin route group triggers');
    }]
});

// handling /admin route
adminRoutes.route('/', {
    action: function() {
        console.log('running root admin route')
    },
    triggersEnter: [function(context, redirect) {
        console.log('running /admin trigger');
    }]
});
