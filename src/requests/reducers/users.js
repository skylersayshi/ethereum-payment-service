export default (users = [], action) => {
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload;
        // case 'FETCH_BY_SEARCH':
        //     return action.payload; 
        case 'CREATE':
            return [...users, action.payload];
        case 'UPDATE':
            return users.map((user) => (user._id === action.payload._id ? action.payload : user));
        // case 'LIKE':
        //     return users.map((user)=> user._id === action.payload._id ? action.payload : user);
        case 'DELETE':
            return users.filter((user)=> user.id !== action.payload);
        default:
            return users;
    }
}