import Vue from 'vue';
import Router from 'vue-router';
import HomeEcomda from './views/HomeEcomda.vue';
import store from './store/index';
Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'HomeEcomda',
            component: HomeEcomda
        },
        {
            path: '/favourites',
            name: 'Favourites',
            component: () => import('./views/Favourites.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/new-prods',
            name: 'NewProducts',
            component: () => import('./views/NewProducts.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/products-with-custom-search',
            name: 'ProductsWithCustomSearch',
            component: () => import('./views/ProductsWithCustomSearch.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/products-with-search',
            name: 'ProductsWithSearch',
            component: () => import('./views/ProductsWithSearch.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/quick-tour-start',
            name: 'QuickTourStart',
            component: () => import('./views/QuickTourStart.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/saved-search-list',
            name: 'SavedSearchList',
            component: () => import('./views/SavedSearchList.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/save-search',
            name: 'SaveSearch',
            component: () => import('./views/SaveSearch.vue'),
            meta: {
                requiresAuth: true
            }
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next('/');
    } else {
        next();
    }
});

export default router;
