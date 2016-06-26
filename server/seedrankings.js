var rankingSeeds = [
    {
        "rank": 1,
        "username": "PewPew",
        "empire": "Promethean Society",
        "score": 2928928,
    },
    {
        "rank": 2,
        "username": "Lasers",
        "empire": "Black Sun Empire",
        "score": 987797,
    },
    {
        "rank": 3,
        "username": "SneakySnek",
        "empire": "Colossus",
        "score": 728838,
    },
    {
        "rank": 4,
        "username": "Bamboozler",
        "empire": "",
        "score": 290,
    }
];

if(Rankings.find().count() === 0) {
    _.each(rankingSeeds, function(product){
        Rankings.insert(product);
        console.log("Inserted ", product.sku);
    })
}

if(Meteor.users.find().count() === 0) {
    var id = Accounts.createUser({
        username : "Administrator",
        email: "admin@test.com",
        password: "admin123",
        profile: { name: "Big Admin" },
        roles : []
    });

    Roles.addUsersToRoles(id, ["Administrator"]);
    console.log("Added Admin user...");
}