# Telegram API

<!--- These are examples. See https://shields.io for others or to customize this set of shields. You might want to include dependencies, project status and licence info here --->
Ini adalah API untuk Tikitz dimana seseorang bisa melakukan pemesanan tiket secara online dan memilih sendiri bangku yang tersedia.

## Built with

* [NodeJs](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/)
* [Socket.io](https://socket.io/)

## Requirment
* [NodeJs](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/) for testing
* [Socket.io](https://socket.io/)
* [Postman](https://www.postman.com/)
* Database

### Regi
## Instalation
1. Clone the repo

```
git clone https://github.com/prasetioad/Telegram-Clone-BackEnd.git

```
2. Install NPM Packages 
```
npm install
```
## Add .env file at root folder project, and add following
```
# -------------------------------
#           CONFIG DB
# -------------------------------
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=telegram
DB_DIALECT=mysql

# --------------------------------
#           CONFIG GENERAL
# --------------------------------
PORT=8080
HOST=http://localhost:8080
SECRET_KEY=Telegram2021
STATIC_FOLDER=/avatar

#----------------------------------
#           CONFIG MAILER
#----------------------------------

HOSTING = http://localhost:3000/
EMAIL = lekersedunia@gmail.com
PASSWORD = Madang123@
```
## Run the app
``` 
npm run dev 
```
## Rest API
you can open postman collection [here](https://documenter.getpostman.com/view/14778352/TzRa8QaK)
or
[Run in Postman](https://www.getpostman.com/collections/0cbf5994803f98d31851)

### Front End
* https://github.com/prasetioad/Telegram-Clone-FrontEnd

## Live Demo
* https://stupefied-brown-bd269c.netlify.app/

## Author
* [@prasetioad](https://github.com/prasetioad)
