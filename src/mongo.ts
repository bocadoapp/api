import mongoose from 'mongoose'

const {
  MONGO_USER,
  MONGO_PW,
  MONGO_URL,
  MONGO_DB
} = process.env

const defaultOpts = {
  useUnifiedTopology: true, 
  useNewUrlParser: true
}

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PW}@${MONGO_URL}/${MONGO_DB}`, defaultOpts)

export const connect = async () =>
  new Promise((resolve, reject) => {
    let db = mongoose.connection
    db.on('error', reject)
    db.once('open', () => {
      console.log('Connected to Mongodb Atlas');
      resolve(db)
    })
  })