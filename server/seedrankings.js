// Seed player rankings collection for initial creation
// TODO break out to separate JSON and code?

const rankingSeeds = [
  {
    'rank': 1,
    'username': 'PewPew',
    'empire': 'Promethean Society',
    'score': 2928928
  },
  {
    'rank': 2,
    'username': 'Lasers',
    'empire': 'Black Sun Empire',
    'score': 987797
  },
  {
    'rank': 3,
    'username': 'SneakySnek',
    'empire': 'Colossus',
    'score': 728838
  },
  {
    'rank': 4,
    'username': 'Bamboozler',
    'empire': '',
    'score': 290
  }
]

if (Rankings.find().count() === 0) {
  _.each(rankingSeeds, function (ranking) {
    Rankings.insert(ranking)
    console.log('Inserted ranking for user ', ranking.username)
  })
}
