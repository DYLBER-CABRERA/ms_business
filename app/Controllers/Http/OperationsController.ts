import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Operation from "App/Models/Operation";
import OperationValidator from "App/Validators/OperationValidator";
import { rules, schema } from "@ioc:Adonis/Core/Validator";

export default class OperationsController {
  public async find({ request, params }: HttpContextContract) {
    //si viene el id solo voy a mirar uno
    if (params.id) {
      //verifica en la ruta si viene un id
      //visualizo para mirar uno solo o varios en la base de datos y le dice espere hasta que se ejecute esa cansulta y los busca y si no lo encuetra falle y se levante un error 404 si existe todo esta bien
      let theOperation: Operation = await Operation.findOrFail(params.id); //visualizo para mirar uno solo o varios
      await theOperation.load("municipality");
      await theOperation.load("vehicle");
      return theOperation; //retorna el teatro
    } else {
      //sino viene el identificador en la ruta
      const data = request.all(); //listar a todos pero lo manda por tramos
      console.log(data);

      if ("municipality_id" in data) {
        return await Operation.query().where(
          "municipality_id",
          request.input("municipality_id")
        );
      } else if ("vehicle_id" in data) {
        return await Operation.query().where(
          "vehicle_id",
          request.input("vehicle_id")
        );
      } else if ("page" in data && "per_page" in data) {
        //listelos y mandelos la primera pagina como por ejemplo. que pagina y cuantos por pagina
        const page = request.input("page", 1); //reques viene una pagina y guardala
        const perPage = request.input("per_page", 20); //manda por pagina 20 si no se la mada
        return await Operation.query().paginate(page, perPage); //devuelve y hace la consulta con query y la pagina osea tal pagina y cuantos elementos por pagina
      } else {
        return await Operation.query(); //devuelvame todos los elementos de la clase de teatro.Liste los teatro
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(OperationValidator); //valida el request con el OperationValidator
    const body = request.body(); //toma la carta, lee el cuerpo del la carta y lo agrega a la variable body
    const theOperation: Operation = await Operation.create(body); //await es esperando dentro del hilo a que la clase Operation la cual es el modelo del metodo creat de fetch y tendra el body la cual tiene el location y la capacidad y lo colocamos en la variable theAdress de tipo Operation
    await theOperation.load("municipality"); //cargamos la relacion de municipio
    await theOperation.load("vehicle"); //cargamos la relacion de centro de distribucion
    return theOperation; //retornamos el teatro
  }

  public async createForMunicipality({
    params,
    request,
    response,
  }: HttpContextContract) {
    const municipality_id = parseInt(params.municipality_id, 10);

    // Preparar los datos de validación
    const body = request.body();
    const operationData = {
      ...body,
      municipality_id: municipality_id,
    };
    // Llamar a la función de validación
    await this.validateOperationData(request, operationData);

    const theOperation: Operation = await Operation.create(operationData);
    await theOperation.load("municipality"); //cargamos la relacion de municipio
    await theOperation.load("vehicle"); //
    return response.status(201).json(theOperation);
  }

  public async createForVehicle({
    params,
    request,
    response,
  }: HttpContextContract) {
    const vehicle_id = parseInt(params.vehicle_id, 10);

    // Preparar los datos de validación
    const body = request.body();
    const operationData = {
      ...body,
      vehicle_id: vehicle_id,
    };

    console.log(operationData);

    // Llamar a la función de validación
    await this.validateOperationData(request, operationData);

    const theOperation: Operation = await Operation.create(operationData);
    await theOperation.load("municipality"); //cargamos la relacion de municipio
    await theOperation.load("vehicle"); //
    return response.status(201).json(theOperation);
  }
  public async update({ params, request }: HttpContextContract) {
    const theOperation: Operation = await Operation.findOrFail(params.id);
    const body = request.body();
    theOperation.start_date = body.start_date;
    theOperation.end_date = body.end_date;
    theOperation.vehicle_id = body.vehicle_id;
    theOperation.municipality_id = body.municipality_id;

    return await theOperation.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theOperation: Operation = await Operation.findOrFail(params.id);
    await theOperation.delete();
    return response
      .status(204)
      .json({ message: "operación eliminado con éxito" });
  }

  private async validateOperationData(
    request: HttpContextContract["request"],
    data: any
  ) {
    const validationSchema = schema.create({
      start_date: schema.date({ format: "yyyy-MM-dd" }, [
        rules.afterOrEqual("today"),
      ]),

      end_date: schema.date({ format: "yyyy-MM-dd" }, [
        rules.afterOrEqual("today"),
        rules.afterField("start_date"),
      ]),

      municipality_id: schema.number([
        rules.exists({ table: "municipalities", column: "id" }),
        rules.required(),
      ]),
      vehicle_id: schema.number([
        rules.exists({ table: "vehicles", column: "id" }),
        rules.required(),
        rules.exists({ table: "operations", column: "vehicle_id" }), // Asegura que el vehicle_id sea único
      ]),
    });

    // Usamos request.validate para validar los datos
    return await request.validate({
      schema: validationSchema,
      data,
    });
  }
}
