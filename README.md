# MeiMei

## Server

1. Copy the `env.example` file to `.env` and update the database authentication information.

2. Disable the MySQL `autocommit` (auto-commit) mode.

3. In the `server` directory:
   - Run `composer install`
   - Run `php artisan key:generate`
   - Run `php artisan migrate` (Create the `meimei` database before running this command: `create database meimei;`)
   - Run `php artisan storage:link` (Create a link to the images directory)
   - Run `php artisan serve --port=8000 --host=0.0.0.0` (Open the port for access from your phone)

## Client

1. In the `client` directory:
   - Run `npm i`
   - Run `npm start`

## Accounts

**Example User 1**
- Email: `nguyenthithutrang0122@gmail.com`
- Password: `chan`

**Example User 1**
- Email: `mei@gmail.com`
- Password: `meimei`

**Admin**
- Email: `mei@gmail.com`
- Password: `meimei`

## Running on AWS

I have also deployed the application on AWS, so you can try it out at the following URL:

http://3.80.66.243:3000/MyHomePage/

## User Interface

The application will have the following user interface:

![Ảnh chụp màn hình 2024-06-28 140631](https://github.com/ThuTrang912/MeiMei/assets/129019073/bdf5b8f1-1441-4acd-b140-d50df0762de9)

**User side**

![Ảnh chụp màn hình 2024-06-28 140619](https://github.com/ThuTrang912/MeiMei/assets/129019073/9ac9863e-6959-4e6b-8cb1-73375855f521)

**Admin side**





