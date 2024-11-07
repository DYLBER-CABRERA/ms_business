import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import AddressValidator from 'App/Validators/AddressValidator';

export default class AddressesController {
    public async find({ request, params }: HttpContextContract) {
        //si viene el id solo voy a mirar uno
        if (params.id) {//verifica en la ruta si viene un id
            //visualizo para mirar uno solo o varios en la base de datos y le dice espere hasta que se ejecute esa consulta y los busca y si no lo encuetra falle y se levante un error 404 si existe todo esta bien
            let theAddress: Address = await Address.findOrFail(params.id)//visualizo para mirar uno solo o varios 
            await theAddress.load("municipality")
            await theAddress.load("distributionCenter")
            await theAddress.load("startAddressOrders")
            await theAddress.load("endAddressOrders")
            return theAddress;//retorna el teatro
        } else {
            //sino viene el identificador en la ruta
            const data = request.all()//listar a todos pero lo manda por tramos
            if ("page" in data && "per_page" in data) {//listelos y mandelos la primera pagina como por ejemplo. que pagina y cuantos por pagina
                const page = request.input('page', 1);//reques viene una pagina y guardala
                const perPage = request.input("per_page", 20);//manda por pagina 20 si no se la mada
              const addresses = await Address.query().preload('municipality').paginate(page, perPage)
        return addresses//devuelve y hace la consulta con query y la pagina osea tal pagina y cuantos elementos por pagina
            } else {
                return await Address.query()//devuelvame todos los elementos de la clase de teatro.Liste los teatro
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(AddressValidator);//valida el request con el AddressValidator
        const body = request.body();//toma la carta, lee el cuerpo del la carta y lo agrega a la variable body
        const theAddress: Address = await Address.create(body);//await es esperando dentro del hilo a que la clase address la cual es el modelo del metodo creat de fetch y tendra el body la cual tiene los atriutos de address y lo colocamos en la variable theAdress de tipo address
        await theAddress.load("municipality");//cargamos la relacion de municipio
        await theAddress.load("distributionCenter");//cargamos la relacion de centro de distribucion
      

       
        return theAddress; //retornamos el teatro
    }

    public async update({ params, request }: HttpContextContract) {
        const theAddress: Address = await Address.findOrFail(params.id);
        const body = request.body();
        theAddress.street = body.street;
        theAddress.number = body.number;
        theAddress.neighborhood = body.neighborhood;
        theAddress.reference = body.reference;
        theAddress.municipality_id = body.municipality_id;
    
        await theAddress.save();
        await theAddress.load('municipality') // Carga la relación 'municipality'
        return theAddress
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAddress: Address = await Address.findOrFail(params.id);
            response.status(204);
            return await theAddress.delete();
    }
}
