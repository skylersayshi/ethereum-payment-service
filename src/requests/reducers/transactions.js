export default (transactions = [], action) => {
    switch(action.type){
        case 'FETCH_ALL_TRANSACTIONS':
            return action.payload
        case 'CREATE_TRANSACTION':
            return [...transactions, action.payload]
        default:
            return transactions
    }
}