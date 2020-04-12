const path = require('path')
const fs = require('fs')

async function start () {
  const files = fs.readdirSync(path.join(__dirname, './')).filter(f => f.includes('.csv'))
  
  for (const fileIndex in files) {
    const [headers, ...rows] = fs.readFileSync(path.join(__dirname, `./${files[fileIndex]}`), 'utf8')
      .split('\n')
      .map(r => r.split(','))

    for (const rowIndex in rows) {
      const row = rows[rowIndex]
      const ingredient = {
        name: {
          es: row[0],
          en: row[1],
          ca: row[2]
        },
        familia: {
          es: row[3],
          en: row[4],
          ca: row[5]
        },
        kcal: {
          value: parseFloat(row[6], 10),
          unit: row[7]
        },
        fat_saturated: {
          value: parseFloat(row[8], 10),
          unit: row[9]
        },
        colesterol: {
          value: parseFloat(row[10], 10),
          unit: row[11]
        }
      }

      console.log(ingredient)
      process.exit()
    }
  }
}

start()