# Food admin portal

Semester 4 database systems project: a React administration interface with an Express API and SQLite persistence for restaurant and menu records.

## Features

- List and add restaurants, including location, rating and administrator ID.
- List and add food items associated with a restaurant.
- Refresh the UI from the API after form submissions.
- Initialize the two SQLite tables on backend startup; SQL inserts use bound parameters.

## Run locally

Prerequisite: Node.js 20 or later with npm.

In one terminal:

```sh
cd backend
npm ci
npm start
```

In a second terminal:

```sh
cd frontend
npm ci
npm start
```

Open http://localhost:3000. The API runs on port 5001. A fresh `backend/database.db` is created locally; no existing database is published.

## API

| Method | Route | Behavior |
| --- | --- | --- |
| GET | `/api/restaurants` | List restaurant records |
| POST | `/api/restaurants` | Add a restaurant |
| GET | `/api/food` | List food item records |
| POST | `/api/food` | Add a food item |

## Current scope

This coursework project supports adding and viewing records. It has no authentication or update/delete routes, and input validation and SQLite foreign-key enforcement need further work. The frontend uses fixed localhost URLs and is intended to run locally.
