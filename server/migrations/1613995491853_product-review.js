/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE product_review (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES product(id) NOT NULL,
      reviewer_id INT REFERENCES users(id) NOT NULL,
      host_id INT REFERENCES users(id) NOT NULL,
      rating SMALLINT NOT NULL,
      comment VARCHAR,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX product_review_product_id_idx ON product_review(product_id);
    CREATE INDEX product_review_reviewer_id_idx ON product_review(reviewer_id);
    CREATE INDEX product_review_host_id_idx ON product_review(host_id);

    INSERT INTO product_review (product_id, reviewer_id, host_id, rating, comment)
    VALUES (1, 1, 2, 5, 'nice tour. highly recommend'),
           (1, 2, 1, 4, '좋은 시간을 보냈습니다. 추천합니다');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product_review;
  `);
};
