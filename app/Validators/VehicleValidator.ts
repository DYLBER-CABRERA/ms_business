import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class VehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    //    public license_plate: String;
    //  public model: String;
    //  public capacity: number;
    //  public cargo_type: String;

    license_plate: schema.string([
      rules.required(), // Asegura que el campo no esté vacío

      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
      rules.minLength(2),
      rules.maxLength(30),
    ]),
    model: schema.string([
      rules.required(), // Asegura que el campo no esté vacío
      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
      rules.minLength(2),
      rules.maxLength(30),
    ]),
    capacity: schema.number([
      rules.unsigned(), //que no sea negativo
      rules.range(1, 1000000000),
    ]),
    cargo_type: schema.string([
      rules.required(), // Asegura que el campo no esté vacío
      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
      rules.minLength(2),
      rules.maxLength(200),
    ]),
  });

  public messages: CustomMessages = {};
}
