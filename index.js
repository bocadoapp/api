const app = require('express')()

app.get('/', (req, res) => {
  res.send('🥑')
})

app.listen(3000)