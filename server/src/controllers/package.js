const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

// create a new package with package detail locale
exports.createPackage = async (req, res) => {
  try {
    //-- Begin transaction
    await pool.query('BEGIN');

    // 1. create a package
    const packageResponse = await pool.query(
      `INSERT INTO package
      (
        product_id,
        published
      ) VALUES ($1, $2) RETURNING *;`,
      [req.body.product_id, req.body.published || false]
    );

    if (!packageResponse.rows[0]) {
      await pool.query('ROLLBACK');
      return res.status(400).json({
        errMsg: 'Unable to create a package'
      });
    }

    // 2. create a package detail locale
    const packageDetailLocaleResponse = await pool.query(
      `INSERT INTO package_detail_locale
      (
        package_id,
        language_id,
        package_name,
        package_includes,
        package_excludes,
        package_itinerary,
        package_pickup_info,
        package_additional_info
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      [
        packageResponse.rows[0].id,
        req.body.language_id,
        req.body.package_name,
        JSON.stringify(req.body.package_includes),
        JSON.stringify(req.body.package_excludes),
        JSON.stringify(req.body.package_itinerary),
        JSON.stringify(req.body.package_pickup_info),
        JSON.stringify(req.body.package_additional_info)
      ]
    );

    //-- Commit transaction
    await pool.query('COMMIT');

    const response = {
      package_id: packageResponse.rows[0].id,
      ...packageResponse.rows[0],
      package_detail_locale_id: packageDetailLocaleResponse.rows[0].id,
      ...packageDetailLocaleResponse.rows[0]
    };

    // remove id of package_id from response because we assigned package_id instead
    response.id = undefined;

    res.send(response);
  } catch (err) {
    //-- Rollback transaction
    await pool.query('ROLLBACK');
    console.log(err);
    res.status(400).json({
      err: err.message,
      errMsg: 'Unable to create a package'
    });
  }
};

// edit a package
exports.editPackage = async (req, res) => {
  try {
    const textQuery = `SELECT * FROM package where id=$1`;
    const response = await pool.query(textQuery, [req.params.id]);
    if (!response.rows[0]) {
      return res.status(404).json({
        errorMsg: 'package not found'
      });
    }

    const updateQuery = `UPDATE package SET
                          published             =$1,
                          updated_at            =to_timestamp($2)
                        WHERE id = $3 returning *;
                        `;

    const updateValues = [
      req.body.published === undefined
        ? response.rows[0].published
        : req.body.published,

      toPgTimestamp(Date.now()),

      req.params.id
    ];

    const { rows } = await pool.query(updateQuery, updateValues);
    if (!rows[0]) {
      return res.status(400).json({
        errorMsg: 'unable to update package'
      });
    }

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg: 'unable to update package'
    });
  }
};

exports.createPackageDetail = async (req, res) => {
  //TODO: must add packageId later
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

exports.editPackageDetail = async (req, res) => {
  try {
    const textQuery = `SELECT * FROM packages_details where id=$1`;
    const response = await pool.query(textQuery, [req.params.id]);
    if (!response.rows[0]) {
      return res.status(404).json({
        errorMsg: 'package not found'
      });
    }

    const updateQuery = `UPDATE packages_details SET
                            includes                            =$1,
                            excludes                            =$2,
                            itinerary                           =$3,
                            validity                            =$4,
                            addition_info                       =$5,
                            prohibition_limitation_policy       =$6,
                            confirmation                        =$7,
                            cancelation_policy                  =$8,
                            is_pickup                           =$9,
                            is_fixed_date_ticket                =$10,
                            is_collect_physical_ticket          =$11,
                            is_location_meetup                  =$12,
                            package_duration                    =$13,
                            pickup_info                         =$14,
                            free_cancelation_max_day            =$15,
                            updated_at                          =to_timestamp($16)
                          WHERE id = $17 returning *;
                          `;

    const updateValues = [
      JSON.stringify(req.body.includes) ||
        JSON.stringify(response.rows[0].includes),
      JSON.stringify(req.body.excludes) ||
        JSON.stringify(response.rows[0].excludes),
      JSON.stringify(req.body.itinerary) ||
        JSON.stringify(response.rows[0].itinerary),
      JSON.stringify(req.body.validity) ||
        JSON.stringify(response.rows[0].validity),
      JSON.stringify(req.body.addition_info) ||
        JSON.stringify(response.rows[0].addition_info),
      JSON.stringify(req.body.prohibition_limitation_policy) ||
        JSON.stringify(response.rows[0].prohibition_limitation_policy),
      JSON.stringify(req.body.confirmation) ||
        JSON.stringify(response.rows[0].confirmation),
      JSON.stringify(req.body.cancelation_policy) ||
        JSON.stringify(response.rows[0].cancelation_policy),
      req.body.is_pickup || response.rows[0].is_pickup,
      req.body.is_fixed_date_ticket || response.rows[0].is_fixed_date_ticket,
      req.body.is_collect_physical_ticket ||
        response.rows[0].is_collect_physical_ticket,
      req.body.is_location_meetup || response.rows[0].is_location_meetup,
      req.body.package_duration || response.rows[0].package_duration,
      JSON.stringify(req.body.pickup_info) ||
        JSON.stringify(response.rows[0].pickup_info),
      req.body.free_cancelation_max_day ||
        response.rows[0].free_cancelation_max_day,
      toPgTimestamp(Date.now()),
      req.params.id
    ];

    const { rows } = await pool.query(updateQuery, updateValues);
    if (!rows[0]) {
      return res.status(400).json({
        err: err.message,
        errorMsg: 'unable to update package detail'
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

exports.deletePackage = async (req, res) => {
  try {
    const {
      rows
    } = await pool.query('DELETE FROM packages WHERE id=$1 returning *', [
      req.params.id
    ]);

    if (!rows[0])
      return res.status(404).json({
        errorMsg: 'cannot delete that package'
      });

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message
    });
  }
};
