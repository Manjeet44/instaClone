const {register, login, getUser, updateAvatar} = require('../controllers/user');

const resolvers = {
    Query: {
        //Usuario
        getUser: (_,{id, username}) => getUser(id, username),
    },
    Mutation: {
        //Usuario
        register: (_, {input}) => register(input),
        login: (_, {input}) => login(input),
        updateAvatar: (_, {file}) => updateAvatar(file)
    }
};
module.exports = resolvers;