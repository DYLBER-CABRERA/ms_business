//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/addreRouteOrders", "AddreRouteOrdersController.find");
    Route.get("/addreRouteOrders/:id", "AddreRouteOrdersController.find");
    Route.post("/addreRouteOrders", "AddreRouteOrdersController.create");
    Route.put("/addreRouteOrders/:id", "AddreRouteOrdersController.update");
    Route.delete("/addreRouteOrders/:id", "AddreRouteOrdersController.delete");
})

