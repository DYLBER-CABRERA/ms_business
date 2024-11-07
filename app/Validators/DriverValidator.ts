import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    
  /*   user_id: schema.string([
      rules.required(), // Asegura que el campo no esté vacío
    ]), */


    license_number: schema.number([
      rules.required(), // Asegura que el campo no esté vacío
      rules.unsigned(), //que no sea negativo
      rules.range(4, 2000000000000000),
      rules.unique({ table: 'drivers', column: 'license_number' })

    ]),
    expiration_date: schema.date({
      format: "yyyy-MM-dd",
    }),
    phone_number: schema.number([
      rules.required(), // Asegura que el campo no esté vacío
      rules.range(5, 1000000000000),
      rules.unsigned(), //que no sea negativo
    ]),
  });

  public messages: CustomMessages = {
    'user_id.required': 'El ID de usuario es obligatorio.',
    'license_number.required': 'El número de licencia es obligatorio.',
    'license_number.unsigned': 'El número de licencia no puede ser negativo.',
    'license_number.range': 'El número de licencia debe estar entre 4 y 2000000000000000.',
    'license_number.unique': 'El número de licencia ya está registrado.',
    'expiration_date.date.format': 'La fecha de expiración debe tener el formato yyyy-MM-dd.',
    'phone_number.required': 'El número de teléfono es obligatorio.',
    'phone_number.range': 'El número de teléfono debe estar entre 5 y 1000000000000.',
    'phone_number.unsigned': 'El número de teléfono no puede ser negativo.'
  };
}
