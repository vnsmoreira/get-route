const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./app/routes/distance.routes')(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Running on port:${port}`);
});
