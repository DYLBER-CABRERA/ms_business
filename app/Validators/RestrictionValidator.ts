import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestrictionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string([
      rules.required(), // Asegura que el campo no esté vacío
      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
    ]),

 
      date_start: schema.date(
        { format: "yyyy-MM-dd HH:mm:ss" },
        [rules.after("today")] // Asegura que la fecha de la factura sea posterior a la fecha actual
      ),

      date_end: schema.date(
        { format: "yyyy-MM-dd HH:mm:ss" },
        [rules.after('today'),
          rules.afterField('date_start')] // Asegura que la fecha de la factura sea posterior a la fecha actual
      ),
      
      municipality_id: schema.number([
        rules.exists({ table: 'municipalities', column: 'id' }),// Asegura que el ID del municipio exista en la tabla 'municipalities'
        rules.unsigned(),// Asegura que el ID del municipio no sea negativo
        rules.required()// Asegura que el campo no esté vacío
      ])
  
    })

  public messages: CustomMessages = {}
}
