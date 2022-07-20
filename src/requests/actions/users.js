import * as api from '../api';

export const getUsers = () => async (dispatch) => {
    try{
        const {data} = await api.fetchUsers()
        dispatch({type: 'FETCH_ALL_USERS', payload: data})
    }catch(error){
        console.log(error.message)
    }
}

export const createUser = (user) => async (dispatch) =>{
    try{
        const { data } = await api.createUser(user);
        dispatch({type: 'CREATE_USER', payload: data});
    }
    catch(error){
        console.log(error);
    }
}

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const {data} = await api.updateUser(id, user);
        dispatch({type: 'UPDATE_USER', payload: data});
    } catch (error){
        console.log(error.message);
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({type: 'DELETE_USER', payload: id});
    } catch (error){
        console.log(error);
    }
}