/* eslint-disable camelcase */

exports.shorthands = undefined;

//** package_price_name */
//ex: Adult=$57.85 || Child (4-12)=$43.5    || Senior (60+)=$32.75
//ex: 성인=$57.85   || 아동 (만 4-12세)=$43.5   || 시니어 (만 60세 이상)=$32.75

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE package_price_locale (
      id SERIAL PRIMARY KEY,
      package_price_name VARCHAR NOT NULL,
      package_detail_locale_id INT REFERENCES package_detail_locale(id) NOT NULL,
      min_age INT NOT NULL,
      max_age INT NOT NULL,
      min_pax INT NOT NULL,
      max_pax INT NOT NULL,
      is_with_adult_required BOOLEAN DEFAULT FALSE,
      price REAL NOT NULL,
      published BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX package_price_locale_package_detail_locale_id_idx ON package_price_locale(package_detail_locale_id);

    INSERT INTO package_price_locale (package_detail_locale_id, package_price_name, price, min_age, max_age, min_pax, max_pax, is_with_adult_required)
    VALUES (1, 'adult', 15.75, 18, 100, 5, 10, false),
           (2, 'kid', 7, 3, 11, 5, 10, true),
           (1, '성인', 15.75, 18, 100, 5, 10, false),
           (2, '아동', 7, 3, 11, 5, 10, true);
          
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE package_price_locale;
  `);
};
