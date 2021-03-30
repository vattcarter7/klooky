/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE purchase (
      id SERIAL PRIMARY KEY,
      package_id INT REFERENCES package(id) NOT NULL,
      user_id INT REFERENCES users(id) NOT NULL,
      language_id INT REFERENCES language(id) NOT NULL,
      quantity_price_model JSONB NOT NULL,
      discount REAL DEFAULT 0,
      total REAL NOT NULL check (total > 0),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX purchase_package_id_idx ON purchase(package_id);
    CREATE INDEX purchase_user_id_idx ON purchase(user_id);
    CREATE INDEX purchase_language_id_idx ON purchase(language_id);

    INSERT INTO purchase (package_id, user_id, language_id, quantity_price_model, total)
                VALUES   (1, 1, 1, '[{ "name": "adult", "price": 15, "pax": 3 }, { "name": "kid", "price": 10, "pax": 1 } ]', 100),
                         (1, 2, 2, '[{ "name": "성인", "price": 15, "pax": 3 }, { "name": "아동", "price": 10, "pax": 1 } ]', 100);

  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE purchase;
  `);
};
