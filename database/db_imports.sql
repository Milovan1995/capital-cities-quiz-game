INSERT INTO region (name) VALUES
('Europe'),
('Africa'),
('Asia'),
('Oceania'),
('North America and South America');

COPY capitals (id,country, capital, region_id) FROM 'capitals.csv' DELIMITER ',' CSV HEADER;
