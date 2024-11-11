import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    id_type: schema.string([
      rules.required()
    ]),
    id_number: schema.string([
      rules.required(),
      rules.minLength(10),
      rules.maxLength(15),
      rules.unique({ table: 'clients', column: 'id_number' }),
    ]),
    phone_number: schema.number(),
    order_count: schema.number(),
  })


  public messages: CustomMessages = {
    'id_type.required': 'El tipo de identificación es obligatorio.',
    'id_number.required': 'El número de identificación es obligatorio.',
    'id_number.minLength': 'El número de identificación debe tener al menos 10 caracteres.',
    'id_number.maxLength': 'El número de identificación debe tener como máximo 15 caracteres.',
    'phone_number.required': 'El número de teléfono es obligatorio.',
    'phone_number.range': 'El número de teléfono debe estar entre 5 y 1000000000000.',
    'phone_number.unsigned': 'El número de teléfono no puede ser negativo.'
  }
}
