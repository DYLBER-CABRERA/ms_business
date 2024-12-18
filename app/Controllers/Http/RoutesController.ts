import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from 'App/Models/Route';
import RouteValidator from 'App/Validators/RouteValidator';
import { rules, schema } from "@ioc:Adonis/Core/Validator";
export default class RoutesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRoute: Route = await Route.findOrFail(params.id)
            await theRoute.load("Vehicle")
            await theRoute.load("contract")
            await theRoute.load("addreRouteOrders")
            return theRoute;
        } else {
             //sino viene el identificador en la ruta
                  const data = request.all(); //listar a todos pero lo manda por tramos
                  console.log(data);
            
                  if ("contract_id" in data) {
                    return await Route.query().where(
                      "contract_id",
                      request.input("contract_id")
                    );
                  } else if ("vehicle_id" in data) {
                    return await Route.query().where(
                      "vehicle_id",
                      request.input("vehicle_id")
                    );
                }
            else if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Route.query().paginate(page, perPage)
            } else {
                return await Route.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(RouteValidator);
        const body = request.body();
        const theRoute: Route = await Route.create(body);
        await theRoute.load("Vehicle")
        await theRoute.load("contract")
        await theRoute.load("addreRouteOrders")
        return theRoute;
    }

    
      public async createForContract({
        params,
        request,
        response,
      }: HttpContextContract) {
        const contract_id = parseInt(params.contract_id, 10);
    
        // Preparar los datos de validación
        const body = request.body();
        const routeData = {
          ...body,
          contract_id: contract_id,
        };
        // Llamar a la función de validación
        await this.validateRouteData(request, routeData);
    
        const theRoute: Route = await Route.create(routeData);
        await theRoute.load("Vehicle")
        await theRoute.load("contract")
        await theRoute.load("addreRouteOrders")
        return response.status(201).json(theRoute);
      }
    
      public async createForVehicle({
        params,
        request,
        response,
      }: HttpContextContract) {
        const vehicle_id = parseInt(params.vehicle_id, 10);
    
        // Preparar los datos de validación
        const body = request.body();
        const routeData = {
          ...body,
          vehicle_id: vehicle_id,
        };
    
        console.log(routeData);
    
        // Llamar a la función de validación
        await this.validateRouteData(request, routeData);
    
        const theRoute: Route = await Route.create(routeData);
        await theRoute.load("Vehicle")
        await theRoute.load("contract")
        await theRoute.load("addreRouteOrders")
        return response.status(201).json(theRoute);
      }
    public async update({ params, request }: HttpContextContract) {
        const theRoute: Route = await Route.findOrFail(params.id);
        const body = request.body();
        theRoute.starting_place = body.starting_place;
        theRoute.ending_place = body.ending_place;
        theRoute.distance = body.distance;
        theRoute.delivery_date = body.delivery_date;
        theRoute.contract_id = body.contract_id;
        theRoute.vehicle_id = body.vehicle_id;
        await theRoute.load("Vehicle")
        await theRoute.load("contract")
        await theRoute.load("addreRouteOrders")
        return await theRoute.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRoute: Route = await Route.findOrFail(params.id);
        await theRoute.delete();
        return response.status(200).json({
            message: 'Ruta eliminada con éxito',
        });
    }

    private async validateRouteData(
        request: HttpContextContract["request"],
        data: any
      ) {
        const validationSchema = schema.create({
            starting_place: schema.string({}, [
                rules.required(), // Asegura que el campo no esté vacío
                rules.alpha(), // Asegura que el valor solo contenga letras
                rules.maxLength(255), // Asegura que el valor no exceda los 255 caracteres
              ]),
              ending_place: schema.string({}, [
                rules.required(), // Asegura que el campo no esté vacío
                rules.alpha(), // Asegura que el valor solo contenga letras
                rules.maxLength(255), // Asegura que el valor no exceda los 255 caracteres
              ]),
          
              distance: schema.number([
                rules.required(), // Asegura que el campo no esté vacío
                rules.range(0, 3000), // Asegura que el valor esté entre 0 y 3000 km
                rules.unsigned(), // Asegura que el valor no sea negativo
              ]),
          
              delivery_date: schema.date({
                format: "yyyy-MM-dd",
          
              }),
              contract_id: schema.number([
                rules.unsigned(),
                rules.exists({ table: "contracts", column: "id" }),
              ]),
              vehicle_id: schema.number([
                rules.unsigned(),
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
