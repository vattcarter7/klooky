/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE package_detail_locale (
      id SERIAL PRIMARY KEY,
      package_id INT REFERENCES package(id) NOT NULL,
      language_id INT REFERENCES language(id) NOT NULL,
      package_name VARCHAR NOT NULL,
      package_includes JSONB NOT NULL,
      package_excludes JSONB NOT NULL,
      package_itinerary JSONB NOT NULL,
      package_pickup_info JSONB,
      package_additional_info JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    ALTER TABLE package_detail_locale ADD CONSTRAINT package_detail_locale_unique UNIQUE (package_id, language_id);

    CREATE INDEX package_detail_locale_package_id_idx ON package_detail_locale(package_id);
    CREATE INDEX package_detail_locale_language_id_idx ON package_detail_locale(language_id);

    INSERT INTO package_detail_locale (package_id, language_id, package_name, package_includes, package_excludes, package_itinerary, package_pickup_info, package_additional_info)
    VALUES (1, 1, 'private tour', '["water", "car"]', '["lunch", "personal expense"]', '["8:00 start tour", "5:00 come back hotel"]', '["pickup at 7:45"]', '["37$ for ticket"]'),
           (1, 2, '개인 앙코르 투어', '["물", "차"]', '["점심", "개인 경비"]', '["8:00 투어 시작", "5:00 호텔로 들어온다"]', '["7:45분에 픽업"]', '["입장료 37$"]');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE package_detail_locale;
  `);
};
