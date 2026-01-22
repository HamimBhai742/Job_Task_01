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

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (error) => {
  console.log(error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.log(error);
  process.exit(1);
});

process.on('exit', () => {
  server.close(() => {
    console.log('Server closed');
  });
});
