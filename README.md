# webdcentral

## CREAR BASE DE DATOS MYSQL LOCAL (obligatorio)

CREATE DATABASE webdcentral;

## ACTIVACION DE LARAVEL (BACKEND)

composer install

php artisan migrate --seed

php artisan passport:install

php artisan passport:client --personal

php artisan serve

PUERTO POR DEFAULT http://localhost:8000/

## ACTIVACION DE ANGULAR (FRONTEND)

npm install 

ng serve | npm start

PUERTO POR DEFAULT http://localhost:4200/

## ACTIVACION DE ANGULAR (FRONTEND DEL BACKEND)
npm install 

ng server --port 5200

PUERTO POR DEFAULT http://localhost:5200/

