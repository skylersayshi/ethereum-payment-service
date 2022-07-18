import { combineReducers } from 'redux';

import users from './users';
import requests from './requests';
// import apiData from './posts';
// import auth from './auth';
// import recipes from './recipes';
// import users from './profile';

export default combineReducers({
// //    posts, apiData, auth, recipes, users
    users, requests
});

