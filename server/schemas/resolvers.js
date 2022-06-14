const {AuthenticationError} = require('apollo-server-express')
const { signToken } = require('../utils/auth')
const { User } = require('../models')

//pull from controllers
const resolvers = {
Query: {
    me: async (parent, args, context)=> {
        try {
            if(context.user) {
                
                const userData = await User.findOne({_id: context.user._id})
                .select('-_v -password')
                .populate('savedBooks')
                console.log(userData)
                return userData
            }
            throw new AuthenticationError('You are not logged in')
        } catch (err) {
            console.log(err)
            throw new AuthenticationError('error has occured')
        }
       
    }
},



Mutation: {
    addUser: async (parent, args) => {
        console.log('============')
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

    },

saveBook: async (parent, args, context) => {
    if (context.user) {
        const updatedBooks = await User.findOneAndUpdate(
            {_id: context.user._id},
            {$addToSet: {savedBooks: args.bookId}},
            {new: true}
        )
        return updatedBooks
    }
    throw new AuthenticationError('Please log in to access the saved books.')
},

removeBook: async (parent, args, context) => {
    if(context.user) {
    const updatedBooks = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
    );

    return updatedBooks;
    }

    throw new AuthenticationError('You need to be logged in!');
}

}
}

module.exports = resolvers;