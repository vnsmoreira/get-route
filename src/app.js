import express from 'express';
import cors from 'cors';

import routes from '#routes';
import limiter from '#limiter';
import middleware from '#middleware';

const app = express();

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/distance', middleware, routes);

export { app };
