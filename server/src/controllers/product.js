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

exports.editProduct = async (req, res) => {
  try {
    const textQuery = `SELECT * FROM products where id=$1`;
    const response = await pool.query(textQuery, [req.params.id]);
    if (!response.rows[0]) {
      return res.status(404).json({
        errorMsg: 'product not found'
      });
    }

    const updateQuery = `UPDATE packages_details SET
                          name                            =$1,
                          updated_at                      =to_timestamp($2)
                        WHERE id = $3 returning *;
                        `;

    const updateValues = [
      req.body.name,
      toPgTimestamp(Date.now()),
      req.params.id
    ];

    const { rows } = await pool.query(updateQuery, updateValues);
    if (!rows[0]) {
      return res.status(400).json({
        err: err.message,
        errorMsg: 'unable to update product'
      });
    }

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errorMsg: err.message
    });
  }
};
