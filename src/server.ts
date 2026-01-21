import { Server } from 'http';
import { app } from './app';
import { ENV } from './config/env';
let server: Server;
const PORT = ENV.PORT;
function startServer() {
  server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}


startServer();
