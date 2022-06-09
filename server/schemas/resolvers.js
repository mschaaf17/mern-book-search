const {AuthenticationError} = require('apollo-server-express')

//pull from controllers
const resolvers = {
Query: {
    // 
},



Mutation: {
    addUser: async (parent, args) => {
        const user = await User.create(args)
        return user;

    },
    login: async () => {

    }
}

}