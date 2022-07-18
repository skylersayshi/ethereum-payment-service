import * as api from '../api';

//action creators

export const getRequests = () => async (dispatch) => {

    try{
        const {data} = await api.fetchRequest();
        dispatch({type: 'FETCH_ALL_REQUESTS', payload: data});
    }catch(error){
        console.log(error.message)
    }

}

// export const getUsers = (filter) => async (dispatch) =>{
//     try {
//         const { data: {data} } = await api.fetchUser(filter);
//         console.log(data);
//         dispatch({type: 'FETCH_ALL', payload: data});
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getPostsBySearch = (searchQuery) => async (dispatch) =>{
//     try {
//         const { data: {data} } = await api.fetchPostsBySearch(searchQuery);
//         console.log(data);
//         dispatch({type: 'FETCH_BY_SEARCH', payload: data});
//     } catch (error) {
//         console.log(error);
//     }
// }

export const createRequest = (request) => async (dispatch) =>{
    try{
        const { data } = await api.createRequest(request);
        dispatch({type: 'CREATE_REQUEST', payload: data});
    }
    catch(error){
        console.log(error);
    }
}

// export const updateUser = (id, user) => async (dispatch) => {
//     try {
//         const {data} = await api.updateUser(id, user);
//         dispatch({type: 'UPDATE', payload: data});
//     } catch (error){
//         console.log(error.message);
//     }
// }

export const deleteRequest = (id) => async (dispatch) => {
    try {
        await api.deleteRequest(id);
        dispatch({type: 'DELETE', payload: id});
    } catch (error){
        console.log(error);
    }
}

// export const likePost = (id) => async(dispatch) => {
//     try{
//         const { data } = await api.likePost(id);
//         dispatch({type: 'UPDATE', payload: data});
//     } catch(error){
//         console.log(error)
//     }
// }