# API_JWT
Creation of simple API using json web token authentication

Expiration token: 300 sec

| Route             | HTTP Verb | Description              |
|-------------------|---------|--------------------------|
| /api/notes        | GET     | Get all notes            |
| /api/notes/:id    | GET     | Get note by id           |
| /api/notes/       | POST    | Add new note             |
| /api/notes/:id    | PUT     | Update a note            |
| /api/notes/:id    | DELETE  | Delete a note            |
| /api/setup        | GET     | Creates a test user      |
| /api/authenticate | POST    | Get authentication token |
