import * as api from '../api/index';

//action creators

export const getUsers = () => async (dispatch) => {

    try{
        const {data} = await api.fetchUser();
        dispatch({type: 'FETCH_ALL', payload: data});
    }catch(error){
        console.log(error.message)
    }

}

// export const getPostsBySearch = (searchQuery) => async (dispatch) =>{
//     try {
//         const { data: {data} } = await api.fetchPostsBySearch(searchQuery);
//         console.log(data);
//         dispatch({type: 'FETCH_BY_SEARCH', payload: data});
//     } catch (error) {
//         console.log(error);
//     }
// }

export const createUser = (user) => async (dispatch) =>{
    try{
        const { data } = await api.createUser(user);
        dispatch({type: 'CREATE', payload: data});
    }
    catch(error){
        console.log(error);
    }
}

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const {data} = await api.updateUser(id, user);
        dispatch({type: 'UPDATE', payload: data});
    } catch (error){
        console.log(error.message);
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
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