FROM mysql:8

# Copy the SQL files to initialize the database
COPY ./mysql-initdb.d/ /docker-entrypoint-initdb.d/