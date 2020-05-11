import mongoose from 'mongoose'
import { Recipe, TRecipe } from './index'
import { connect } from '../../mongo'

let db: any

describe('Recipe model', () => {
  beforeAll(async () => {
    db = await connect()
  })

  afterAll(async () => {
    db.close()
  })
})

test('should throw for validation', () => {
  const recipe: TRecipe = new Recipe()
  expect(recipe.validate).toThrow()
})

test('should create a recipe', () => {
  const recipe: TRecipe = new Recipe({
    name: {
      ca: 'Espaguetis a la carbonara',
      es: 'Espaguetis a la carbonara',
      en: 'Spaghetti carbonara'
    }
  })

  const spy = jest.spyOn(recipe, 'save')
  recipe.save()

  expect(spy).toHaveBeenCalled()
  expect(recipe.name.en).toBe('Spaghetti carbonara')
})