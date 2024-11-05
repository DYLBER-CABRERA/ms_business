//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/addrRouteOrders", "AddrRouteOrdersController.find");
    Route.get("/addrRouteOrders/:id", "AddrRouteOrdersController.find");
    Route.post("/addrRouteOrders", "AddrRouteOrdersController.create");
    Route.put("/addrRouteOrders/:id", "AddrRouteOrdersController.update");
    Route.delete("/addrRouteOrders/:id", "AddrRouteOrdersController.delete");
})
