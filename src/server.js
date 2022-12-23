import 'dotenv/config';
import { app } from './app';
import waitForRequirements from './requirements';

const port = process.env.PORT || 3000;

await waitForRequirements(() => {
  app.listen(port);
  console.info('[app] running on port: ' + port);
});
