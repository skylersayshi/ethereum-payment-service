import * as api from '../api'

export const getRequests = () => async (dispatch) => {
    try{
        const {data} = await api.fetchRequests()
        dispatch({type: 'FETCH_ALL_REQUESTS', payload: data})
    }catch(error){
        console.log(error.message)
    }
}

export const createRequest = (request) => async (dispatch) =>{
    try{
        const { data } = await api.createRequest(request)
        dispatch({type: 'CREATE_REQUEST', payload: data})
    }
    catch(error){
        console.log(error)
    }
}

export const deleteRequest = (id) => async (dispatch) => {
    try {
        await api.deleteRequest(id)
        dispatch({type: 'DELETE_REQUEST', payload: id})
    } catch (error){
        console.log(error)
    }
}