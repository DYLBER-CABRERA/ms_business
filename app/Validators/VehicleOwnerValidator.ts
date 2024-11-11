import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehicleOwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    acquisition_date: schema.date({ format: 'yyyy-MM-dd HH:mm:ss'}),// Asegura que la fecha de adquisición tenga el formato yyyy-MM-dd HH:mm:ss


    ownership_percentage: schema.number([rules.unsigned(), rules.required,// Asegura que el porcentaje de propiedad no sea negativo
      rules.range(1, 100)]),// Asegura que el porcentaje de propiedad esté entre 1 y 100


    owner_id: schema.number([
      rules.exists({ table: 'owners', column: 'id' }),// Asegura que el ID del propietario exista en la tabla 'owners'
      rules.unsigned(),// Asegura que el ID del propietario no sea negativo
      rules.required()// Asegura que el campo no esté vacío
    ]),

    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }),// Asegura que el ID del vehículo exista en la tabla 'vehicles'
      rules.unsigned(),// Asegura que el ID del vehículo no sea negativo
      rules.required()// Asegura que el campo no esté vacío
    ])
  })

  public messages: CustomMessages = {
    'acquisition_date.date': 'La fecha de adquisición debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'ownership_percentage.unsigned': 'El porcentaje de propiedad no puede ser negativo.',
    'ownership_percentage.required': 'El porcentaje de propiedad es un campo obligatorio.',
    'ownership_percentage.range': 'El porcentaje de propiedad debe estar entre 1 y 100.',
    'owner_id.exists': 'El propietario especificado no existe.',
    'owner_id.unsigned': 'El ID del propietario no puede ser negativo.',
    'owner_id.required': 'El ID del propietario es un campo obligatorio.',
    'vehicle_id.exists': 'El vehículo especificado no existe.',
    'vehicle_id.unsigned': 'El ID del vehículo no puede ser negativo.',
    'vehicle_id.required': 'El ID del vehículo es un campo obligatorio.'
  }
}
