-- SQL commands to populate the database with initial data for the Autolink application

-- Insert sample users
INSERT INTO Users (name, email, hashed_password) VALUES
('John Doe', 'john.doe@example.com', '$2b$10$EIXZ1Q1Z5G6Q8F1Q1Z5G6Oe1Q1Z5G6Oe1Q1Z5G6Oe1Q1Z5G6Oe1Q1'),
('Jane Smith', 'jane.smith@example.com', '$2b$10$EIXZ1Q1Z5G6Q8F1Q1Z5G6Oe1Q1Z5G6Oe1Q1Z5G6Oe1Q1Z5G6Oe1Q1');

-- Insert sample cars
INSERT INTO Cars (owner_user_id, make, model, year, vin) VALUES
(1, 'Toyota', 'Camry', 2020, '1HGBH41JXMN109186'),
(1, 'Honda', 'Civic', 2019, '2HGBH41JXMN109187'),
(2, 'Ford', 'Mustang', 2021, '3HGBH41JXMN109188');

-- Insert sample maintenance records
INSERT INTO MaintenanceRecords (car_id, date, odometer_reading, type_of_service, description, cost) VALUES
(1, '2023-01-15', 15000, 'Oil Change', 'Changed oil and filter', 50.00),
(1, '2023-03-10', 16000, 'Tire Rotation', 'Rotated tires', 30.00),
(2, '2023-02-20', 12000, 'Brake Inspection', 'Checked brake pads', 20.00);

-- Insert sample fuel-ups
INSERT INTO FuelUps (car_id, date, odometer, fuel_volume, price) VALUES
(1, '2023-01-20', 15050, 12.5, 40.00),
(1, '2023-02-25', 16020, 10.0, 35.00),
(2, '2023-03-05', 12050, 15.0, 50.00);