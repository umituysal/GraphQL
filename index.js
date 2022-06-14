const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

const { users, participants, locations, events } = require('./data');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]!
  }

  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
    user: User
    location: Location
    participants: [Participant!]!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type Participant {
    id: ID!
    user_id: Int!
    event_id: Int!
  }

  type Query {
    #User
    users: [User!]!
    user(id: ID!): User!
    #Event
    events: [Event!]!
    event(id: ID!): Event!
    #Location
    locations: [Location!]!
    location(id: ID!): Location!
    #Participant
    participants: [Participant!]!
    participant(id: ID!): Participant!
  }
`;

const resolvers = {
  Query: {
    events: () => events,
    event: (parent, args) => events.find(event => event.id === args.id),

    users: () => users,
    user: (parent, args) => users.find(user => user.id === args.id),

    locations: () => locations,
    location: (parent, args) =>
      locations.find(location => location.id === args.id),

    participants: () => participants,
    participant: (parent, args) =>
      participants.find(participant => participant.id === args.id),
  },
  Event: {
    user: (parent, arg) => users.find(user => user.id === parent.user_id),
    location: (parent, arg) =>
      locations.find(location => location.id === parent.location_id),
    participants: (parent, args) =>
      participants.filter(participant => participant.event_id === parent.id),
  },
  User: {
    events: parent => events.filter(event => event.user_id === parent.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
