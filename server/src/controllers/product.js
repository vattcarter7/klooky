const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

exports.createProduct = async (req, res) => {
  try {
    const {
      rows
    } = await pool.query(
      'INSERT INTO products (name) VALUES ($1) RETURNING *;',
      [req.body.name]
    );

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message
    });
  }
};

//TODO: edit a product
