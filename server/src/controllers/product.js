const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

exports.createProduct = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO product
      (
        product_duration,
        product_location,
        product_free_cancelation_max_day,
        published,
        is_pickup,
        is_fixed_date_ticket,
        is_collect_physical_ticket,
        is_location_meetup,
        is_joined_and_private_available,
        is_hotel_pickup
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`,
      [
        req.body.product_duration,
        JSON.stringify(req.body.product_location),
        req.body.product_free_cancelation_max_day || 0,
        req.body.published || false,
        req.body.is_pickup || false,
        req.body.is_fixed_date_ticket || false,
        req.body.is_collect_physical_ticket || false,
        req.body.is_location_meetup || false,
        req.body.is_joined_and_private_available || false,
        req.body.is_hotel_pickup || false
      ]
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

    const updateQuery = `UPDATE products SET
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
