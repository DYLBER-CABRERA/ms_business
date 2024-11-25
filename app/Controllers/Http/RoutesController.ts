import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from 'App/Models/Route';
import RouteValidator from 'App/Validators/RouteValidator';

export default class RoutesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRoute: Route = await Route.findOrFail(params.id)
            await theRoute.load("Vehicle")
            await theRoute.load("contract")
            await theRoute.load("addreRouteOrders")
            return theRoute;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
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

    public async update({ params, request }: HttpContextContract) {
        const theRoute: Route = await Route.findOrFail(params.id);
        const body = request.body();
        theRoute.startingPlace = body.startingPlace;
        theRoute.endingPlace = body.endingPlace;
        theRoute.distance = body.distance;
        theRoute.deliveryDate = body.deliveryDate;
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
}
