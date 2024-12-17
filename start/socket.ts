import MessagesController from "App/Controllers/Http/MessagesController";
import Ws from "App/Services/Ws";
Ws.boot();

Ws.io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  // Maneja mensajes del chat
  socket.on("message", async (message) => {
    console.log("Mensaje recibido:", message);
    // Guardar el mensaje en la base de datos utilizando el controlador
    const messagesController = new MessagesController();
    await messagesController.createByWebSocket(message);

    // Emitir el mensaje a todos los clientes conectados
    Ws.io.emit("message", message);
  });

  // Maneja desconexiones
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
