# WritersCarousel - Docker Installation Guide
This repository is a web application built with NextJS as the frontend, PHP and Nginx as the backend, and MySQL as the database. This guide explains how to run the application using Docker.

## Screenshots
### Desktop
![image](https://user-images.githubusercontent.com/93376408/228211017-3afc17d9-4b6f-49da-872a-df0bd557ebb7.png)
### Mobile
![image](https://user-images.githubusercontent.com/93376408/228212084-b5a6bca1-ad68-450d-8dd9-f7d3428c9014.png)


## Prerequisites
Before proceeding with the installation, make sure you have the following installed on your machine:

- Docker
- Docker Compose

## Run the App
1. Clone the repository :
- ``git clone https://github.com/Boydem/WritersCarousel``
2. Open the repo directory in VSCode and load Docker's containers
- ``docker-compose up -d``
3. Open src/israel-hayom-challange Which is the directory including Next app and run it typing:
- ``npm i && npm run dev``
4. Navigate to
- ``localhost:3000``
5. To add db content open phpmyadmin through
- ``localhost:81``
- Login using these credentials:
- Server: mysql / Username: root / password: secret
![image](https://user-images.githubusercontent.com/93376408/228273083-4bc4abf6-a6c0-4e02-94b0-e71aeb55f817.png)

6. Go to ``noam_israelhayom_db``
![image](https://user-images.githubusercontent.com/93376408/228273476-49645805-52bb-482a-b493-596650f6f9bc.png)

7. Load Data:
- Go to Insert SQL
- ![image](https://user-images.githubusercontent.com/93376408/228276092-f8fa5145-6638-4b94-a900-9c24193d8aa4.png)
- Inside the repo folder there is dump.sql file that contains the tables and their data, paste its content and run this SQL command:
- ![image](https://user-images.githubusercontent.com/93376408/228274366-3f17a9ae-cc4c-497a-8e32-d6376bb43d6e.png)
- ![image](https://user-images.githubusercontent.com/93376408/228275417-a8613623-2feb-4461-8de3-ed1a09f02ace.png)


You should now see the data arrived to ``localhost:3000``
