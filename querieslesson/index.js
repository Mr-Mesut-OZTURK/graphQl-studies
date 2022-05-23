const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')

const { books, authors } = require('./data')

const typeDefs = gql`

    type Book {
        id: String
        name: String
        description: String
        authors:[Author]
    
    }

    type Author {
        id: String
        name: String
        description: String
        books:[Book]
    }

    type Query {
        books: [Book],
        book(id: ID) :Book,
        authors: [Author],
        author(id: ID) :Author,
    }


`;



const resolvers = {

    Query : {
        books : () => books,
        book: (parent, args) => books.find(book => book.id === args.id),

        authors : () => authors,
        author: (parent, args) => authors.find(author => author.id === args.id),
    },

    Book: { authors: (parent, args) => authors.filter(author => parent.authors.includes(author.id)) },
    Author: { books: (parent, args) => books.filter(book => parent.books.includes(book.id)) }

}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({

        })
    ]
});


server.listen().then(() => console.log('Apollo server is started...'))