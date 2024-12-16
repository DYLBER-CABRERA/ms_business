//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/products", "ProductsController.find");
    Route.get("/products/:id", "ProductsController.find");
    Route.post("/products", "ProductsController.create");
    Route.post('/products/batch/:batch_id', 'ProductsController.createForBatch');
    Route.post('/products/client/:client_id', 'ProductsController.createForClient');
    Route.put("/products/:id", "ProductsController.update");
    Route.delete("/products/:id", "ProductsController.delete");
})//.middleware(["security"]);
