-- Populate tables with starting information, or you can also use the 
-- .csv files to populate some of the tables with imports

-- region

INSERT INTO region (name) VALUES
('Europe'),
('Africa'),
('Asia'),
('Oceania'),
('North America and South America');

-- duration

INSERT INTO duration (value) VALUES
('30'),
('60'),
('90'),
('120'),
('300');

-- capitals

INSERT INTO capitals (id, country, capital, region_id) VALUES
	('55', 'Croatia', 'Zagreb', '1'),
	('58', 'Czech Republic', 'Prague', '1'),
	('59', 'Denmark', 'Copenhagen', '1'),
	('69', 'Estonia', 'Tallinn', '1'),
	('72', 'Faroe Islands', 'Torshavn', '1'),
	('74', 'Finland', 'Helsinki', '1'),
	('75', 'France', 'Paris', '1'),
	('81', 'Georgia', 'Tbilisi', '1'),
	('82', 'Germany', 'Berlin', '1'),
	('84', 'Gibraltar', 'Gibraltar', '1'),
	('85', 'Greece', 'Athens', '1'),
	('91', 'Guernsey and Alderney', 'St Peter Port', '1'),
	('99', 'Hungary', 'Budapest', '1'),
	('100', 'Iceland', 'Reykjavik', '1'),
	('105', 'Ireland', 'Dublin', '1'),
	('107', 'Italy', 'Rome', '1'),
	('110', 'Jersey', 'Saint Helier', '1'),
	('120', 'Latvia', 'Riga', '1'),
	('125', 'Liechtenstein', 'Vaduz', '1'),
	('126', 'Lithuania', 'Vilnius', '1'),
	('127', 'Luxembourg', 'Luxembourg', '1'),
	('129', 'North Macedonia', 'Skopje', '1'),
	('135', 'Malta', 'Valletta', '1'),
	('136', 'Man (Isle of)', '"Douglas, Isle of Man"', '1'),
	('144', 'Moldova', 'Chisinau', '1'),
	('145', 'Monaco', 'Monaco', '1'),
	('147', 'Montenegro', 'Podgorica', '1'),
	('156', 'Netherlands', 'Amsterdam', '1'),
	('86', 'Greenland', 'Nuuk', '5'),
	('87', 'Grenada', 'St. George\'s', '5'),
	('88', 'Guadeloupe', 'Basse-Terre', '5'),
	('90', 'Guatemala', 'Guatemala City', '5'),
	('94', 'Guyana', 'Georgetown', '5'),
	('95', 'Haiti', 'Port-au-Prince', '5'),
	('97', 'Honduras', 'Tegucigalpa', '5'),
	('108', 'Jamaica', 'Kingston', '5'),
	('138', 'Martinique', 'Fort-de-France', '5'),
	('142', 'Mexico', 'Ciudad de México', '5'),
	('148', 'Montserrat', 'Plymouth', '5'),
	('155', 'Bonaire, Sint Eustatius and Saba', 'Kralendijk', '5'),
	('189', 'Saint-Barthelemy', 'Gustavia', '5'),
	('190', 'Saint-Martin (French part)', 'Marigot', '5'),
	('205', 'South Georgia', 'Grytviken', '5'),
	('210', 'Suriname', 'Paramaribo', '5'),
	('223', 'Trinidad And Tobago', 'Port of Spain', '5'),
	('227', 'Turks And Caicos Islands', 'Cockburn Town', '5'),
	('233', 'United States', 'Washington', '5'),
	('235', 'Uruguay', 'Montevideo', '5'),
	('239', 'Venezuela', 'Caracas', '5'),
	('241', 'Virgin Islands (British)', 'Road Town', '5'),
	('242', 'Virgin Islands (US)', 'Charlotte Amalie', '5'),
	('249', 'Curaçao', 'Willemstad', '5'),
	('250', 'Sint Maarten (Dutch part)', 'Philipsburg', '5'),
	('3', 'Albania', 'Tirana', '1'),
	('6', 'Andorra', 'Andorra la Vella', '1'),
	('12', 'Armenia', 'Yerevan', '1'),
	('15', 'Austria', 'Vienna', '1'),
	('16', 'Azerbaijan', 'Baku', '1'),
	('21', 'Belarus', 'Minsk', '1'),
	('22', 'Belgium', 'Brussels', '1'),
	('28', 'Bosnia and Herzegovina', 'Sarajevo', '1'),
	('34', 'Bulgaria', 'Sofia', '1'),
	('4', 'Algeria', 'Algiers', '2'),
	('7', 'Angola', 'Luanda', '2'),
	('24', 'Benin', 'Porto-Novo', '2'),
	('29', 'Botswana', 'Gaborone', '2'),
	('35', 'Burkina Faso', 'Ouagadougou', '2'),
	('130', 'Madagascar', 'Antananarivo', '2'),
	('131', 'Malawi', 'Lilongwe', '2'),
	('134', 'Mali', 'Bamako', '2'),
	('139', 'Mauritania', 'Nouakchott', '2'),
	('140', 'Mauritius', 'Port Louis', '2'),
	('141', 'Mayotte', 'Mamoudzou', '2'),
	('149', 'Morocco', 'Rabat', '2'),
	('150', 'Mozambique', 'Maputo', '2'),
	('152', 'Namibia', 'Windhoek', '2'),
	('1', 'Afghanistan', 'Kabul', '3'),
	('18', 'Bahrain', 'Manama', '3'),
	('19', 'Bangladesh', 'Dhaka', '3'),
	('26', 'Bhutan', 'Thimphu', '3'),
	('32', 'British Indian Ocean Territory', 'Diego Garcia', '3'),
	('33', 'Brunei', 'Bandar Seri Begawan', '3'),
	('5', 'American Samoa', 'Pago Pago', '4'),
	('14', 'Australia', 'Canberra', '4'),
	('8', 'Anguilla', 'The Valley', '5'),
	('10', 'Antigua And Barbuda', 'St. John\'s', '5'),
	('11', 'Argentina', 'Buenos Aires', '5'),
	('13', 'Aruba', 'Oranjestad', '5'),
	('17', 'The Bahamas', 'Nassau', '5'),
	('20', 'Barbados', 'Bridgetown', '5'),
	('23', 'Belize', 'Belmopan', '5'),
	('25', 'Bermuda', 'Hamilton', '5'),
	('27', 'Bolivia', 'Sucre', '5'),
	('31', 'Brazil', 'Brasilia', '5'),
	('2', 'Aland Islands', 'Mariehamn', '1'),
	('36', 'Burundi', 'Bujumbura', '2'),
	('38', 'Cameroon', 'Yaounde', '2'),
	('40', 'Cape Verde', 'Praia', '2'),
	('42', 'Central African Republic', 'Bangui', '2'),
	('43', 'Chad', 'N\'Djamena', '2'),
	('49', 'Comoros', 'Moroni', '2'),
	('50', 'Congo', 'Brazzaville', '2'),
	('51', 'Democratic Republic of the Congo', 'Kinshasa', '2'),
	('54', 'Cote D\'Ivoire (Ivory Coast)', 'Yamoussoukro', '2'),
	('60', 'Djibouti', 'Djibouti', '2'),
	('65', 'Egypt', 'Cairo', '2'),
	('67', 'Equatorial Guinea', 'Malabo', '2'),
	('68', 'Eritrea', 'Asmara', '2'),
	('70', 'Ethiopia', 'Addis Ababa', '2'),
	('78', 'French Southern Territories', 'Port-aux-Francais', '2'),
	('79', 'Gabon', 'Libreville', '2'),
	('80', 'Gambia The', 'Banjul', '2'),
	('83', 'Ghana', 'Accra', '2'),
	('92', 'Guinea', 'Conakry', '2'),
	('93', 'Guinea-Bissau', 'Bissau', '2'),
	('113', 'Kenya', 'Nairobi', '2'),
	('122', 'Lesotho', 'Maseru', '2'),
	('123', 'Liberia', 'Monrovia', '2'),
	('124', 'Libya', 'Tripolis', '2'),
	('37', 'Cambodia', 'Phnom Penh', '3'),
	('45', 'China', 'Beijing', '3'),
	('57', 'Cyprus', 'Nicosia', '3'),
	('63', 'East Timor', 'Dili', '3'),
	('98', 'Hong Kong S.A.R.', 'Hong Kong', '3'),
	('101', 'India', 'New Delhi', '3'),
	('102', 'Indonesia', 'Jakarta', '3'),
	('103', 'Iran', 'Tehran', '3'),
	('104', 'Iraq', 'Baghdad', '3'),
	('106', 'Israel', 'Jerusalem', '3'),
	('109', 'Japan', 'Tokyo', '3'),
	('111', 'Jordan', 'Amman', '3'),
	('112', 'Kazakhstan', 'Astana', '3'),
	('115', 'North Korea', 'Pyongyang', '3'),
	('116', 'South Korea', 'Seoul', '3'),
	('117', 'Kuwait', 'Kuwait City', '3'),
	('118', 'Kyrgyzstan', 'Bishkek', '3'),
	('119', 'Laos', 'Vientiane', '3'),
	('121', 'Lebanon', 'Beirut', '3'),
	('128', 'Macau S.A.R.', 'Macao', '3'),
	('132', 'Malaysia', 'Kuala Lumpur', '3'),
	('133', 'Maldives', 'Male', '3'),
	('146', 'Mongolia', 'Ulan Bator', '3'),
	('151', 'Myanmar', 'Nay Pyi Taw', '3'),
	('154', 'Nepal', 'Kathmandu', '3'),
	('46', 'Christmas Island', 'Flying Fish Cove', '4'),
	('47', 'Cocos (Keeling) Islands', 'West Island', '4'),
	('52', 'Cook Islands', 'Avarua', '4'),
	('73', 'Fiji Islands', 'Suva', '4'),
	('77', 'French Polynesia', 'Papeete', '4'),
	('89', 'Guam', 'Hagatna', '4'),
	('114', 'Kiribati', 'Tarawa', '4'),
	('137', 'Marshall Islands', 'Majuro', '4'),
	('143', 'Micronesia', 'Palikir', '4'),
	('153', 'Nauru', 'Yaren', '4'),
	('157', 'New Caledonia', 'Noumea', '4'),
	('39', 'Canada', 'Ottawa', '5'),
	('41', 'Cayman Islands', 'George Town', '5'),
	('44', 'Chile', 'Santiago', '5'),
	('48', 'Colombia', 'Bogotá', '5'),
	('53', 'Costa Rica', 'San Jose', '5'),
	('56', 'Cuba', 'Havana', '5'),
	('61', 'Dominica', 'Roseau', '5'),
	('62', 'Dominican Republic', 'Santo Domingo', '5'),
	('64', 'Ecuador', 'Quito', '5'),
	('76', 'French Guiana', 'Cayenne', '5'),
	('165', 'Norway', 'Oslo', '1'),
	('176', 'Poland', 'Warsaw', '1'),
	('177', 'Portugal', 'Lisbon', '1'),
	('181', 'Romania', 'Bucharest', '1'),
	('182', 'Russia', 'Moscow', '1'),
	('192', 'San Marino', 'San Marino', '1'),
	('196', 'Serbia', 'Belgrade', '1'),
	('200', 'Slovakia', 'Bratislava', '1'),
	('201', 'Slovenia', 'Ljubljana', '1'),
	('207', 'Spain', 'Madrid', '1'),
	('211', 'Svalbard And Jan Mayen Islands', 'Longyearbyen', '1'),
	('213', 'Sweden', 'Stockholm', '1'),
	('214', 'Switzerland', 'Bern', '1'),
	('230', 'Ukraine', 'Kyiv', '1'),
	('232', 'United Kingdom', 'London', '1'),
	('238', 'Vatican City State (Holy See)', 'Vatican City', '1'),
	('248', 'Kosovo', 'Pristina', '1'),
	('160', 'Niger', 'Niamey', '2'),
	('161', 'Nigeria', 'Abuja', '2'),
	('180', 'Reunion', 'Saint-Denis', '2'),
	('183', 'Rwanda', 'Kigali', '2'),
	('184', 'Saint Helena', 'Jamestown', '2'),
	('193', 'Sao Tome and Principe', 'Sao Tome', '2'),
	('195', 'Senegal', 'Dakar', '2'),
	('197', 'Seychelles', 'Victoria', '2'),
	('198', 'Sierra Leone', 'Freetown', '2'),
	('203', 'Somalia', 'Mogadishu', '2'),
	('204', 'South Africa', 'Pretoria', '2'),
	('206', 'South Sudan', 'Juba', '2'),
	('209', 'Sudan', 'Khartoum', '2'),
	('212', 'Swaziland', 'Mbabane', '2'),
	('218', 'Tanzania', 'Dodoma', '2'),
	('220', 'Togo', 'Lome', '2'),
	('224', 'Tunisia', 'Tunis', '2'),
	('229', 'Uganda', 'Kampala', '2'),
	('244', 'Western Sahara', 'El-Aaiun', '2'),
	('246', 'Zambia', 'Lusaka', '2'),
	('247', 'Zimbabwe', 'Harare', '2'),
	('166', 'Oman', 'Muscat', '3'),
	('167', 'Pakistan', 'Islamabad', '3'),
	('169', 'Palestinian Territory Occupied', 'East Jerusalem', '3'),
	('174', 'Philippines', 'Manila', '3'),
	('179', 'Qatar', 'Doha', '3'),
	('194', 'Saudi Arabia', 'Riyadh', '3'),
	('199', 'Singapore', 'Singapur', '3'),
	('208', 'Sri Lanka', 'Colombo', '3'),
	('215', 'Syria', 'Damascus', '3'),
	('216', 'Taiwan', 'Taipei', '3'),
	('217', 'Tajikistan', 'Dushanbe', '3'),
	('219', 'Thailand', 'Bangkok', '3'),
	('225', 'Turkey', 'Ankara', '3'),
	('226', 'Turkmenistan', 'Ashgabat', '3'),
	('231', 'United Arab Emirates', 'Abu Dhabi', '3'),
	('236', 'Uzbekistan', 'Tashkent', '3'),
	('240', 'Vietnam', 'Hanoi', '3'),
	('245', 'Yemen', 'Sanaa', '3'),
	('158', 'New Zealand', 'Wellington', '4'),
	('162', 'Niue', 'Alofi', '4'),
	('163', 'Norfolk Island', 'Kingston', '4'),
	('164', 'Northern Mariana Islands', 'Saipan', '4'),
	('168', 'Palau', 'Melekeok', '4'),
	('171', 'Papua new Guinea', 'Port Moresby', '4'),
	('175', 'Pitcairn Island', 'Adamstown', '4'),
	('191', 'Samoa', 'Apia', '4'),
	('202', 'Solomon Islands', 'Honiara', '4'),
	('221', 'Tokelau', 'Nukunonu', '4'),
	('222', 'Tonga', 'Nuku\'alofa', '4'),
	('228', 'Tuvalu', 'Funafuti', '4'),
	('237', 'Vanuatu', 'Port Vila', '4'),
	('243', 'Wallis And Futuna Islands', 'Mata Utu', '4'),
	('66', 'El Salvador', 'San Salvador', '5'),
	('71', 'Falkland Islands', 'Stanley', '5'),
	('159', 'Nicaragua', 'Managua', '5'),
	('170', 'Panama', 'Panama City', '5'),
	('172', 'Paraguay', 'Asuncion', '5'),
	('173', 'Peru', 'Lima', '5'),
	('178', 'Puerto Rico', 'San Juan', '5'),
	('185', 'Saint Kitts And Nevis', 'Basseterre', '5'),
	('186', 'Saint Lucia', 'Castries', '5'),
	('187', 'Saint Pierre and Miquelon', 'Saint-Pierre', '5'),
	('188', 'Saint Vincent And The Grenadines', 'Kingstown', '5');


-- achievements

 INSERT INTO achievements (id, achievement_name, achievement_description) VALUES
	('1', 'Quick Thinker', 'Correctly answer 10 questions in under 5 seconds each.'),
	('2', 'Champion', 'Achieve a high score in any category.'),
	('3', 'Mighty Memory', 'Get a perfect score of at least 15 points without using any lifelines.'),
	('4', 'Flawless Finisher', 'Gain 10 points and answer all questions correctly.'),
	('5', 'Quiz Show Expert', 'Successfully use all lifelines in a round.'),
	('6', 'The Perfectionist', 'Answer 20 questions correctly in one game.'),
	('7', 'World Dominator', 'Correctly identify the capital cities of 50 countries within a single game.'),
	('8', 'World Traveler', 'Travel through the regions by identifying the capital cities of countries within each region.'),
	('9', 'Quiz Novice', 'Successfully complete your first quiz game.'),
	('10', 'Master of Europe', 'Answer questions about Europe with 100% accuracy - while achieving at least 5 points.'),
	('11', 'Master of Asia', 'Answer questions about Asia with 100% accuracy - while achieving at least 5 points.'),
	('12', 'Master of Africa', 'Answer questions about Africa with 100% accuracy - while achieving at least 5 points.'),
	('13', 'Master of Oceania', 'Answer questions about Oceania with 100% accuracy - while achieving at least 5 points.'),
	('14', 'Master of The Americas', 'Answer questions about North America and South America with 100% accuracy - while achieving at least 5 points.'),
	('15', 'Master of Geography', 'Answer questions about various regions with 100% accuracy - while achieving at least 5 points for each region.');