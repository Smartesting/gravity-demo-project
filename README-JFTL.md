# JFTL Tutorial

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
