# qraphQL_course_W

npm install

to start server:

```nodemon index.js```

```
query ReviewQuery($id: ID!) {
  review(id: $id) {
    rating,
    game {
      title,
      platform
      reviews {
        rating
      }
    },
    author {
      name,
      verified
    }

  }
}

{
  "id": "1",
}

```

```
mutation DeleteMutation($id: ID!) {
  deleteGame(id: $id) {
    id,
    title,
    platform
  }
}


{
  "id": 2
}

```

```
mutation AddMutation($game: AddGameInput!) {
  addGame(game: $game) {
    id,
    title,
    platform
  }
}


{
  "game": {
    "title": "a new game",
    "platform": ["switch", "ps5"]
  }
}

```

```

mutation EditMutation($edits: EditGameInput!, $id: ID!) {
  updateGame(edits: $edits, id: $id) {
    title,
    platform
  }
}


{
  "edits": {
    "title": "dark souls",
  },
  "id": "2"
}

```

```

```
