import { schema, CustomMessages , rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.alphaNum({ allow: ['space', 'underscore', 'dash'] })
    ]),

    description: schema.string({}, [
      rules.required(),
      rules.alphaNum({ allow: ['space', 'underscore', 'dash'] })
    ]), 
    parentCategory: schema.number.nullable([
      rules.exists({ table: 'categories', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'El nombre es obligatorio.',
'name.alphaNum': 'El nombre solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
'description.required': 'La descripción es obligatoria.',
'description.alphaNum': 'La descripción solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.'
  }
}
