import mongoose from 'mongoose'
import Ingredient, { IIngredient } from './index'
import { connect } from '../../mongo'

let db: any

describe('Ingredient model', () => {
  beforeAll(async () => {
    db = await connect()
  })

  afterAll(async () => {
    db.close()
  })
})

test('should throw for validation', () => {
  const ingredient: IIngredient = new Ingredient()
  expect(ingredient.validate).toThrow()
})

test('should create a user', () => {
  const ingredient: IIngredient = new Ingredient({
    name: {
      ca: 'Tomaquet',
      es: 'Tomate',
      en: 'Tomato'
    }
  })

  const spy = jest.spyOn(ingredient, 'save')
  ingredient.save()

  expect(spy).toHaveBeenCalled()
  expect(ingredient.name.en).toBe('Tomato')
})