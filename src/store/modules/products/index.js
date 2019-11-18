import * as types from './mutation_types';
import axios from 'axios';

const state = {
    loadingStatus: false,
    loadingError: '',
    products: [],
    loadingFavorourites: false,
    numberOfProducts: 1,
    apiUrl: 'https://ecoprod.tk/API/API_auth.php?'
};
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
const actions = {
    // get products and search figures according to search id
    async getProductsPerKeyword({ commit, dispatch, rootState }) {
        return new Promise((resolve, reject) => {
            commit(types.PRODUCTS_REQUEST);
            axios
                .get(state.apiUrl + 'getUserDataPerKeyword', {
                    params: {
                        uid: rootState.Auth.user_id,
                        saveSearchId: rootState.Searches.currentSearch.searchId,
                        accessToken: rootState.Auth.token
                    }
                })

                .then(resp => {
                    if (resp.data.message != 'success') {
                        reject();
                    }
                    let selected_brands_array = [];
                    let string_brands_array = resp.data.data.brand.split(',');
                    if (
                        string_brands_array != '' &&
                        string_brands_array.length != 0
                    )
                        string_brands_array.map(item => {
                            if (item != '' || item != undefined || item != null)
                                selected_brands_array.push({
                                    name: item
                                });
                        });
                    dispatch('setDateForSearch', resp.data.data.Date).then(
                        dispatch('setLand', resp.data.data.Land).then(
                            dispatch(
                                'setCurrentFavourites',
                                resp.data.Favourites
                            ).then(
                                dispatch(
                                    'saveSelectedBrands',
                                    selected_brands_array
                                ).then(
                                    dispatch(
                                        'setBrand',
                                        selected_brands_array
                                    ).then(
                                        dispatch(
                                            'saveSelectedCategories',
                                            JSON.parse(
                                                '[' +
                                                    resp.data.data.categories +
                                                    ']'
                                            )
                                        ).then(() => {
                                            dispatch('saveCurrentSearch', {
                                                search: {
                                                    refiner:
                                                        resp.data.data.refiner
                                                }
                                            }).then(() => {
                                                commit(
                                                    types.SET_NUMBER_OF_PRODUCTS,
                                                    resp.data.data.products
                                                        .length
                                                );
                                                if (
                                                    resp.data.data.products
                                                        .length > 1000
                                                )
                                                    resp.data.data.products.pop();
                                                commit(
                                                    types.SET_PRODUCTS,
                                                    resp.data.data.products
                                                );

                                                commit(
                                                    types.FINISH_PRODUCTS_REQUEST
                                                );
                                                resolve(resp);
                                            });
                                        })
                                    )
                                )
                            )
                        )
                    );
                })
                .catch(err => {
                    commit(types.SET_LOADINGPRODUCTS_ERROR, err);
                    commit(types.SET_PRODUCTS, []);
                });
        });
    },
    //get products without saving search, forsave paramter should be False
    async getProductsForNotSave({ commit, dispatch, rootState }) {
        let listOfSelectedBrands = [];

        rootState.Searches.selectedBrands.map(item => {
            listOfSelectedBrands.push(item.name);
        });
        return new Promise(resolve => {
            commit(types.PRODUCTS_REQUEST);
            axios
                .get(state.apiUrl + 'saveSearch', {
                    params: {
                        uid: rootState.Auth.user_id,
                        name: '',
                        keyword: rootState.Searches.currentSearch.keyword,
                        forsave: 'False',
                        accessToken: rootState.Auth.token,
                        refiner: rootState.Searches.currentSearch.refiner,
                        cat: rootState.Searches.selectedCategories.toString(),
                        brand: listOfSelectedBrands.toString(),
                        Land: rootState.Searches.land,
                        Date: rootState.Searches.dateForSearch
                    },
                    headers
                })

                .then(resp => {
                    commit(types.SET_NUMBER_OF_PRODUCTS, resp.data.length);
                    if (resp.data.length > 1000) resp.data.pop();
                    commit(types.SET_PRODUCTS, resp.data);
                    commit(types.FINISH_PRODUCTS_REQUEST);
                    resolve(resp);
                })
                .catch(err => {
                    commit(types.SET_LOADINGPRODUCTS_ERROR, err);
                    commit(types.SET_PRODUCTS, []);
                });
        });
    },
    // get products saving search, forsave should be True
    async getProductsForSave({ commit, dispatch, rootState }) {
        let listOfSelectedBrands = [];

        rootState.Searches.selectedBrands.map(item => {
            listOfSelectedBrands.push(item.name);
        });
        return new Promise(resolve => {
            commit(types.PRODUCTS_REQUEST);
            axios
                .get(state.apiUrl + 'saveSearch', {
                    params: {
                        uid: rootState.Auth.user_id,
                        name: rootState.Searches.currentSearch.searchName,
                        keyword: rootState.Searches.currentSearch.keyword,
                        forsave: 'True',
                        accessToken: rootState.Auth.token,
                        refiner: rootState.Searches.currentSearch.refiner,
                        cat: rootState.Searches.selectedCategories.toString(),
                        brand: listOfSelectedBrands.toString(),
                        Land: rootState.Searches.land,
                        Date: rootState.Searches.dateForSearch
                    }
                })

                .then(resp => {
                    if (resp.data.message != 'success') {
                        resolve();
                    }
                    dispatch(
                        'setSavedSearches',
                        resp.data.data[0].Saved_searches
                    );
                    commit(types.SET_NUMBER_OF_PRODUCTS, resp.data.length);
                    if (resp.data.length > 1000) resp.data.pop();
                    commit(types.SET_PRODUCTS, resp.data);
                    commit(types.FINISH_PRODUCTS_REQUEST);
                    resolve(resp);
                })
                .catch(err => {
                    commit(types.SET_LOADINGPRODUCTS_ERROR, err);
                    commit(types.SET_PRODUCTS, []);
                });
        });
    },

    async clearProducts({ commit }) {
        return new Promise(resolve => {
            commit(types.CLEAR_PRODUCTS);
            resolve();
        });
    },
    //get favourite Products 
    async saveFavourites({ commit, dispatch, rootState }, payload) {
        return new Promise(resolve => {
            commit(types.FAVOURITES_REQUEST, true);
            axios
                .get(state.apiUrl + 'favouriteProducts', {
                    params: {
                        uid: rootState.Auth.user_id,
                        accessToken: rootState.Auth.token,
                        saveSearchId: '',
                        FD: payload.deletedProductsIds.toString(),
                        FI: payload.addedProductsIds.toString()
                    }
                })

                .then(resp => {
                    if (resp.data.message != 'success') {
                        reject();
                    }
                    dispatch('setFavourites', resp.data.Favourites);
                    dispatch('setCurrentFavourites', resp.data.Favourites);
                    commit(types.FAVOURITES_REQUEST, false);
                    resolve(resp);
                })
                .catch(err => {
                    commit(types.SET_LOADINGPRODUCTS_ERROR, err);
                });
        });
    },

    async setNumberOfProducts({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_NUMBER_OF_PRODUCTS, payload);
            resolve();
        });
    }
};

const getters = {
    getProductsData: state => state.products,
    getLoadingProductsRequest: state => state.loadingStatus,
    getProductsRequestStatus: state => state.loadingStatus,
    getNumberOfProducts: state => state.numberOfProducts
};

const mutations = {
    [types.CLEAR_PRODUCTS](state) {
        state.products.length = 0;
    },
    [types.SET_PRODUCTS](state, products) {
        state.products.length = 0;

        products.map(item => {
            // convert date format from dd/mm/yyyy to Date
            let temp_date_array = item.ListedSince.split('/');
            let date_listed_since = new Date(
                temp_date_array[2],
                temp_date_array[1],
                temp_date_array[0]
            );
            // some paramters static as no data from the backend now
            let temp = {
                id: item.id,
                image: '',
                productTitle: item.Title,
                availableSince: item.ListedSince,
                availableSinceSec: date_listed_since.getTime(),
                land: item.Country,
                category: item.CategoryTree,
                brand: item.Brand,
                source: 'AMZ',
                rankCurrent: 'Rank Now',
                rankPast: 'Rank 30 days ago',
                rating:item.ProductRatingNumber,
                ratingQuality: !item.ProductRatingAverage || item.ProductRatingAverage == '0' ? '-' : item.ProductRatingAverage,
                // price: !item.Price || item.Price[0].toFixed(2) == '0.00' ? 'n.a.' : item.Price[0].toFixed(2),
                price: item.Price,
                asin: item.ASIN,
                saleEstimate: !item.SaleEstimate || item.SaleEstimate=="n.a."?  '0' :item.SaleEstimate,
                bestSellerRankRC: item.BestsellerRankRootCategory
            };
            state.products.push(temp);
        });
    },
    [types.PRODUCTS_REQUEST](state) {
        state.loadingStatus = true;
    },
    [types.FAVOURITES_REQUEST](state, payload) {
        state.loadingFavorourites = payload;
    },
    [types.FINISH_PRODUCTS_REQUEST](state) {
        state.loadingStatus = false;
    },
    [types.SET_LOADINGPRODUCTS_ERROR](error) {
        state.loadingError = error;
    },
    [types.SET_NUMBER_OF_PRODUCTS](state, payload) {
        state.numberOfProducts = payload;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
