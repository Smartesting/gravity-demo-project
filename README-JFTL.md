# JFTL Tutorial

## Configure Environment variables

Edit the file [gravity.env](./gravity.env) and add the test environment auth key and a build ID. For example:

```
# Gravity key for publication
REACT_APP_GRAVITY_AUTH_KEY=d04d2064-290e-41c7-bd51-790068544be2
# Build ID
REACT_APP_GRAVITY_BUILD_ID=abc-1
```

## Start Planka

```shell
docker compose -f docker-compose-test.yml up
```

Planka should be available at [http://localhost:3000](http://localhost:3000).
You can connect as `demo@demo.demo`, the password is, surprinsigly, `demo`.

## Running the tests

You wil need npm to run the tests

```shell
cd cypress
npm install
npm run cypress:open
```

## Updating the build ID

Stop docker compose then edit the file [gravity.env](./gravity.env). Start docker compose again:

```shell
docker compose -f docker-compose-test.yml up
```

Run the tests again, the tests should appear with a new build ID.
