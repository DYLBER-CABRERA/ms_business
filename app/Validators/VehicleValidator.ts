import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class VehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    license_plate: schema.string([
      rules.required(),
      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
      rules.minLength(2),
      rules.maxLength(30),
      rules.unique({ table: "vehicles", column: "license_plate" }),
    ]),

    model: schema.string([
      rules.required(), // Asegura que el campo no esté vacío
      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
      rules.minLength(2),
      rules.maxLength(30),
      rules.unique({ table: "vehicles", column: "license_plate" }),
    ]),
    latitud_inicial: schema.number(),
    latitud_final: schema.number(),
    longitud_inicial: schema.number(),
    longitud_final: schema.number(),
    capacity: schema.number([
      rules.unsigned(), //que no sea negativo
      rules.range(1, 35000),
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

  public messages: CustomMessages = {
    "license_plate.required": "La placa es obligatoria.",
    "license_plate.alphaNum":
      "La placa solo puede contener letras, números, espacios, guiones bajos y guiones.",
    "license_plate.minLength": "La placa debe tener al menos 2 caracteres.",
    "license_plate.maxLength": "La placa no puede tener más de 30 caracteres.",
    "license_plate.unique": "La placa ya está registrada.",
  };
}
