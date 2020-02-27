#!/bin/bash

export COMPOSER_CARD=admin@gowo

export COMPOSER_NAMESPACES=never

export COMPOSER_AUTHENTICATION=true

export COMPOSER_PROVIDERS='{
"github" : {
    "provider" : "github",
    "module" : "passport-github",
    "clientID" : "33f83d17dcedd953501c",
    "clientSecret" : "066f6b6418e8c2b8f7c70ac8d599b1baada773da",
    "authPath" : "/auth/github",
    "callbackURL" : "/auth/github/callback",
    "successRedirect":"/",
    "failureRedirect" : "/"
    }      
}'

composer-rest-server