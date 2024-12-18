import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import VehicleDriver from "App/Models/VehicleDriver";
import VehicleDriverValidator from "App/Validators/VehicleDriverValidator";

import { rules, schema } from "@ioc:Adonis/Core/Validator";


export default class VehicleDriversController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(
        params.id
      );
      await theVehicleDriver.load("driver"); //devuelve la info de que administrador tiene ese servicio
      await theVehicleDriver.load("vehicle");

      return theVehicleDriver;
    } else {
      const data = request.all();
      console.log(data);

      if ("driver_id" in data) {
        return await VehicleDriver.query().where(
          "driver_id",
          request.input("driver_id")
        );
      } else if ("vehicle_id" in data) {
        return await VehicleDriver.query().where(
          "vehicle_id",
          request.input("vehicle_id")
        );
      } else if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await VehicleDriver.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await VehicleDriver.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(VehicleDriverValidator); //*cuando se llame este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador

    const body = request.body();
    const theVehicleDriver: VehicleDriver = await VehicleDriver.create(body);
    await theVehicleDriver.load("driver"); //devuelve la info de que administrador tiene ese servicio
    await theVehicleDriver.load("vehicle");
    return theVehicleDriver;
  }

  public async update({ params, request }: HttpContextContract) {
    const theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(
      params.id
    );
    const body = request.body(); //leer lo que viene en la carta
    theVehicleDriver.vehicle_id = body.vehicle_id; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theVehicleDriver.driver_id = body.driver_id;
    await theVehicleDriver.load("driver"); //devuelve la info de que administrador tiene ese servicio
    await theVehicleDriver.load("vehicle");
    return await theVehicleDriver.save(); //se confirma a la base de datos el cambio
  }

  
        public async createForDriver({
          params,
          request,
          response,
        }: HttpContextContract) {
          const driver_id = parseInt(params.driver_id, 10);
      
          // Preparar los datos de validación
          const body = request.body();
          const vehicleDriverData = {
            ...body,
            driver_id: driver_id,
          };
  
          console.log(vehicleDriverData);
          
          // Llamar a la función de validación
          await this.validateVehicleDriverData(request, vehicleDriverData);
      
          const theVehicleDriver: VehicleDriver = await VehicleDriver.create(vehicleDriverData);
          await theVehicleDriver.load("driver")
          await theVehicleDriver.load("vehicle")
          return response.status(201).json(theVehicleDriver);
        }
      
        public async createForVehicle({
          params,
          request,
          response,
        }: HttpContextContract) {
          const vehicle_id = parseInt(params.vehicle_id, 10);
      
          // Preparar los datos de validación
          const body = request.body();
          const vehicleDriverData = {
            ...body,
            vehicle_id: vehicle_id,
          };
      
          console.log(vehicleDriverData);
      
          // Llamar a la función de validación
          await this.validateVehicleDriverData(request, vehicleDriverData);
      
          const theVehicleDriver: VehicleDriver = await VehicleDriver.create(vehicleDriverData);
          await theVehicleDriver.load("driver")
          await theVehicleDriver.load("vehicle")
          return response.status(201).json(theVehicleDriver);
        }
  public async delete({ params, response }: HttpContextContract) {
    //
    const theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(
      params.id
    ); //buscarlo
    response.status(204);

    return await theVehicleDriver.delete(); //el teatro que se encontro, eliminelo
  }

  private async validateVehicleDriverData(
    request: HttpContextContract["request"],
    data: any
  ) {
    const validationSchema = schema.create({
     
      driver_id: schema.number([
        //*REVISA que el conductor con ese id si exista en la tabla de conductores
        rules.exists({ table: "drivers", column: "id" }),
      ]),
  
      //! PARA CUANDO ESTÉ LA CLASE VEHICLE
      vehicle_id: schema.number([
        //*REVISA que el vehiculo con ese id si exista en la tabla de conductores
        rules.exists({ table: "vehicles", column: "id" }),
      ]),
    });
  
    // Usamos request.validate para validar los datos
    return await request.validate({
      schema: validationSchema,
      data,
    });
  }
}
