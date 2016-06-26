FlowRouter.route('/blog/:postId', {
    action: function(params, queryParams) {
        console.log("Yeah! We are on the post:", params.postId);
    }
});

var adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',
    triggersEnter: [function(context, redirect) {
        console.log('running group triggers');
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
