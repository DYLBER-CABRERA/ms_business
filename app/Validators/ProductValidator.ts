import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
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

    expiration_date: schema.date({format: 'yyyy-MM-dd'}, [
      rules.required(),
      rules.after('today'),
    ]),

    client_id: schema.number([
      rules.required(),
      rules.exists({ table: 'clients', column: 'id' })
    ]),

    batch_id: schema.number.optional([
      rules.exists({ table: 'batches', column: 'id' })
    ])
  })
  public messages: CustomMessages = {
    'name.required': 'El nombre es obligatorio.',
    'name.alphaNum': 'El nombre solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
    'description.required': 'La descripción es obligatoria.',
    'description.alphaNum': 'La descripción solo puede contener caracteres alfanuméricos, espacios, guiones bajos y guiones.',
    'expiration_date.required': 'La fecha de vencimiento es obligatoria.',
    'expiration_date.after': 'La fecha de vencimiento debe ser posterior al día de hoy.',
    'client_id.required': 'El ID del cliente es obligatorio.',
    'client_id.exists': 'El ID del cliente no existe.',
   // 'batch_id.required.optional': 'El ID del lote es obligatorio.',
  }
}
