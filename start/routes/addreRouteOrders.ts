//rutas para activar los controladores
import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/addreRouteOrders", "AddreRouteOrdersController.find");
  Route.get("/addreRouteOrders/:id", "AddreRouteOrdersController.find");
  Route.post("/addreRouteOrders", "AddreRouteOrdersController.create");
  Route.post(
    "/addreRouteOrders/route/:route_id",
    "AddreRouteOrdersController.createForRoute"
  );
  Route.post(
    "/addreRouteOrders/address/:address_id",
    "AddreRouteOrdersController.createForAddress"
  );
  Route.put("/addreRouteOrders/:id", "AddreRouteOrdersController.update");
  Route.delete("/addreRouteOrders/:id", "AddreRouteOrdersController.delete");
}); //.middleware(["security"]);
