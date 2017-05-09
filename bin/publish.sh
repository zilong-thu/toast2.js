#!/bin/bash

cp ./package.json ./dist
cp ./README.md    ./dist

cd ./dist && npm publish

cd ..

