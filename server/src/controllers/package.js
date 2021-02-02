const { json } = require('body-parser');
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

exports.createPackageDetail = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO packages_details (
        includes,
        excludes,
        itinerary,
        validity,
        addition_info,
        prohibition_limitation_policy,
        confirmation,
        cancelation_policy,
        is_pickup,
        is_fixed_date_ticket,
        is_collect_physical_ticket,
        is_location_meetup,
        package_duration,
        pickup_info,
        free_cancelation_max_day
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *;`,
      [
        JSON.stringify(req.body.includes),
        JSON.stringify(req.body.excludes),
        JSON.stringify(req.body.itinerary),
        JSON.stringify(req.body.validity),
        JSON.stringify(req.body.addition_info),
        JSON.stringify(req.body.prohibition_limitation_policy),
        JSON.stringify(req.body.confirmation),
        JSON.stringify(req.body.cancelation_policy),
        req.body.is_pickup,
        req.body.is_fixed_date_ticket,
        req.body.is_collect_physical_ticket,
        req.body.is_location_meetup,
        req.body.package_duration,
        JSON.stringify(req.body.pickup_info),
        req.body.free_cancelation_max_day
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
