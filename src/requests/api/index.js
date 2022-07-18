import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5001'})

// API.interceptors.request.use((req)=>{
//     if(localStorage.getItem('profile')){
//         req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
//     return req;
// })

// const url = 'http://localhost:5001/posts';

export const fetchUser = () => axios.get('http://localhost:5001/users/you');

// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createUser = (newUser) => API.post('/users/new', newUser);

export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);

export const deleteUser = (id) => API.delete(`/users/${id}`);

export const fetchRequest = () => API.get('/requests');

export const createRequest = (newRequest) => API.post('/requests/new', newRequest);

export const deleteRequest = (id) => API.delete(`/requests/${id}`);

// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// export const signIn = (formData) => API.post('/users/signin', formData);

// export const signUp = (formData) => API.post('/users/signup', formData);

// export const fetchUsers = () => API.get('/users/profile')

// export const updateProfile = (id, profileData) => API.patch(`/users/profile/${id}`, profileData);

// export const getrecipes = () => API.get('/recipes');

// export const createrecipe = (newRecipe) => API.post('/recipes', newRecipe);

// export const updaterecipe = (id, updatedRecipe) => API.patch(`/recipes/${id}`, updatedRecipe);

// export const deleterecipe = (id) => API.delete(`/recipes/${id}`);