const {AuthenticationError} = require('apollo-server-express')
const { signToken } = require('../utils/auth')

//pull from controllers
const resolvers = {
Query: {
    // 
},



Mutation: {
    addUser: async (parent, args) => {
        const user = await User.create(args)
        const token = signToken(user)
        return {token, user};

    },
    login: async (parent, { email, password }) => {
        const user= await User.findOne({email})

        if(!user) {
            throw new AuthenticationError('Incorrect credientials!')
        }
        const correctPw = await user.isCorrectPassword(password)

        if(!correctPw) {
            throw new AuthenticationError('Incorrect credentials')
        }

        const token = signToken(user)
        return { token, user }

    }
},

// saveBook: async
//if context.user needs to logged in to save a book

}