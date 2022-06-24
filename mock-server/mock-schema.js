const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');

const UserGroupType = new GraphQLObjectType({
  name:'UserGroup',
  fields:() => ({
    id: {type:GraphQLString},
    name: {type:GraphQLString}
  })

})

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
//   users {
//     id
//     firstName
//     lastName
//     phone
//     email
//     permission
//     userGroups{
//       id
//       name
//     }
//     profilePic
//     active
//   }
// }


// ADD USER

// mutation {
//   addUser(
//       firstName: "Jilly",
//       lastName: "Hall",
//       email: "jhall@gmail.com",
//       phone: "1231231234",
//       permission: "",
//       profilePic: "",
//       active: true)
//   {
//     id
//     firstName
//     lastName
//     email
//   }
// }


// DELETE USER

// mutation {
//   deleteUser(
//       id: "w8MpdeH")
//   {
//     id
//     firstName
//     lastName
//     email
//   }
// }


// USE MUTATION TO SET USER ACTIVE/INACTIVE

// mutation {
// 	toggleUserActive(id: "w8MpdeH", active: true) {
//     id,
//     active
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
      userGroups: {type: new GraphQLList(UserGroupType)},
      profilePic: {type: GraphQLString},
      active: {type: GraphQLBoolean},
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
                phone: {type: GraphQLString},
                permission: {type: GraphQLString},
                // userGroups: {type: GraphQLList(UserGroupType)},
                profilePic: {type: GraphQLString},
                active: {type: GraphQLBoolean},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/users', {
                    id: args.id,
                    firstName:args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    phone: args.phone,
                    permission: args.permission,
                    profilePic: args.profilePic,
                    active: args.active
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
          },
          resolve(parentValue, args){
              return axios.patch('http://localhost:3000/users/'+args.id, args)
              .then(res => res.data);
          }
      },
        toggleUserActive:{
            type:UserType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)},
                active: {type: GraphQLBoolean},
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
