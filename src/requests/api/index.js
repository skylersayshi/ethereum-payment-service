import axios from 'axios';

const API = axios.create({baseURL: 'https://eth-payment-platform.herokuapp.com'})

export const fetchUsers = () => API.get('/users/you')

export const createUser = (newUser) => API.post('/users/new', newUser)

export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser)

export const deleteUser = (id) => API.delete(`/users/${id}`)

export const fetchRequests = () => API.get('/requests')

export const createRequest = (newRequest) => API.post('/requests/new', newRequest)

export const deleteRequest = (id) => API.delete(`/requests/${id}`)

export const fetchTransactions = () => API.get('/transactions')

export const createTransaction = (newTransaction) => API.post('/transactions/new', newTransaction)