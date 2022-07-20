import * as api from '../api';

export const fetchTransactions = () => async (dispatch) => {
    try{
        const {data} = await api.fetchTransactions()
        dispatch({type: 'FETCH_ALL_TRANSACTIONS', payload: data})
    }catch(error){
        console.log(error.message)
    }
}

export const createTransaction = (transaction) => async (dispatch) =>{
    try{
        const { data } = await api.createTransaction(transaction)
        dispatch({type: 'CREATE_TRANSACTION', payload: data})
    }
    catch(error){
        console.log(error)
    }
}