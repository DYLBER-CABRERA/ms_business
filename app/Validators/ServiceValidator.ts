import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional(),
    name: schema.string([
      rules.required(), // Asegura que el campo no esté vacío
      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
    ]),

    address: schema.string([
      rules.required(), // Asegura que el campo no esté vacío
      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
    ]),
    description: schema.string([
      rules.required(), // Asegura que el campo no esté vacío

      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
      rules.minLength(2),
      rules.maxLength(200),
    ]), //que rechaze la peticion en lugar de ingresar información basura a la base de datos
    date: schema.date({
      //* REVISA que si esté en formato de fecha
      format: "yyyy-MM-dd",
    }),
    administrator:schema.object.optional().members({
      id:schema.number([rules.exists({table:"administrators",column:"id"})])
    })
  });


  public messages: CustomMessages = {
    "name.required": "El nombre es obligatorio.",
    "address.required": "La dirección es obligatoria.",
    "description.required": "La descripción es obligatoria.",
    "date.format": "El formato de la fecha es incorrecto.",

    "driver_id.exists": "El id del conductor no existe.",
  };
}
