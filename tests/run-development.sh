#!/bin/bash

if [ "$1" = "--help" ]
then
  echo "Starts up a docker container for tests using the local code for lpdc-management".
  echo "This only starts the docker container in development mode. No tests are run".
  echo "You can use --clear-test-data to clear the test data folder before running".
  exit
fi

if [ "$1" = "--clear-test-data" ]
then
  echo "Clearing test data".
  rm -rf data-tests
  rm -rf test-results
fi

npm install
cd ipdc-stub || exit
npm install
cd ..

cd ../../lpdc-management-service || exit
npm install
cd ../app-lpdc-digitaal-loket/tests || exit

docker compose -f ./docker-compose.tests.yml -f ./docker-compose.tests.development.yml -f ./docker-compose.tests.development.override.yml -p app-lpdc-digitaal-loket-tests down --remove-orphans
docker compose -f ./docker-compose.tests.yml -f ./docker-compose.tests.development.yml -f ./docker-compose.tests.development.override.yml -p app-lpdc-digitaal-loket-tests pull
docker compose -f ./docker-compose.tests.yml -f ./docker-compose.tests.development.yml -f ./docker-compose.tests.development.override.yml -p app-lpdc-digitaal-loket-tests up -d --build
