const graphql = require('graphql');
const User = require("./../Models/User");
const { GraphQLObjectType, GraphQLString, 
       GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and descibes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

var fakeBookDatabase = [
    { name:"Alex", age:18 , id:1},
    { name: "Luis", age: 21, id: 2},
    { name: "Jon", age: 22, id: 3 }
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        age: { type: GraphQLInt }
    })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book 
//or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getUserById: {
            type: UserType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user
                return User.findById(args.id)
            }
        }
    }
});
 
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: {type: new graphql.GraphQLNonNull(GraphQLString)},
                age: {type: new graphql.GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let newUser = new User({
                    name: args.name,
                    age: args.age
                })
                return newUser.save();
            }
        }
    }
})

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});