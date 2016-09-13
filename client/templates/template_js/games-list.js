/**
 * Created by Sam on 9/13/16.
 */
import {moment} from  'meteor/momentjs:moment';

Template.games_list.helpers({
    games: function(){
        return Games.find();
    },
    formatDate: function(raw){
        console.log("formatted date " + moment(raw).format("MMM DD YYYY"));
        return moment(raw).format("MMM DD YYYY");
    }
});