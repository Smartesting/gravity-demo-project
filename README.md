# Gravity Demo project (based on Planka)

#### Elegant open source project tracking

![David (path)](https://img.shields.io/github/package-json/v/plankanban/planka) ![Docker Pulls](https://img.shields.io/docker/pulls/meltyshev/planka) ![GitHub](https://img.shields.io/github/license/plankanban/planka)

![](https://raw.githubusercontent.com/plankanban/planka/master/demo.gif)

[**Client demo**](https://plankanban.github.io/planka) (without server features).

## Gravity-specifics
- Project is deployed on https://gravity-planka.osc-fr1.scalingo.io/
- Usage (prod + test) data are sent in the Planka domain (https://app.gravity-testing.com/domains/289)
- `deploy` branch is for... deployment (keep `main`safe for rebase from original forked repository purpose)
- When pushing, Cypress tests are run and the app is automatically deployed if build is green

## Gravity Data Collector validation
- Set up the `REACT_APP_GRAVITY_AUTH_KEY` in the [env](./client/.env) file
- Modify the collector dependency [here](./client/package.json) to point to the local instance in development (like this: `"@smartesting/gravity-data-collector": "file:../your-path/gravity-data-collector"`)
- Start the development database with the following commmand: `docker compose -f docker-compose-dev.yml up`
- Build the collector
- Launch the following command: `npm i && npm run start:dev`

That's all! Follow the two last steps when there are collector modifications.

## Features

- Create projects, boards, lists, cards, labels and tasks
- Add card members, track time, set a due date, add attachments, write comments
- Markdown support in a card description and comment
- Filter by members and labels
- Customize project background
- Real-time updates
- User notifications
- Internationalization

## How to deploy Planka

There are 2 types of installation:

- [Without Docker](https://docs.planka.cloud/docs/installl-planka/Debian%20&%20Ubuntu) ([for Windows](https://docs.planka.cloud/docs/installl-planka/Windows))
- [Dockerized](https://docs.planka.cloud/docs/installl-planka/Docker%20Compose)

For configuration, please see the [configuration section](https://docs.planka.cloud/docs/category/configuration).

## Contact

- If you want to get a hosted version of Planka, you can contact us via email contact@planka.cloud
- For any security issues, please do not create a public issue on GitHub, instead please write to security@planka.cloud

We do NOT offer any public support via email, please use GitHub.

## Development

See the [development section](https://docs.planka.cloud/docs/Development).

## Tech stack

- React, Redux, Redux-Saga, Redux-ORM, Semantic UI React, react-beautiful-dnd
- Sails.js, Knex.js
- PostgreSQL

## License

Planka is [AGPL-3.0 licensed](https://github.com/plankanban/planka/blob/master/LICENSE).
