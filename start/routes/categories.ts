//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/categories", "CategoriesController.find");
    Route.get("/categories/:id", "CategoriesController.find");
    Route.post("/categories", "CategoriesController.create");
    Route.put("/categories/:id", "CategoriesController.update");
    Route.delete("/categories/:id", "CategoriesController.delete");
})
