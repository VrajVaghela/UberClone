const http = require('http');
const app = require('./app');
const connectToDb = require('./db/db');

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDb();
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

startServer();