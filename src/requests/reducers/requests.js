export default (requests = [], action) => {
    switch(action.type){
        case 'FETCH_ALL_REQUESTS':
            return action.payload
        case 'CREATE_REQUEST':
            return [...requests, action.payload]
        case 'DELETE_REQUEST':
            return requests.filter((request)=> request._id !== action.payload)
        default:
            return requests
    }
}