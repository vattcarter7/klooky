const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

exports.createProduct = async (req, res) => {
  try {
    //-- Begin transaction
    await pool.query('BEGIN');

    // 1. create a product
    const productResponse = await pool.query(
      `INSERT INTO product
      (
        product_duration,
        product_location,
        product_free_cancelation_max_day,
        product_validity_period,
        published,
        is_pickup,
        is_fixed_date_ticket,
        is_collect_physical_ticket,
        is_location_meetup,
        is_joined_and_private_available,
        is_hotel_pickup
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`,
      [
        req.body.product_duration,
        JSON.stringify(req.body.product_location),
        req.body.product_free_cancelation_max_day || 0,
        req.body.product_validity_period || 0,
        req.body.published || false,
        req.body.is_pickup || false,
        req.body.is_fixed_date_ticket || false,
        req.body.is_collect_physical_ticket || false,
        req.body.is_location_meetup || false,
        req.body.is_joined_and_private_available || false,
        req.body.is_hotel_pickup || false
      ]
    );

    // 2. create a product locale
    const productLocaleResponse = await pool.query(
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
        productResponse.rows[0].id,
        req.body.language_id,
        req.body.product_name,
        req.body.product_overview,
        JSON.stringify(req.body.product_highlights),
        JSON.stringify(req.body.product_prohibition_limitation),
        JSON.stringify(req.body.product_additional_info)
      ]
    );

    //-- Commit transaction
    await pool.query('COMMIT');

    const response = {
      product_id: productResponse.rows[0].id,
      ...productResponse.rows[0],
      product_locale_id: productLocaleResponse.rows[0].id,
      ...productLocaleResponse.rows[0]
    };

    // remove id of product_id from response because we assigned product_id instead
    response.id = undefined;

    res.send(response);
  } catch (err) {
    //-- Rollback transaction
    await pool.query('ROLLBACK');
    res.status(400).json({
      err: err.message,
      errMessage:
        err.message ===
        'duplicate key value violates unique constraint "product_locale_product_name_key"'
          ? 'product name must be unique. please change another name'
          : 'unable to add a product'
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const textQuery = `SELECT * FROM product where id=$1`;
    const response = await pool.query(textQuery, [req.params.id]);
    if (!response.rows[0]) {
      return res.status(404).json({
        errMessage: 'product not found'
      });
    }

    const updateQuery = `UPDATE product SET
                          product_duration                    =$1,
                          product_location                    =$2,
                          product_free_cancelation_max_day    =$3,
                          product_validity_period             =$4,
                          published                           =$5,
                          is_pickup                           =$6,
                          is_fixed_date_ticket                =$7,
                          is_collect_physical_ticket          =$8,
                          is_location_meetup                  =$9,
                          is_joined_and_private_available     =$10,
                          is_hotel_pickup                     =$11,
                          updated_at                          =to_timestamp($12)
                        WHERE id = $13 returning *;
                        `;

    const updateValues = [
      req.body.product_duration === undefined
        ? response.rows[0].product_duration
        : req.body.product_duration,

      req.body.product_location === undefined
        ? JSON.stringify(response.rows[0].product_location)
        : JSON.stringify(req.body.product_location),

      req.body.product_free_cancelation_max_day === undefined
        ? response.rows[0].product_free_cancelation_max_day
        : req.body.product_free_cancelation_max_day,

      req.body.product_validity_period === undefined
        ? response.rows[0].product_validity_period
        : req.body.product_validity_period,

      req.body.published === undefined
        ? response.rows[0].published
        : req.body.published,

      req.body.is_pickup === undefined
        ? response.rows[0].is_pickup
        : req.body.is_pickup,

      req.body.is_fixed_date_ticket === undefined
        ? response.rows[0].is_fixed_date_ticket
        : req.body.is_fixed_date_ticket,

      req.body.is_collect_physical_ticket === undefined
        ? response.rows[0].is_collect_physical_ticket
        : req.body.is_collect_physical_ticket,

      req.body.is_location_meetup === undefined
        ? response.rows[0].is_location_meetup
        : req.body.is_location_meetup,

      req.body.is_joined_and_private_available === undefined
        ? response.rows[0].is_joined_and_private_available
        : req.body.is_joined_and_private_available,

      req.body.is_hotel_pickup === undefined
        ? response.rows[0].is_hotel_pickup
        : req.body.is_hotel_pickup,

      toPgTimestamp(Date.now()),
      req.params.id
    ];

    const { rows } = await pool.query(updateQuery, updateValues);
    if (!rows[0]) {
      return res.status(400).json({
        errMessage: 'unable to update product'
      });
    }

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errMessage: 'unable to update product'
    });
  }
};
