# Hex to RGB API

A small JavaScript library that converts hex colors to RGB, an Express REST API that uses it, and a Mocha + Chai test suite.

## Setup

```
npm install
```

## Run the server

```
npm start
```

## Run the tests

```
npm test
```

## API

`GET /api/hex-to-rgb?hex=ff5733`

Success (200):

```
{ "hex": "ff5733", "rgb": { "r": 255, "g": 87, "b": 51 } }
```

Error (400):

```
{ "error": "Invalid hex color: zzzzzz" }
```

A `#` must be written as `%23` in the URL, for example `?hex=%23ff5733`. Three digit shorthand such as `f00` is also supported.

Example with cURL:

```
curl "http://localhost:3000/api/hex-to-rgb?hex=ff5733"
```

## Project structure

```
src/hexToRgb.js         library function
src/app.js              Express app and route
src/server.js           starts the server
test/hexToRgb.test.js   unit tests
test/app.test.js        integration tests
```
