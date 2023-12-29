import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, { id }) {
      return db.games.find((game) => game.id === id);
    },
    authors() {
      return db.authors;
    },
    author(_, { id }) {
      return db.authors.find((author) => author.id === id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, { id }) {
      return db.reviews.find((review) => review.id === id);
    },
  },
  Game: {
    reviews(game) {
      return db.reviews.filter((review) => review.game_id === game.id);
    },
  },
  Author: {
    reviews(author) {
      return db.reviews.filter((review) => review.author_id === author.id);
    },
  },
  Review: {
    game(review) {
      return db.games.find((game) => game.id === review.game_id);
    },
    author(review) {
      return db.authors.find((author) => author.id === review.author_id);
    },
  },
  Mutation: {
    deleteGame(_, { id }) {
      // const game = db.games.find((game) => game.id === id);
      db.games = db.games.filter((game) => game.id !== id);
      return db.games;
    },
    addGame(_, { game }) {
      let addedGame = {
        id: Math.floor(Math.random() * 10000).toString(),
        ...game,
      };
      db.games.push(addedGame);
      return addedGame;
    },
    updateGame(_, { id, edits }) {
        db.games = db.games.map((game) => {
            if (game.id === id) {
                return { ...game, ...edits };
            }
            return game;
        });
        return db.games.find((game) => game.id === id);
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
