import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }),
    end_date: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }),
    municipality_id: schema.number([
      rules.exists({ table: 'municipalities', column: 'id' }),
      rules.required()

    ]),
    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }),
      rules.unsigned(),
      rules.required(),
      rules.unique({ table: 'operations', column: 'vehicle_id' }) // Asegura que el vehicle_id sea único
   ] ),
  })

  public messages: CustomMessages = {
    'start_date.date': 'La fecha de inicio debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'end_date.date': 'La fecha de fin debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'municipality_id.exists': 'El municipio especificado no existe.',
    'municipality_id.unsigned': 'El ID del municipio no puede ser negativo.',
    'municipality_id.required': 'El ID del municipio es un campo obligatorio.',
    'vehicle_id.exists': 'El vehículo especificado no existe.',
    'vehicle_id.unsigned': 'El ID del vehículo no puede ser negativo.',
    'vehicle_id.required': 'El ID del vehículo es un campo obligatorio.'
  }
}
