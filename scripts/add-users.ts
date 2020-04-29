const { connect } = require('../src/mongo')
const { User } = require('../src/models/User')

const users = [
  {
    name: 'Manel Garcia',
    mail: 'manelet@gmail.com',
    password: 'bocadoapp'
  },
  {
    name: 'Aleix Hernandez',
    mail: 'ahmiro95@gmail.com',
    password: 'bocadoapp'
  },
  {
    name: 'Jordi Crisol',
    mail: 'jordicrisol@gmail.com',
    password: 'bocadoapp'
  },
  {
    name: 'Raquel Sancho',
    mail: 'raquelsancho4@gmail.com',
    password: 'bocadoapp'
  }
]

async function start() {
  await connect ()

  for (const user of users) {
    const dbUser = new User(user)
    await dbUser.save()
    console.log(user.name + ' added')
  }

  console.log('done')
  process.exit()
}

start()