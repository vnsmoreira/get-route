require('dotenv/config');
const { app } = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info('[app] running on port: ' + port);
});
