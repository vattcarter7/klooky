const pool = require('../pool');

exports.createPackage = async (req, res) => {
  try {
    const {
      rows
    } = await pool.query(
      'INSERT INTO packages (name, price_model) VALUES ($1, $2) RETURNING *;',
      [req.body.name, JSON.stringify(req.body.price_model)]
    );

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message
    });
  }
};
