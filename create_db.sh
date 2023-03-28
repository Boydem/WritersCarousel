#!/bin/bash
set -e

# Wait for MySQL to start
until mysqladmin ping -h mysql --silent; do
    echo 'Waiting for MySQL to start...'
    sleep 1
done

#!/bin/bash
mysql -u root -psecret -e "CREATE DATABASE IF NOT EXISTS noam_israelhayom_db"