import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class QuotaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    amount: schema.number([rules.required(),// Asegura que el campo no esté vacío
      rules.unsigned(), // Asegura que la cantidad sea un número entero positivo y no negativo
      rules.range(10000, 2500000) // Asegura que la cantidad esté entre 1 y 1000000
    ]),
    

    interest_rate: schema.number([rules.required(),
      rules.unsigned(), // Asegura que la tasa de interés sea un número entero positivo y no negativo
      rules.range(1, 100) // Asegura que la tasa de interés esté entre
    ]),

    due_date: schema.date({ format: 'yyyy-MM-dd'}, [
      rules.required(),
      rules.after('today') // Asegura que la fecha de vencimiento sea posterior a la fecha actual,
    ]),
    status: schema.boolean([
      rules.required()// Asegura que el campo no esté vacío
      
    ]),
    contract_id: schema.number(
      [rules.exists({ table: 'contracts', column: 'id' }),
      rules.unsigned(),// Asegura que el ID del contrato no sea negativo
      rules.required(),// Asegura que el campo no esté vacío
   /*    rules.unique({ table: 'quotas', column: 'contract_id' }) // Asegura que el contract_id sea único */
    ]
    ),

  })

 
  public messages: CustomMessages = {
    'amount.required': 'El monto es obligatorio.',
    'amount.unsigned': 'El monto no puede ser negativo.',
    'amount.range': 'El monto debe estar entre 10000 y 2500000.',
    'interest_rate.required': 'La tasa de interés es obligatoria.',
    'interest_rate.unsigned': 'La tasa de interés no puede ser negativa.',
    'interest_rate.range': 'La tasa de interés debe estar entre 1 y 100.',
    'due_date.required': 'La fecha de vencimiento es obligatoria.',
    'due_date.after': 'La fecha de vencimiento debe ser posterior a la fecha actual.',
    'status.required': 'El estado es obligatorio.',
    'contract_id.exists': 'El contrato especificado no existe.',
    'contract_id.unsigned': 'El ID del contrato no puede ser negativo.',
    'contract_id.required': 'El ID del contrato es un campo obligatorio.',

  }
}
