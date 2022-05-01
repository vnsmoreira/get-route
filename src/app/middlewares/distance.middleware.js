module.exports = (req, res, next) => {
  let addresses, mode;

  if (req.method == 'POST') {
    addresses = req.body.addresses;
    mode = req.body.mode;
  } else {
    addresses = [req.params.addressA, req.params.addressB];
    mode = req.query.mode;
  }

  const isNotArrayOfStrings = addresses
    .map(address => typeof address)
    .some(type => type !== 'string');

  if (!Array.isArray(addresses) || isNotArrayOfStrings) {
    return res.status(400).send({ error: '"addresses" must be an array of strings' });
  }

  if (mode !== 'driving' && mode !== 'walking' && mode !== undefined) {
    return res.status(400).send({ error: '"mode" option should be either "driving" or "walking"' });
  }

  next();
};
