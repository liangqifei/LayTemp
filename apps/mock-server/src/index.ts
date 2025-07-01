import app from './app';
import config from './config';

const port = config.port || 3001;

app.listen(port, () => {
  console.log(`Mock server is running at http://localhost:${port}`);
}); 