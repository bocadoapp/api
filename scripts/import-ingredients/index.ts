import path from 'path'
import fs from 'fs'
import { connect } from '../../src/mongo'
import Ingredient, { IIngredient } from '../../src/models/Ingredient'

async function start () {
  await connect()
  const files = fs.readdirSync(path.join(__dirname, './')).filter((f: any) => f.includes('.csv'))
  
  for (const fileIndex in files) {
    const [headers, ...rows] = fs.readFileSync(path.join(__dirname, `./${files[fileIndex]}`), 'utf8')
      .split('\n')
      .map((r: any) => r.split(','))

    for (const rowIndex in rows) {
      const row = rows[rowIndex]
      const i: IIngredient = {
        name: {
          es: row[0],
          en: row[1],
          ca: row[2]
        },
        type: {
          es: row[3],
          en: row[4],
          ca: row[5]
        }
      }

      if (!isNaN(parseFloat(row[6]))) {
        i.kcal = {
          value: parseFloat(row[6]),
          unit: row[7]
        }
      }

      if (!isNaN(parseFloat(row[8]))) {
        i.fat_saturated = {
          value: parseFloat(row[8]),
          unit: row[9]
        }
      }      

      if (!isNaN(parseFloat(row[10]))) {
        i.colesterol = {
          value: parseFloat(row[10]),
          unit: row[11]
        }
      }      

      const ingredient = new Ingredient(i)

      try {
        console.log('saving', row[0], i);
        await ingredient.save()         
      } catch (err) {
        throw err
        process.exit()
      }
    }
  }
}

start()