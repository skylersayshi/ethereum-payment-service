export default (users = [], action) => {
    switch(action.type){
        case 'FETCH_ALL_USERS':
            return action.payload
        case 'CREATE_USER':
            return [...users, action.payload]
        case 'UPDATE_USER':
            return users.map((user) => (user.walletAddress === action.payload.walletAddress ? action.payload : user))
        case 'DELETE_USER':
            return users.filter((user)=> user.walletAddress !== action.payload)
        default:
            return users
    }
}