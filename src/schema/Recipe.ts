import { RecipeTC } from '../models/Recipe'
import { UserTC } from '../models/User'
import { FileTC } from '../models/File'

RecipeTC.addRelation('user', {
  resolver: () => UserTC.getResolver('findById'),
  prepareArgs: { _id: source => source.userId },
  projection: { userId: 1 }
})

RecipeTC.addRelation('media', {
  resolver: () => FileTC.getResolver('findByIds'),
  prepareArgs: { _ids: source => source.media },
  projection: { media: 1 }
})

export const RecipeQuery = {
  recipe: RecipeTC.getResolver('findOne'),
  recipes: RecipeTC.getResolver('findMany')
}

export const RecipeMutation = {
  createRecipe: RecipeTC.getResolver('createOne')
}
