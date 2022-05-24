const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const { posts, users, comments } = require('./data')
const { nanoid } = require('nanoid');



const typeDefs = gql`
 #########################################
    type User {
        id:ID!
        username:String!
        description:String!
        
        posts:[Post]!
        comments:[Comment]!
    }
    input CreateUserInput {
        username:String!
        description:String!
    }
    input UpdateUserInput {
        username:String
        description:String
    }
    
    #########################################
    type Post {
        id:ID!
        title:String!
        description:String!
        user_id:ID!
        
        user:User
        comments:[Comment]!
    }
    input CreatePostInput {
        title:String, 
        description:String, 
        user_id:ID
    }
    input UpdatePostInput {
        title:String, 
        description:String, 
        user_id:ID
    }
    
    #########################################
    type Comment {
        id:ID!
        text:String!
        post_id:ID!
        user_id:ID!
        
        user:User
        post:Post
    }
    input CreateCommentInput {
        text:String, 
        user_id:ID, 
        post_id:ID
    }
    input UpdateCommentInput {
        text:String, 
        user_id:ID, 
        post_id:ID
    }
    type DeleteAllOutput {
        count: Int
    }
    

    type Query {
        users:[User!]!
        user(id: ID): User!

        posts:[Post!]!
        post(id: ID): Post!

        comments:[Comment!]!
        comment(id: ID): Comment!
    }

    type Mutation {
        # user
        createUser(data:CreateUserInput) : User!
        updateUser(id: ID, data:CreateUserInput) : User!
        deleteUser(id: ID): User!
        deleteAllUsers: DeleteAllOutput!

        # post
        createPost(data:CreatePostInput) : Post!
        updatePost(id:ID, data:CreatePostInput) : Post!
        deletePost(id: ID): Post!
        deleteAllPosts: DeleteAllOutput!

        #comment
        createComment(data:CreateCommentInput) : Comment!
        updateComment(id:ID, data:CreateCommentInput): Comment!
        deleteComment(id: ID): Comment!
        deleteAllComments: DeleteAllOutput!

    }
   
`;



const resolvers = {

    Query: {
        users: (parent, args) => users,
        user: (parent, args) => users.find(user => user.id === args.id),

        posts: (parent, args) => posts,
        post: (parent, args) => posts.find(post => post.id === args.id),

        comments: (parent, args) => comments,
        comment: (parent, args) => comments.find(comment => comment.id === args.id),
    },

    Mutation: {
        //  #########  user ###########################################
        createUser: (parent, { data }) => {
            let user = {
                id: nanoid(),
                ...data
            }
            users.push(user)
            return user
        },
        updateUser: (parent, { data, id }) => {
            const user_index = users.findIndex(user => user.id === id)
            if(user_index === -1) {
                throw new Error("User not found!")
            }
            users[user_index] = {
                ...users[user_index],
                ...data
            }
            return users[user_index]
        },
        deleteUser: (parent, { id }) => {
            const user_index = users.findIndex(user => user.id === id)
            if(user_index === -1) {
                throw new Error("User not found!")
            }
            const deleted_user = users[user_index]

            users.splice(user_index, 1)
            return deleted_user
        },
        deleteAllUsers: () => {
            const count = users.length
            users.splice(0,count)

            return { count}
        },



        //  #########  post ###########################################
        createPost: (parent, { data }) => {
            let post = {
                id: nanoid(),
                ...data
            }
            posts.push(post)

            return post
        },
        updatePost: (parent, { data, id }) => {
            const post_index = posts.findIndex(post => post.id === id)
            if(post_index === -1) {
                throw new Error("post not found!")
            }
            posts[post_index] = {
                ...posts[post_index],
                ...data
            }
            return posts[post_index]
        },
        deletePost: (parent, { id }) => {
            const post_index = posts.findIndex(post => post.id === id)
            if(post_index === -1) {
                throw new Error("User not found!")
            }
            const deleted_post = posts[post_index]

            posts.splice(post_index, 1)
            return deleted_post
        },
        deleteAllPosts: () => {
            const count = posts.length
            posts.splice(0,count)

            return { count}
        },


        //  #########  comment ##############################
        createComment: (parent, { data }) => {
            let comment = {
                id: nanoid(),
                ...data
            }
            comments.push(comment)

            return comment
        },
        updateComment: (parent, { data, id }) => {
            const comment_index = comments.findIndex(comment => comment.id === id)
            if(comment_index === -1) {
                throw new Error("comment not found!")
            }
            comments[comment_index] = {
                ...comments[comment_index],
                ...data
            }
            return comments[comment_index]
        },
        deleteComment: (parent, { id }) => {
            const comment_index = comments.findIndex(comment => comment.id === id)
            if(comment_index === -1) {
                throw new Error("User not found!")
            }
            const deleted_comment = comments[comment_index]

            comments.splice(comment_index, 1)
            return deleted_comment
        },
        deleteAllComments: () => {
            const count = comments.length
            comments.splice(0,count)

            return { count}
        },

    },


    User: {
        posts: (parent, args) => posts.filter(post => post.id === parent.id),
        comments: (parent, args) => comments.filter(comment => comment.id === parent.id),
    },
    Post: {
        user: (parent, args) => users.find(user => user.id === parent.user_id),
        comments: (parent, args) => comments.filter(comment => comment.id === parent.id),
    },
    Comment: {
        user: (parent, args) => users.find(user => user.id === parent.user_id),
        post: (parent, args) => posts.find(post => post.id === parent.post_id)
    },

}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({})
    ]
})

server.listen().then(({ url }) => console.log('Apollo server listening on port ', url))