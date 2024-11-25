//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/batches", "BatchesController.find");
    Route.get("/batches/:id", "BatchesController.find");
    Route.post("/batches", "BatchesController.create");
    Route.put("/batches/:id", "BatchesController.update");
    Route.delete("/batches/:id", "BatchesController.delete");
}).middleware(["security"]);
