import mongoose from 'mongoose'

const defaultOpts = {
  useUnifiedTopology: true, 
  useNewUrlParser: true
}

mongoose.connect('mongodb+srv://bocado:Mongo123_!@cluster0-iqnt7.mongodb.net/bocado', defaultOpts)

export const connect = async () =>
  new Promise((resolve, reject) => {
    let db = mongoose.connection
    db.on('error', reject)
    db.once('open', () => {
      console.log('Connected to Mongodb Atlas');
      resolve(db)
    })
  })