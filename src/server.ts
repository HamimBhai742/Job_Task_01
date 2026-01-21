import { Server } from 'http';
import { app } from './app';
import { ENV } from './config/env';
import { connectDB } from './config/connect.db';
import { seedAdmin } from './utils/seedAdmin';
let server: Server;
const PORT = ENV.PORT;
function startServer() {
  server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

(() => {
  connectDB();
  startServer();
  seedAdmin();
})();
