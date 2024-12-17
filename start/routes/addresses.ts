//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/address", "AddressesController.find");
    Route.get("/address/:id", "AddressesController.find");
    Route.post("/address", "AddressesController.create");
    Route.put("/address/:id", "AddressesController.update");
    Route.delete("/address/:id", "AddressesController.delete");

})//.middleware(["security"]);


