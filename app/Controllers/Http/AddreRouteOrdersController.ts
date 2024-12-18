import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddreRouteOrder from 'App/Models/AddreRouteOrder';
import AddreRouteOrderValidator from 'App/Validators/AddreRouteOrderValidator';
import { rules, schema } from "@ioc:Adonis/Core/Validator";

export default class AddreRouteOrdersController {
    public async find({ request, params }: HttpContextContract) {
        //si viene el id solo voy a mirar uno
        if (params.id) {//verifica en la ruta si viene un id
            //visualizo para mirar uno solo o varios en la base de datos y le dice espere hasta que se ejecute esa cansulta y los busca y si no lo encuetra falle y se levante un error 404 si existe todo esta bien
            let theAddreRouteOrder: AddreRouteOrder = await AddreRouteOrder.findOrFail(params.id)//visualizo para mirar uno solo o varios 
            await theAddreRouteOrder.load("addresses")
            await theAddreRouteOrder.load("route")        
            return theAddreRouteOrder;//retorna el teatro
        } else {
            //sino viene el identificador en la ruta
            const data = request.all()//listar a todos pero lo manda por tramos
             console.log(data);
            
                  if ("route_id" in data) {
                    return await AddreRouteOrder.query().where(
                      "route_id",
                      request.input("route_id")
                    );
                  } else if ("address_id" in data) {
                    return await AddreRouteOrder.query().where(
                      "address_id",
                      request.input("address_id")
                    );
                }else if ("page" in data && "per_page" in data) {//listelos y mandelos la primera pagina como por ejemplo. que pagina y cuantos por pagina
                const page = request.input('page', 1);//reques viene una pagina y guardala
                const perPage = request.input("per_page", 20);//manda por pagina 20 si no se la mada
                return await AddreRouteOrder.query().paginate(page, perPage)//devuelve y hace la consulta con query y la pagina osea tal pagina y cuantos elementos por pagina
            } else {
                return await AddreRouteOrder.query()//devuelvame todos los elementos de la clase de teatro.Liste los teatro
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(AddreRouteOrderValidator

            
        );//valida el request con el addrRouteOrderValidator
        const body = request.body();//toma la carta, lee el cuerpo del la carta y lo agrega a la variable body
        const theAddreRouteOrder: AddreRouteOrder = await AddreRouteOrder.create(body);//await es esperando dentro del hilo a que la clase addrRouteOrder la cual es el modelo del metodo creat de fetch y tendra el body la cual tiene el location y la capacidad y lo colocamos en la variable theAdress de tipo addrRouteOrder
        await theAddreRouteOrder.load("addresses")
        await theAddreRouteOrder.load("route")//cargamos la relacion de rutas
        
        return theAddreRouteOrder; //retornamos el teatro
    }
public async createForRoute({
    params,
    request,
    response,
  }: HttpContextContract) {
    const route_id = parseInt(params.route_id, 10);

    // Preparar los datos de validación
    const body = request.body();
    const AddreRouteOrderData = {
      ...body,
      route_id: route_id,
    };
    // Llamar a la función de validación
    await this.validateAddreRouteOrderData(request, AddreRouteOrderData);

    const theAddreRouteOrder: AddreRouteOrder = await AddreRouteOrder.create(AddreRouteOrderData);
    await theAddreRouteOrder.load("addresses")
    await theAddreRouteOrder.load("route")//cargamos la relacion de rutas//
    return response.status(201).json(theAddreRouteOrder);
  }

  public async createForAddress({
    params,
    request,
    response,
  }: HttpContextContract) {
    const address_id = parseInt(params.address_id, 10);

    // Preparar los datos de validación
    const body = request.body();
    const AddreRouteOrderData = {
      ...body,
      address_id: address_id,
    };

    console.log(AddreRouteOrderData);

    // Llamar a la función de validación
    await this.validateAddreRouteOrderData(request, AddreRouteOrderData);

    const theAddreRouteOrder: AddreRouteOrder = await AddreRouteOrder.create(AddreRouteOrderData);
    await theAddreRouteOrder.load("addresses")
    await theAddreRouteOrder.load("route")//
    return response.status(201).json(theAddreRouteOrder);
  }

    public async update({ params, request }: HttpContextContract) {
        const theAddreRouteOrder: AddreRouteOrder= await AddreRouteOrder.findOrFail(params.id);
        const body = request.body();
        theAddreRouteOrder.address_id = body.address_id;
        theAddreRouteOrder.route_id = body.route_id;
        theAddreRouteOrder.order_by = body.order_by;
        await theAddreRouteOrder.load("addresses")
        await theAddreRouteOrder.load("route")//cargamos la relacion de rutas
    
        return await theAddreRouteOrder.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAddreRouteOrder: AddreRouteOrder = await AddreRouteOrder.findOrFail(params.id);
        await theAddreRouteOrder.delete();
        return response.status(204).json({ message: "direccion orden ruta eliminado con exito" });


    }


  private async validateAddreRouteOrderData(
    request: HttpContextContract["request"],
    data: any
  ) {
    const validationSchema = schema.create({
      
    address_id: schema.number([
        rules.exists({ table: 'addresses', column: 'id' }),
        rules.unsigned(),
        rules.required()
      ]),
 
      route_id: schema.number([
        rules.required(),
        rules.unsigned(),
        rules.exists({ table: 'routes', column: 'id' }),
      ]),
      order_by: schema.number([
        rules.required(),
        rules.unsigned(),
      ])
    })
    // Usamos request.validate para validar los datos
    return await request.validate({
      schema: validationSchema,
      data,
    });
  }
}
