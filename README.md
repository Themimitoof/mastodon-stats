# Mastodon-Stats
Get easily the data from the about page of Mastodon instances.

This API is accessible without installing the server here: [https://mastodon-stats.themimitoof.fr](https://mastodon-stats.themimitoof.fr)

## Prerequisites
 * NodeJS


## Installation
Clone this repo and install all project dependencies:
```
npm install
```

Rename ```config.js.default``` to ```config.js``` and edit binding informations.

Finaly, start the server with ```npm start``` or with ```node index.js```.

If you prefer execute the server in background with automatic reload (of crash), I recommend using ```pm2``` or ```forever```.


## API
_The server response only with JSON format._

### [GET] /
 * Result: _Hello message_
 * Result example: ```{ code: 200, message: "Hello! Mastodon-stats API are operational :)" }```

### [GET] /stats?instance=*instance_url*
 * Result: _Return data from /about/more page of specified instance_
 * _?instance_: give the URL of the instance or the complete URL to the about page of the instance 
  * Example: ```https://masto.themimitoof.fr```
  * Example: ```https://masto.themimitoof.fr/about/more```
 * Result example: ```{"users":576,"messages":1141,"connected_instances":92}```

## Feedback, suggestions 
This repo is totally open to suggestions, merge requests and feedbacks. For that, please open issue.