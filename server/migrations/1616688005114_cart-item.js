/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE cart_item (
      id SERIAL PRIMARY KEY,
      product_locale_id INT REFERENCES product_locale(id) NOT NULL,
      package_detail_locale_id INT REFERENCES package_detail_locale(id) NOT NULL,
      user_id INT REFERENCES users(id) NOT NULL,
      quantity_price_model JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX cart_item_product_locale_id_idx ON cart_item(product_locale_id);
    CREATE INDEX cart_item_package_detail_locale_id_idx ON cart_item(package_detail_locale_id);
    CREATE INDEX cart_item_user_id_idx ON cart_item(user_id);

    INSERT INTO cart_item (product_locale_id, package_detail_locale_id, user_id, quantity_price_model)
    VALUES (1, 1, 1, '[{ "name": "adult", "price": 15, "pax": 3 }, { "name": "kid", "price": 10, "pax": 1 }]'),
           (1, 2, 2, '[{ "name": "성인", "price": 15, "pax": 3 }, { "name": "아동", "price": 10, "pax": 1 }]');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE cart_item;
  `);
};
