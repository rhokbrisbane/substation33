# substation33

https://substation33.herokuapp.com/

## Technologies

Frontend: Angular
Backend:  Node
Database: Firebase
Emailing: SendGrid
Hosting:  Heroku

## install stuff

```
npm install
```

```
bower install
```

## config

See `server/config.js`

PLUS, you'll need to setup the env vars:

    export FIREBASE_PRIVATE_KEY_ID=asdf
    export FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n**HERE**\n-----END
    # (before you start the server in your shell)

## start server

```
server: npm run start
```

## watch and build, or build files

watch and build
```
gulp build:watch
```

build
```
gulp build
```

## view app

http://localhost:8081
