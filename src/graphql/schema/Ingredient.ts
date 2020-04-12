export default `
  type IngredientAttribute {
    value: Int,
    unit: String
  }

  type Ingredient {
    name: TranslatedString!,
    type: TranslatedString!,
    kcal: IngredientAttribute,
    fat_saturated: IngredientAttribute,
    colesterol: IngredientAttribute
  }
`
