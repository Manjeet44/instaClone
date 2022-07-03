const {register, login} = require('../controllers/user');

const resolvers = {
    Query: {
        //Usuario
        getUser: () => {
            console.log('Obteninendo Usuario');
            return null
        },
    },
    Mutation: {
        //Usuario
        register: (_, {input}) => register(input),
        login: (_, {input}) => login(input)
    }
};
module.exports = resolvers;