import mongoose from 'mongoose'

const {
  MONGO_USER,
  MONGO_PW,
  MONGO_URL,
  MONGO_DB
} = process.env

let db: any
const defaultOpts = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}

const uri = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://${MONGO_USER}:${MONGO_PW}@${MONGO_URL}/${MONGO_DB}`
  : 'mongodb://localhost/bocado'

mongoose.connect(uri, defaultOpts)

export const connect = async () =>
  new Promise((resolve, reject) => {
    if (db) {
      return resolve(db)
    }

    db = mongoose.connection
    db.on('error', reject)
    db.once('open', () => {
      console.log(`[mongo] Connected to ${uri}`)
      resolve(db)
    })
  })
