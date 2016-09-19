/**
 * Created by Sam on 9/18/16.
 */
Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function(event) {
        FlowRouter.go('profileEdit');
    }
});