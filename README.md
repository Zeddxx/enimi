<img src="/client/public/Banner.gif" alt="banner image gif" />
<div align="center">
  <img src="/client/public/logo.gif" alt="enimi logo gif version" />
</div>
<h1 align="center">
  Welcome to Enimi
</h1>
<p align="center">
  Enimi is an anime streaming platform created to watch anime without any ads and popups.
  <br />
  (created this application to sharpen my skill into mern stack 🥲)
</p>

<p align="center">
  <i>
 This project is in development as for now.
</i>
  <br />
  <br />
  <img src="https://img.shields.io/badge/React-Typescript-blue" alt="react badge" />
  <img src="https://img.shields.io/badge/Express-Typescript-purple" alt="react badge" />
  <img src="https://img.shields.io/badge/Node-Typescript-green" alt="BACKEND" />
  <img src="https://img.shields.io/badge/MongoDB-8A2BE2" alt="MOGODB" />
  <img src="https://img.shields.io/badge/React-Redux-386641" alt="redux" />
  <img src="https://img.shields.io/badge/React-ContextAPI-blue" alt="react badge" />
  <br/>
  <img src="https://img.shields.io/badge/React-Redux%20Toolkit%20Query-E63946" alt="rtk" />
</p>

## Why I Created Enimi?
I was much more comfortable with Next.js and wanted to create something using a trending stack, which was the MERN stack. Enimi was created on that stack to provide users with faster responses through its sleek UI. I learned a lot while creating Enimi and implemented production-ready features.

## Features

- [x] Authentication.
  - [x] login using email and password.
  - [x] Register or Create your account using email, username and password.
  - [x] Email verification functionality.
- [x] Bookmark Your Anime.
- [x] Responsive UI/UX.
  - [x] Mobile Responsive
  - [x] TV Responsive.
  - [x] Desktop Responsive
  - [x] IPad Responsive.
- [x] Your Continue watching Tracker
- [x] Animes
  - [x] Trending Anime
  - [x] Popular Anime
  - [x] Search Anime
  - [x] Recently Added Anime

## .env (inside server root directory)

```bash
 # your authentication main to use email verification.
AUTH_EMAIL= ***@outlook.com

# Authentication email password for nodemailer.
AUTH_PASSWORD=

# you can use the url for local machine
BACKEND_URL=https://api.amvstr.me/api/v2
BASE_BACKEND_URL=https://api.amvstr.me

# consumet url
CONSUMET_URL=

# use any random key here
JWT_SECRET=

# your mongo db url
MONGODB_URI=
```

## Installation

- Clone repository.
```bash
git clone https://github.com/Zeddxx/enimi.git
```
  
- Go into server directory and install its dependencies and run the server.
  
```bash
cd server && npm install && npm run dev
```

- Response from backend.

```bash
Listening at http://localhost:4000
```
  
- Go to client directory and do the same. (open another terminal)

```bash
cd client && npm install && npm run dev
```

- Response from client.

```bash
running at http://localhost:5173
```

  ## Deployment.
  deploy your instance at **render** as i found it way more simple for MERN stack.
