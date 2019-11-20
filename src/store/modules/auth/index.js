import * as types from './mutation_types';
import axios from 'axios';
const state = {
    status: 'success',
    token: localStorage.getItem('token') || '',
    user_id: localStorage.getItem('user_id') || '',
    lang: localStorage.getItem('lang') || 'de',
    isVisited: localStorage.getItem('isVisted') || false,
    apiUrlForCheckUser:
        'https://ecoprod.tk/API/API_auth.php?checkUser',
    apiUrlForGetUserData:
        'https://ecoprod.tk/API/API_auth.php?getUserData'
};
const actions = {
    login({ commit, dispatch }, user) {
        return new Promise((resolve, reject) => {
            commit(types.AUTH_REQUEST, 'loading');
            axios
                .get(state.apiUrlForCheckUser, {
                    params: {
                        email: user.email,
                        password: user.password
                    }
                })
                .then(resp => {
                    //remove all tokens and user information from the localstorage login failed
                    if (resp.data.error) {
                        localStorage.setItem('token', null);
                        localStorage.setItem('user_id', null);
                        commit(types.AUTH_ERROR, 'failed');
                        reject(resp.data.error);
                    }
                    // set all tokens and user information in the localstorage
                    const token = resp.data.accessToken;
                    const user_id = resp.data.id;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user_id', user_id);
                    localStorage.setItem('isVisited', true);
                    commit(types.SET_VISITED, true);
                    commit(types.AUTH_SUCCESS, {
                        token: token,
                        user_id: user_id
                    });
                    resolve(resp);
                })
                .catch(err => {
                    commit(types.AUTH_ERROR, 'error');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_id');
                    reject(err);
                });
        });
    },
    //get searches, new products, favourite products from the getUserData api
    getUserData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            commit(types.AUTH_REQUEST, 'loading');
            axios
                .get(state.apiUrlForGetUserData, {
                    params: {
                        uid: state.user_id,
                        accessToken: state.token
                    }
                })
                .then(resp => {
                    if (resp.data.message != 'success') {
                        resolve();
                    }
                    dispatch(
                        'setSavedSearches',
                        resp.data.data[0].Saved_searches,
                        { root: true }
                    );
                    dispatch('setNewProducts', resp.data.data[0].New_products, {
                        root: true
                    });
                    dispatch('setFavourites', resp.data.data[0].Favourites, {
                        root: true
                    });

                    dispatch('setCurrentFavourites', resp.data.data[0].Favourites, {
                        root: true
                    });
                    commit(types.AUTH_REQUEST, 'success');
                })
                .catch(err => {
                    commit(types.AUTH_ERROR);
                    localStorage.removeItem('token');
                    reject(err);
                });
        });
    },
    //not implemented yet
    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit(types.AUTH_REQUEST, 'loading');
            axios({
                url: 'https://localhost:8000/register',
                data: user,
                method: 'POST'
            })
                .then(resp => {
                    const token = resp.data.token;
                    const user = resp.data.user;
                    localStorage.setItem('token', token);
                    commit(types.AUTH_SUCCESS, token, user);
                    resolve(resp);
                })
                .catch(err => {
                    commit(types.AUTH_ERROR, err);
                    localStorage.removeItem('token');
                    reject(err);
                });
        });
    },
    // set isVisted accordingly
    setVisited({commit}, payload){
        return new Promise(resolve => {
            commit(types.SET_VISITED, payload);
            resolve();
        });
    },
    setLang({commit}, payload){
        return new Promise(resolve => {
            commit(types.SET_LANG, payload);
            resolve();
        });
    },
    //logout, removed all tokens and user information from the localstorage
    logout({ commit }) {
        return new Promise(resolve => {
            commit(types.LOGOUT);
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('currentSearch');
            localStorage.removeItem('isVisited');
            localStorage.removeItem('lang');
            commit(types.SET_LANG, 'de');
            // localStorage.removeItem('lang');
            delete axios.defaults.headers.common['Authorization'];
            resolve();
        });
    }
};

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isVisited: state => state.isVisited,
    isLoading: state => state.status,
    getLang: state => state.lang
};

const mutations = {
    [types.AUTH_REQUEST](state, payload) {
        state.status = payload;
    },
    [types.AUTH_SUCCESS](state, payload) {
        state.status = 'success';
        state.token = payload.token;
        state.user_id = payload.user_id;
    },
    [types.AUTH_ERROR](state, payload) {
        state.status = payload;
    },
    [types.SET_VISITED](state, payload) {
        localStorage.setItem('isVisited', payload);
        state.isVisited = payload;
    },
    [types.SET_LANG](state, payload) {
        console.log('lang payload: ', payload);
        localStorage.setItem('lang', payload);
        state.lang = payload;
    },
    [types.LOGOUT](state) {
        state.status = '';
        state.token = '';
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
