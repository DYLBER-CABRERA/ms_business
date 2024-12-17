import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InsuranceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    insurance_type: schema.string({ trim: true }, [
      rules.required(),// Asegura que el campo no esté vacío
      rules.maxLength(255)// Asegura que el campo no tenga más de 255 caracteres
    ]),
    start_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.afterOrEqual('today')]),

    end_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.afterOrEqual('today'), rules.afterField('start_date')]),
    
    insurance_company: schema.string({ trim: true }, [// Asegura que el campo no tenga espacios en blanco al principio y al final
      rules.required(),// Asegura que el campo no esté vacío
      rules.maxLength(255)// Asegura que el campo no tenga más de 255 caracteres
    ]),
    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }),
      rules.unsigned(),// Asegura que el ID del vehículo no sea negativo
      rules.required()// Asegura que el campo no esté vacío
    ])
  })

  
  public messages: CustomMessages = {
    'insurance_type.required': 'El tipo de poliza es obligatorio.',
    'insurance_type.maxLength': 'El tipo de poliza no puede tener más de 255 caracteres.',
    'start_date.date': 'La fecha de inicio de la poliza debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'start_date.required': 'La fecha de inicio de la poliza es obligatoria.',
    'start_date.after': 'La fecha de inicio de la poliza debe ser posterior a la fecha actual.',
    'end_date.date': 'La fecha de fin de la poliza debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'end_date.required': 'La fecha de fin de la poliza es obligatoria.',
    'end_date.after': 'La fecha de fin de la poliza debe ser posterior a la fecha actual.',
    'end_date.afterField': 'La fecha de fin de la poliza debe ser posterior a la fecha de inicio.',
    'insurance_company.required': 'La compañia de seguros es obligatoria.',
    'insurance_company.maxLength': 'La compañia de seguros no puede tener más de 255 caracteres.',
    'vehicle_id.exists': 'El vehículo especificado no existe.',
    'vehicle_id.unsigned': 'El ID del vehículo no puede ser negativo.',
    'vehicle_id.required': 'El ID del vehículo es un campo obligatorio.'
  }
}
