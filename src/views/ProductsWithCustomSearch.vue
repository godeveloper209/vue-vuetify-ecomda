<template>
    <div>
        <app-navigation></app-navigation>
        <home-navigator></home-navigator>
        <v-content>
            <v-container fill-height fluid>
                <feedback></feedback>
                <v-layout justify-center align-center>
                    <v-row align="start" justify="center" class="px-4 mx-4">
                        <!-- <div
                            class="custom-search-column"
                        >
                            <custom-search-box></custom-search-box>
                        </div>
                        <div
                            class="product-column"
                        >
                            <product-table></product-table>
                        </div> -->

                        <v-col cols="12" sm="12" class="custom-search-column">
                            <custom-search-box></custom-search-box>
                        </v-col>
                        <v-col cols="12" sm="12" class="product-column">
                            <product-table></product-table>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';
import HomeNavigator from '@/components/HomeNavigator';
import Feedback from '@/components/Feedback';
import ProductTable from '@/components/ProductTable';
import CustomSearchBox from '@/components/CustomSearchBox';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'ProductsWithCustomSearch',
    components: {
        AppNavigation,
        HomeNavigator,
        Feedback,
        ProductTable,
        CustomSearchBox
    },
    props: {},
    computed: {
        currentSearch: function() {
            return this.getCurrentSearch();
        }
    },
    data: () => ({
        drawer: null
    }),
    methods: {
        ...mapGetters(['getCurrentSearch']),
        ...mapActions(['getProductsForNotSave', 'saveCurrentSearch'])
    },
    mounted() {
        // console.log('current search', this.currentSearch);
        if (
            this.currentSearch.searchId == null ||
            this.currentSearch.searchId == undefined
        ) {
            this.saveCurrentSearch({ search: { refiner: 'OR' } });
            this.getProductsForNotSave();
        }
    }
};
</script>

<style>
.product-container {
    background: url('../assets/img/background.png');
    background-size: cover;
    height: 100%;
}

.table-control-bar .v-list-item__icon {
    margin-right: 0.8vw !important;
}
@media (min-width: 900px) {
    /* search bar on the left column */
    .custom-search-column {
        width: 23%!important;
        max-width: 23%!important;
        display: inline-block;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        padding-right: 0px;
        padding-left:16px;
    }
    /* product table and container on the right */
    .product-column {
        width: 74%!important;
        max-width: 75%!important;
        display: inline-block;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
    }
}
</style>
