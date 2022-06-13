const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// EXAMPLE REQUESTS

// GET USER
// {
//   user(id: "1"){
//     id,
//     firstName,
//     lastName,
//   }
// }


// GET USERS
// {
//   users{
//     id,
//     firstName,
//     lastName,
//   }
// }


// ADD USER
// mutation{
//   addUser(
//     firstName: "Joseph"
//     lastName: "Dandy"
//     email: "josephd@email.com"
// ) {
//     id
//   }
// }


// User Type
const UserType = new GraphQLObjectType({
  name:'User',
  fields:() => ({
      id: {type:GraphQLString},
      firstName: {type: GraphQLString},
      lastName: {type: GraphQLString},
      phone: {type: GraphQLString},
      email: {type: GraphQLString},
      permission: {type: GraphQLString},
      profilePic: {type: GraphQLString},
      active: {type: GraphQLString},
  })
});

const RootQuery= new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
      user:{
          type:UserType,
          args:{
              id:{type:GraphQLString}
          },
          resolve(parentValue, args){
              return axios.get('http://localhost:3000/users/'+ args.id)
                  .then(res => res.data);
          }
      },
      users:{
          type: new GraphQLList(UserType),
          resolve(parentValue, args){
              return axios.get('http://localhost:3000/users')
                  .then(res => res.data);
          }
      }
  }
});

// Mutations
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser:{
            type:UserType,
            args:{
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/users', {
                    name:args.firstName,
                    email: args.lastName,
                    age:args.email
                })
                .then(res => res.data);
            }
        },
        deleteUser:{
            type:UserType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/users/'+args.id)
                .then(res => res.data);
            }
        },
        editUser:{
            type:UserType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)},
                firstName: {type: GraphQLString},
                lastName: {type: GraphQLString},
                email: {type: GraphQLString},
            },
            resolve(parentValue, args){
                return axios.patch('http://localhost:3000/users/'+args.id, args)
                .then(res => res.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
