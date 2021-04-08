const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

exports.createProductLocale = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO product_locale
      (
        product_id,
        language_id,
        product_name,
        product_validity_period,
        product_overview,
        product_highlights,
        product_prohibition_limitation,
        product_additional_info
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      [
        req.body.product_id,
        req.body.language_id,
        req.body.product_name,
        req.body.product_validity_period,
        JSON.stringify(req.body.product_overview),
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
