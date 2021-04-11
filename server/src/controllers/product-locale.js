const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

// create a new product locale
exports.createProductLocale = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO product_locale
      (
        product_id,
        language_id,
        product_name,
        product_overview,
        product_highlights,
        product_prohibition_limitation,
        product_additional_info
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      [
        req.body.product_id,
        req.body.language_id,
        req.body.product_name,
        req.body.product_overview,
        JSON.stringify(req.body.product_highlights),
        JSON.stringify(req.body.product_prohibition_limitation),
        JSON.stringify(req.body.product_additional_info)
      ]
    );

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg: 'unable to add a product locale'
    });
  }
};

// edit a product locale
exports.editProductLocale = async (req, res) => {
  try {
    const textQuery = `SELECT * FROM product_locale where id=$1`;
    const response = await pool.query(textQuery, [req.params.id]);
    if (!response.rows[0]) {
      return res.status(404).json({
        errorMsg: 'product locale not found'
      });
    }

    const updateQuery = `UPDATE product_locale SET
                          product_id                      =$1,
                          language_id                     =$2,
                          product_name                    =$3,
                          product_overview                =$4,
                          product_highlights              =$5,
                          product_prohibition_limitation  =$6,
                          product_additional_info         =$7,
                          updated_at                      =to_timestamp($8)
                        WHERE id = $9 returning *;
                        `;

    const updateValues = [
      req.body.product_id === undefined
        ? response.rows[0].product_id
        : req.body.product_id,

      req.body.language_id === undefined
        ? response.rows[0].language_id
        : req.body.language_id,

      req.body.product_name === undefined
        ? response.rows[0].product_name
        : req.body.product_name,

      req.body.product_overview === undefined
        ? response.rows[0].product_overview
        : req.body.product_overview,

      req.body.product_highlights === undefined
        ? JSON.stringify(response.rows[0].product_highlights)
        : JSON.stringify(req.body.product_highlights),

      req.body.product_prohibition_limitation === undefined
        ? JSON.stringify(response.rows[0].product_prohibition_limitation)
        : JSON.stringify(req.body.product_prohibition_limitation),

      req.body.product_additional_info === undefined
        ? JSON.stringify(response.rows[0].product_additional_info)
        : JSON.stringify(req.body.product_additional_info),

      toPgTimestamp(Date.now()),
      req.params.id
    ];

    console.log(updateValues);

    const { rows } = await pool.query(updateQuery, updateValues);
    if (!rows[0]) {
      return res.status(400).json({
        errorMsg: 'unable to update product'
      });
    }

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg: 'unable to update product'
    });
  }
};
