
//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/insurances", "InsurancesController.find");
    Route.get("/insurances/:id", "insurancesController.find");
    Route.post("/insurances", "insurancesController.create");
    Route.put("/insurances/:id", "insurancesController.update");
    Route.delete("/insurances/:id", "insurancesController.delete");
})//.middleware(["security"]);