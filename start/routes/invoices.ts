//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/invoices", "InvoicesController.find");
    Route.get("/invoices/:id", "InvoicesController.find");
    Route.post("/invoices", "InvoicesController.create");
    Route.post("/invoicesMSP", "InvoicesController.createMSP");
    Route.put("/invoices/:id", "InvoicesController.update");
    Route.delete("/invoices/:id", "InvoicesController.delete");
}).middleware(["security"]);