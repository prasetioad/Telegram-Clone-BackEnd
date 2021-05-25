<p align="center">
  <a href="" rel="noopener">
 <img height=auto src="https://user-images.githubusercontent.com/66661143/119433677-ed328600-bd40-11eb-9454-fcfe41648872.png" alt="logo"></a>
</p>
<div align="center">
  
[![made-with-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3e5e5f0e-297c-4bbe-85d7-12793c76f338/deploy-status)](https://stupefied-brown-bd269c.netlify.app/login)   
</div>

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
