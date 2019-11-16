import * as types from './mutation_types';
import axios from 'axios';
import { reject } from 'q';
var qs = require('qs');
const state = {
    requestFeedback: false,
    apiUrl: 'https://ecoprod.tk/API/API_auth.php?'
};

function encode(val) {
    return encodeURIComponent(val)
    .replace(/%20/gi, ' ').
    replace(/@/gi, '@').
    replace(/,/gi, ',');
}
//convert some space, comma
axios.defaults.paramsSerializer = function(params) {
    return Object.keys(params)
        .map((key) => {
            var val = params[key];
            if (val === null || typeof val === 'undefined') {
                return;
            }
            var keyName = key;
            if (Array.isArray(val)) {
                keyName = key + '[]';
            } else {
                val = [val];
            }
            return val
                .map((v) => {
                    if (Object.prototype.toString.call(v) === '[object Date]') {
                        v = v.toISOString();
                    } else if (v !== null && typeof v === 'object') {
                        v = JSON.stringify(v);
                    }
                    return encode(key) + '=' + encode(v);
                })
                .join('&');
        })
        .join('&');
}
const actions = {
    //send feedback
    async sendFeedback({ commit, rootState }, payload) {
        return new Promise(resolve => {
            commit(types.SET_FEEDBACK_REQUEST, true);
            axios
                .get(state.apiUrl + 'feedbackForm', {
                    params: {
                        uid: rootState.Auth.user_id,
                        email: payload.email,
                        name: payload.name,
                        message: payload.message,
                        accessToken: rootState.Auth.token
                    },
                })
                .then(resp => {
                    if (resp.data.message == 'success') {
                    }
                    commit(types.SET_FEEDBACK_REQUEST, false);
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};

const getters = {};

const mutations = {
    [types.SET_FEEDBACK_REQUEST](state, payload) {
        state.requestFeedback = payload;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
