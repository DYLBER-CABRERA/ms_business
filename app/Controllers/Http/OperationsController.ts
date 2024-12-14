import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operation from 'App/Models/Operation'
import OperationValidator from 'App/Validators/OperationValidator'

export default class OperationsController {
    public async find({ request, params }: HttpContextContract) {
        //si viene el id solo voy a mirar uno
        if (params.id) {//verifica en la ruta si viene un id
            //visualizo para mirar uno solo o varios en la base de datos y le dice espere hasta que se ejecute esa cansulta y los busca y si no lo encuetra falle y se levante un error 404 si existe todo esta bien
            let theOperation: Operation = await Operation.findOrFail(params.id)//visualizo para mirar uno solo o varios 
            await theOperation.load("municipality")
            await theOperation.load("vehicle")         
            return theOperation;//retorna el teatro
        } else {
            //sino viene el identificador en la ruta
            const data = request.all()//listar a todos pero lo manda por tramos
            if ("page" in data && "per_page" in data) {//listelos y mandelos la primera pagina como por ejemplo. que pagina y cuantos por pagina
                const page = request.input('page', 1);//reques viene una pagina y guardala
                const perPage = request.input("per_page", 20);//manda por pagina 20 si no se la mada
                return await Operation.query().paginate(page, perPage)//devuelve y hace la consulta con query y la pagina osea tal pagina y cuantos elementos por pagina
            } else {
                return await Operation.query()//devuelvame todos los elementos de la clase de teatro.Liste los teatro
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(OperationValidator);//valida el request con el OperationValidator
        const body = request.body();//toma la carta, lee el cuerpo del la carta y lo agrega a la variable body
        const theOperation: Operation = await Operation.create(body);//await es esperando dentro del hilo a que la clase Operation la cual es el modelo del metodo creat de fetch y tendra el body la cual tiene el location y la capacidad y lo colocamos en la variable theAdress de tipo Operation
        await theOperation.load("municipality");//cargamos la relacion de municipio
        await theOperation.load("vehicle");//cargamos la relacion de centro de distribucion
        return theOperation; //retornamos el teatro
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
        return response.status(204).json({ message: "operación eliminado con éxito" });
    }
    
}
