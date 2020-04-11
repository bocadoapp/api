import Ingredient from '../../models/Ingredient'

const resolvers = {
  Query: {
    getAllIngredients: async () => await Ingredient.find({}).exec()
  }
}

export default resolvers
