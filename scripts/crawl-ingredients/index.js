const axios = require('axios')
const { toJson } = require('xml2json')
const fs = require('fs')
const path = require('path')

const queryFamilies = require('./queries/families')
const queryDetall = require('./queries/detall')
const queryByFamilia = require('./queries/byFamilia')

const foodValues = {
  kcal: '409',
  fat_satured: '299',
  colesterol: '433'
}

const foodValuesNames = Object.keys(foodValues)

function parse (str) {
  return JSON.parse(toJson(str)).foodresponse
}

function query (key, payload) {
  const fname = path.join(__dirname, `./.cache/${key}.xml`)
  if (fs.existsSync(fname)) {
    console.log('Request', key, 'is already cached');
    return parse(fs.readFileSync(fname, 'utf8'))
  }

  return axios.post('https://www.bedca.net/bdpub/procquery.php', payload, {
    headers: {
      'Content-Type': 'text/xml'
    }
  })
    .then(r => {
      fs.writeFileSync(fname, r.data)
      return parse(r.data)
    })
}

async function start () {
  const foodValuesIds = Object.values(foodValues)
  const { food: families } = await query('families', queryFamilies)
  
  for (const familia in families) {
    const data = []

    if (Number(familia) > 0) {
      const { fg_id: id, fg_ori_name: familia_es, fg_eng_name: familia_en } = families[familia]
      const { food: ingredients } = await query(`familia-${id}`, queryByFamilia(Number(id)))
  
      if (ingredients && ingredients.length) {
        for (const i in ingredients) {
          const { f_id: id, f_ori_name: es, f_eng_name: en } = ingredients[i]
          const ingredient = {
            es: es.replace(/,/gi, ''),
            en: en.replace(/,/gi, ''),
            ca: '',
            familia_es: familia_es.replace(/,/gi, ''),
            familia_en: familia_en.replace(/,/gi, ''),
            familia_ca: ''
          }
  
          const { food: { foodvalue } } = await query(`ing-${id}`, queryDetall(Number(id)))

          if (foodvalue && foodvalue.length) {
            const values = foodvalue.filter(r => foodValuesIds.includes(r.c_id))            
            if (values && values.length) {
              for (const valueIndex in values) {
                ingredient[`${foodValuesNames[valueIndex]}_value`] = parseFloat(values[valueIndex].best_location, 10)
                ingredient[`${foodValuesNames[valueIndex]}_unit`] = values[valueIndex].v_unit
              }
            }            
          }
  
          data.push(ingredient)
        }
      }
      
      const headers = [
        'es', 'en', 'ca', 'familia_es', 'familia_en', 'familia_ca',
        ...foodValuesNames.map(k => [`${k}_value`, `${k}_unit`])
      ]

      fs.writeFileSync(
        path.join(__dirname, `./${familia_es}.csv`),
        [headers, ...data.map(row => Object.values(row).join(','))].join('\n')
      )      
    }
  }
}

start()
  .then(data => console.log(data))
  .catch(err => {
    throw err
  })