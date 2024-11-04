import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DistributionCenter from 'App/Models/DistributionCenter';
import DistributionCenterValidator from 'App/Validators/DistributionCenterValidator';

export default class DistributionCentersController {
    public async find({ request, params }: HttpContextContract) {
        //si viene el id solo voy a mirar uno
        if (params.id) {//verifica en la ruta si viene un id
            //visualizo para mirar uno solo o varios en la base de datos y le dice espere hasta que se ejecute esa cansulta y los busca y si no lo encuetra falle y se levante un error 404 si existe todo esta bien
            let theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id)//visualizo para mirar uno solo o varios 
            await theDistributionCenter.load("address")
            await theDistributionCenter.load("municipality")
         
            return theDistributionCenter;//retorna el teatro
        } else {
            //sino viene el identificador en la ruta
            const data = request.all()//listar a todos pero lo manda por tramos
            if ("page" in data && "per_page" in data) {//listelos y mandelos la primera pagina como por ejemplo. que pagina y cuantos por pagina
                const page = request.input('page', 1);//reques viene una pagina y guardala
                const perPage = request.input("per_page", 20);//manda por pagina 20 si no se la mada
                return await DistributionCenter.query().paginate(page, perPage)//devuelve y hace la consulta con query y la pagina osea tal pagina y cuantos elementos por pagina
            } else {
                return await DistributionCenter.query()//devuelvame todos los elementos de la clase de teatro.Liste los teatro
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(DistributionCenterValidator);//valida el request con el DistributionCenterValidator
        const body = request.body();//toma la carta, lee el cuerpo del la carta y lo agrega a la variable body
        const theDistributionCenter: DistributionCenter = await DistributionCenter.create(body);//await es esperando dentro del hilo a que la clase DistributionCenter la cual es el modelo del metodo creat de fetch y tendra el body la cual tiene el location y la capacidad y lo colocamos en la variable theAdress de tipo DistributionCenter
        await theDistributionCenter.load("municipality");//cargamos la relacion de municipio
        await theDistributionCenter.load("address");//cargamos la relacion de centro de distribucion
        return theDistributionCenter; //retornamos el teatro
    }

    public async update({ params, request }: HttpContextContract) {
        const theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id);
        const body = request.body();
        theDistributionCenter.name = body.name;
        theDistributionCenter.phone = body.phone;
        theDistributionCenter.email = body.email;
        theDistributionCenter.capacity = body.capacity;
        theDistributionCenter.address_id = body.address_id;
        theDistributionCenter.municipality_id = body.municipality_id;
    
        return await theDistributionCenter.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id);
            response.status(204);
            return await theDistributionCenter.delete();
    }
}
