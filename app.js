const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes.js'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Running on port:${port}`);
});
