import * as types from './mutation_types';
import axios from 'axios';
import { reject } from 'q';
const state = {
    loadingStatus: false,
    tempSearchKey: '',
    savedSearches: [],
    newProducts: [],
    favourites: [],
    candFavourites: [],
    currentFavourites: [],
    currentSearch: JSON.parse(localStorage.getItem('currentSearch')) || {
        searchName: null,
        keyword: null,
        searchId: null,
        refiner: 'OR'
    },
    brands: [],
    selectedBrands: [],
    loadingBrandStatus: false,
    selectedCategories: [],
    selectedPAndCCategories: [],
    apiUrl: 'https://ecoprod.tk/API/API_auth.php?',
    land: null,
    dateForSearch: '',
};
const actions = {
    async setSavedSearches({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_SEARCH, payload);
            resolve();
        });
    },
    async setNewProducts({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_NEW_PRODUCTS, payload);
            resolve();
        });
    },
    async setFavourites({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_FAVOURITES, payload);
            resolve();
        });
    },

    async setCurrentFavourites({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_CURRENT_FAVOURITES, payload);
            resolve();
        });
    },

    async saveCandFavourites({ commit }, candFavourites) {
        return new Promise(resolve => {
            commit(types.SET_CAND_FAVOURITES, candFavourites);
            resolve();
        });
    },
    async setBrand({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_BRAND, payload);
            resolve();
        });
    },

    async setLand({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_LAND, payload);
            resolve();
        });
    },

    async setDateForSearch({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_DATE_FOR_SEARCH, payload);
            resolve();
        });
    },
    // delete search item from saved searches
    async deleteSavedSearches({ commit, rootState }, payload) {
        return new Promise(resolve => {
            commit(types.SAVE_SEARCH_REQUEST);
            axios
                .get(state.apiUrl + 'DeletesaveSearch', {
                    params: {
                        uid: rootState.Auth.user_id,
                        saveSearchId: payload,
                        accessToken: rootState.Auth.token
                    }
                })
                .then(resp => {
                    if (resp.data.message == 'success') {
                        commit(types.DELETE_SEARCH, payload);
                    }
                    commit(types.FINISH_SEARCH_REQUEST);
                    resolve(resp);
                })
                .catch(err => {
                    commit(types.SET_SAVE_SEARCH_ERROR, err);
                });
        });
    },
    //save searches 
    async updateSearchAndRows({ commit, rootState }) {
        let listOfSelectedRows = [];
        state.candFavourites.map(item => {
            listOfSelectedRows.push(item.id);
        });
        let listOfSelectedBrands = [];
        state.selectedBrands.map(item => {
            listOfSelectedBrands.push(item.name);
        });
        return new Promise(resolve => {
            commit(types.SAVE_SEARCH_REQUEST);
            axios
                .get(state.apiUrl + 'saveSearch', {
                    params: {
                        uid: rootState.Auth.user_id,
                        saveSearchId: state.currentSearch.searchId,
                        accessToken: rootState.Auth.token,
                        forsave: 'Update',
                        name: state.currentSearch.searchName,
                        keyword: state.currentSearch.keyword,
                        refiner: state.currentSearch.refiner,
                        FPid: listOfSelectedRows.toString(),
                        cat: state.selectedCategories.toString(),
                        brand: listOfSelectedBrands.toString(),
                        Land: rootState.Searches.land,
                        Date: state.dateForSearch,
                    }
                })
                .then(resp => {
                    if (resp.data.message != 'success') {
                        reject()
                    }
                    commit(types.FINISH_SEARCH_REQUEST);
                    resolve();
                })
                .catch(err => {
                    commit(types.SET_SAVE_SEARCH_ERROR, err);
                });
        });
    },
    //get brands from the backend
    async getBrandsApi({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_LOADING_BRAND_STATUS, true);
            axios
                .get(state.apiUrl + 'brandLookup', {
                    params: {
                        brand: payload
                    }
                })
                .then(resp => {
                    if (resp.data.message != 'success') {
                        ;
                    }
                    commit(types.SET_BRAND, resp.data.data);
                    commit(types.SET_LOADING_BRAND_STATUS, false);
                    resolve(resp);
                })
                .catch(err => {
                    commit(types.SET_SAVE_SEARCH_ERROR, err);
                });
        });
    },
    async saveSelectedBrands({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_SELECTED_BRAND, payload);
            resolve();
        });
    },
    async saveSelectedCategories({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_SELECTED_CATEGORY, payload);
            resolve();
        });
    },
    async saveSelectedPAndCCategories({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_SELECTED_P_AND_C_CATEGORY, payload);
            resolve();
        });
    },
    async saveCurrentSearch({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_CURRENT_SEARCH, payload);
            resolve();
        });
    }
};

const getters = {
    getTempSearchKey: state => state.tempSearchKey,
    getCurrentSearch: state => state.currentSearch,
    getSavedSearches: state => state.savedSearches,
    getNewProducts: state => state.newProducts,
    getFavourites: state => state.favourites,
    getCurrentFavourites: state => state.currentFavourites,
    getCandFavourites: state => state.candFavourites,
    getLoadingBrandStatus: state => state.loadingBrandStatus,
    getBrands: state => state.brands,
    getSelectedBrands: state => state.selectedBrands,
    getSelectedCategories: state => state.selectedCategories,
    getLand: state => state.land,
    getDateForSearch: state => state.dateForSearch,
};

const mutations = {
    [types.SAVE_SEARCH_REQUEST](state) {
        state.loadingStatus = true;
    },
    [types.FINISH_SEARCH_REQUEST](state) {
        state.loadingStatus = false;
    },
    [types.SET_TEMP_SEARCHKEY](state, keyword) {
        state.tempSearchKey = keyword;
    },
    [types.SET_SEARCH](state, payload) {
        state.savedSearches.length = 0;
        state.savedSearches = payload;
    },
    [types.DELETE_SEARCH](state, id) {
        state.savedSearches = state.savedSearches.filter(item => {
            return item.id != id;
        });
    },
    [types.SET_NEW_PRODUCTS](state, newProducts) {
        state.newProducts.length = 0;
        newProducts.map(item => {
            let temp = {
                id: item.Pid,
                image: '',
                productTitle: item.Title,
                availableSince: item.ListedSince,
                //.availableSinceSec: date_listed_since.getTime(),
                land: item.Land,
                category: item.CategoryTree,
                brand: item.Brand,  
                source: 'AMZ',
                rankCurrent: 'Rank Now',
                rankPast: 'Rank 30 days ago',
                rating: item.ProductRatingNumber,
                ratingQuality: !item.ProductRatingAverage || item.ProductRatingAverage == '0' ? '-' : item.ProductRatingAverage,
                // price: !item.Price || item.Price[0].toFixed(2) == '0.00' ? 'n.a.' : item.Price[0].toFixed(2),
                price: item.Price,
                asin: item.ASIN,
                saleEstimate: !item.SaleEstimate || item.SaleEstimate=="n.a."?  '0' :item.SaleEstimate,
                bestSellerRankRC: item.BestsellerRankRootCategory
            };
            state.newProducts.push(temp);
        });
    },
    [types.SET_FAVOURITES](state, favourites) {
        
        state.favourites.length = 0;
        if(favourites.length == 0)
            state.favourites = [];
        
        else
            favourites.map(item => {
            let temp_date_array = item.ListedSince.split('/');
            let date_listed_since = new Date(temp_date_array[2], temp_date_array[1], temp_date_array[0]);
            let temp = {
                id: item.Pid,
                image: '',
                productTitle: item.ProductTitle,
                availableSince: item.ListedSince,
                availableSinceSec: date_listed_since.getTime(),
                land: item.Land,
                category: item.CategoryTree,
                brand: item.Brand,  
                source: 'AMZ',
                rankCurrent: 'Rank Now',
                rankPast: 'Rank 30 days ago',
                rating: item.ProductRatingNumber,
                ratingQuality: !item.ProductRatingAverage || item.ProductRatingAverage == '0' ? '-' : item.ProductRatingAverage,
                // price: !item.Price || item.Price[0].toFixed(2) == '0.00' ? 'n.a.' : item.Price[0].toFixed(2),
                price: item.Price,
                asin: item.ASIN,
                saleEstimate: !item.SaleEstimate || item.SaleEstimate=="n.a."?  '0' :item.SaleEstimate,
                bestSellerRankRC: item.BestsellerRankRootCategory
            };
            state.favourites.push(temp);
        });
    },
    [types.SET_CURRENT_FAVOURITES](state, currentFavourites) {
        state.currentFavourites.length = 0;
        currentFavourites.map(item => {
            let temp_date_array = item.ListedSince.split('/');
            let date_listed_since = new Date(temp_date_array[2], temp_date_array[1], temp_date_array[0]);
            let temp = {
                id: item.Pid,
                image: '',
                productTitle: item.ProductTitle,
                availableSince: item.ListedSince,
                availableSinceSec: date_listed_since.getTime(),
                land: item.Land,
                category: item.CategoryTree,
                brand: item.Brand,  
                source: 'AMZ',
                rankCurrent: 'Rank Now',
                rankPast: 'Rank 30 days ago',
                rating: item.ProductRatingNumber,
                ratingQuality: !item.ProductRatingAverage || item.ProductRatingAverage == '0' ? '-' : item.ProductRatingAverage,
                // price: !item.Price || item.Price[0].toFixed(2) == '0.00' ? 'n.a.' : item.Price[0].toFixed(2),
                price: item.Price,
                asin: item.ASIN,
                saleEstimate: !item.SaleEstimate || item.SaleEstimate=="n.a."?  '0' :item.SaleEstimate,
                bestSellerRankRC: item.BestsellerRankRootCategory
            };
            state.currentFavourites.push(temp);
        });
    },

    
    [types.SET_CURRENT_SEARCH](state, payload) {
        let temp_currentSearch = state.currentSearch;
        let keys = Object.keys(payload.search);
        keys.map(item => {
            temp_currentSearch[item] = payload.search[item];
        });
        localStorage.setItem(
            'currentSearch',
            JSON.stringify(temp_currentSearch)
        );
    },
    [types.SET_CAND_FAVOURITES](state, payload) {
        state.candFavourites = payload;
    },
    [types.SET_LOADING_BRAND_STATUS](state, payload) {
        state.loadingBrandStatus = payload;
    },
    [types.SET_BRAND](state, payload) {
        //should removed once brand api is changed
        let _ = require('underscore');
        let brand_array = [];
        payload.map(item => {
            brand_array.push({name: item.name});
        });
        
        state.brands = _.union(state.brands, brand_array);
    },
    [types.SET_SELECTED_BRAND](state, payload) {
        state.selectedBrands = payload;
    },
    [types.SET_SELECTED_CATEGORY](state, payload) {
        state.selectedCategories = payload;
    },
    [types.SET_SELECTED_P_AND_C_CATEGORY](state, payload) {
        state.selectedPAndCCategories = payload;
    },
    [types.SET_LAND](state, payload) {
        state.land = payload;
    },
    [types.SET_DATE_FOR_SEARCH](state, payload) {
        state.dateForSearch = payload;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
