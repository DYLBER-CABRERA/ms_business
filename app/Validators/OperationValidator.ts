import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.after('today')]),

    end_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.after('today'), rules.afterField('start_date')]),
    
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
    'start_date.required': 'La fecha de inicio es obligatoria.',
    'start_date.after': 'La fecha de inicio debe ser posterior a la fecha actual.',
    'end_date.required': 'La fecha de fin es obligatoria.',
    'end_date.after': 'La fecha de fin debe ser posterior a la fecha actual.',
    'end_date.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio.',
    'municipality_id.exists': 'El municipio especificado no existe.',
    'municipality_id.required': 'El ID del municipio es obligatorio.',
    'vehicle_id.exists': 'El vehículo especificado no existe.',
    'vehicle_id.unsigned': 'El ID del vehículo no puede ser negativo.',
    'vehicle_id.required': 'El ID del vehículo es obligatorio.',
    'vehicle_id.unique': 'El vehículo ya está en uso en otra operación.'

  }
}
