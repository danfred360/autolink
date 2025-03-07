# Autolink Database Setup

This project sets up a PostgreSQL database for the Autolink application using Docker. Below are the instructions and details for running the database.

## Prerequisites

- Docker installed on your machine.
- Docker Compose installed.

## Project Structure

The project consists of the following directories and files:

- **docker/**: Contains the Docker configuration files.
  - **Dockerfile**: Instructions to build the Docker image for PostgreSQL.
  - **docker-compose.yml**: Defines the services, networks, and volumes for the Docker containers.
  
- **scripts/**: Contains SQL scripts for database initialization and seeding.
  - **init.sql**: SQL commands to create the database schema.
  - **seed.sql**: SQL commands to populate the database with initial data.

- **.env**: Environment variables for database configuration.

- **README.md**: Documentation for the project.

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd autolink-database
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory and define the following variables:
   ```
   POSTGRES_USER=your_username
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=your_database_name
   ```

3. **Build and run the Docker containers**:
   Use Docker Compose to build and start the PostgreSQL service:
   ```
   docker-compose up -d
   ```

4. **Initialize the database**:
   After the containers are running, you can initialize the database schema by executing the `init.sql` script. You can do this by connecting to the PostgreSQL container and running the script:
   ```
   docker exec -i <container_name> psql -U your_username -d your_database_name -f /path/to/init.sql
   ```

5. **Seed the database**:
   To populate the database with initial data, run the `seed.sql` script in a similar manner:
   ```
   docker exec -i <container_name> psql -U your_username -d your_database_name -f /path/to/seed.sql
   ```

## Usage

Once the database is set up, you can connect to it using your preferred PostgreSQL client with the credentials defined in the `.env` file.

## Notes

- Ensure that Docker is running before executing the commands.
- You can stop the containers using:
  ```
  docker-compose down
  ```

This README provides a basic overview of setting up the PostgreSQL database for the Autolink application. For further details on the database schema and usage, refer to the SQL scripts in the `scripts/` directory.