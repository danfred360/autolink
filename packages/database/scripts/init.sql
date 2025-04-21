-- SQL commands to initialize the database schema for Autolink

-- Create Users table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Cars table
CREATE TABLE Cars (
    car_id SERIAL PRIMARY KEY,
    owner_user_id INT REFERENCES Users(UserID) ON DELETE CASCADE,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT CHECK (Year > 1885), -- The first car was invented in 1886
    vin VARCHAR(17) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create MaintenanceRecords table
CREATE TABLE MaintenanceRecords (
    record_id SERIAL PRIMARY KEY,
    car_id INT REFERENCES Cars(CarID) ON DELETE CASCADE,
    date DATE NOT NULL,
    odometer_reading INT NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    description TEXT,
    cost DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create FuelUps table
CREATE TABLE FuelUps (
    fuel_id SERIAL PRIMARY KEY,
    car_id INT REFERENCES Cars(CarID) ON DELETE CASCADE,
    date DATE NOT NULL,
    odometer INT NOT NULL,
    fuel_volume DECIMAL(10, 2) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Parts table
CREATE TABLE Parts (
    part_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    part_number VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create MaintenanceParts join table
CREATE TABLE MaintenanceParts (
    record_id INT REFERENCES MaintenanceRecords(RecordID) ON DELETE CASCADE,
    part_id INT REFERENCES Parts(PartID) ON DELETE CASCADE,
    quantity INT NOT NULL,
    cost DECIMAL(10, 2),
    PRIMARY KEY (RecordID, PartID)
);