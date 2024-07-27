# MeiMei

## Current Situation Analysis
- Carrying 10-20 cards is inconvenient.
- Minimum printing of 200 cards increases costs.
- NFC-enabled cards reduce the number needed, allow easy updates, and enhance security.

## How to Use NFC Business Cards
- **Receive and Register Your Card:** Get your NFC card and register it on the app.
- **Share Information:** Others can read your info by tapping your card.
- **Manage Information:** Interactions are saved in the app, allowing you to:
  - **Card List:** View all your cards.
  - **Card Groups:** Organize cards into groups.
  - **Starred Cards:** Mark important cards for easy access.

## Technologies Used
- Laravel (PHP)
- React (JavaScript)
- MySQL

## Server Setup
1. Copy `env.example` to `.env` and update database info.
2. Disable MySQL `autocommit`.
3. In the `server` directory:
   - Run `composer install`
   - Run `php artisan key:generate`
   - Run `php artisan migrate` (Create `meimei` database first)
   - Run `php artisan storage:link`
   - Run `php artisan serve --port=8000 --host=0.0.0.0`

## Client Setup
1. In the `client` directory:
   - Run `npm i`
   - Run `npm start`

## Accounts
**Example User 1**
- Email: `nguyenthithutrang0122@gmail.com`
- Password: `chan`

**Example User 2**
- Email: `mei@gmail.com`
- Password: `meimei`

**Admin**
- Email: `mei@gmail.com`
- Password: `meimei`

## Running on AWS
The application is deployed on AWS. Try it out at:  
[http://3.80.66.243:3000/MyHomePage/](http://3.80.66.243:3000/MyHomePage/)

## User Interface
The application features the following UI:

**User Side**  
![User Side](https://github.com/ThuTrang912/MeiMei/assets/129019073/9ac9863e-6959-4e6b-8cb1-73375855f521)

**Admin Side**  
![Admin Side](https://github.com/user-attachments/assets/a73ec86d-17cd-41ec-9c04-21d81617ea7b)
