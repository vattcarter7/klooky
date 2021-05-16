/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE package_price_locale (
      id SERIAL PRIMARY KEY,
      package_id INT REFERENCES package(id) NOT NULL,
      language_id INT REFERENCES language(id) NOT NULL,
      min_age INT NOT NULL,
      max_age INT NOT NULL,
      min_pax INT NOT NULL,
      max_pax INT NOT NULL,
      package_price_name VARCHAR NOT NULL,
      price REAL NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX package_price_locale_package_id_idx ON package_price_locale(package_id);

    CREATE INDEX package_price_locale_language_id_idx ON package_price_locale(language_id);

    INSERT INTO package_price_locale (package_id, language_id, package_price_name, price, min_age, max_age, min_pax, max_pax)
    VALUES (1, 1, 'adult', 15.75, 18, 100, 5, 10),
           (1, 1, 'kid', 7, 3, 11, 5, 10),
           (1, 2, '성인', 15.75, 18, 100, 5, 10),
           (1, 2, '아동', 7, 3, 11, 5, 10);
          
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE package_price_locale;
  `);
};
