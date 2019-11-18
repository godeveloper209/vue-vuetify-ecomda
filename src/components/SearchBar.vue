<template>
    <v-container class="search-box-container">
        <v-layout class="d-flex">
            <v-text-field
                v-model="searchKeyword"
                @keyup.enter="handleEnterClick"
                :label="$vuetify.lang.t('$vuetify.startNewSearch')"
                solo
                :hide-details="true"
                class="input-black"
            ></v-text-field>
            <v-tooltip
                right
                content-class="search-tooltip"
                nudge-left="10"
                open-delay="500"
                close-delay="500"
            >
                <template v-slot:activator="{ on }">
                    <v-btn class="search-icon" color="primary" @click="handleClickSearch" v-on="on">
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-text class="black--text" v-html="$vuetify.lang.t('$vuetify.infoForSearchBox')">
                        
                    </v-card-text>
                </v-card>
            </v-tooltip>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import router from '../router.js';
import { dateMixin } from './mixins/index';
export default {
    name: 'SearchBar',
    props: {
        handleClickSearchBar: Function
    },
    mixins: [dateMixin],
    data: () => ({
        searchKeyword: ''
    }),
    methods: {
        ...mapGetters(['getCurrentSearch']),
        ...mapActions([
            'saveCurrentSearch',
            'getProductsForNotSave',
            'saveSelectedBrands',
            'saveSelectedCategories',
            'setCurrentFavourites',
            'setBrand',
            'setLand',
            'setDateForSearch'
        ]),
        handleEnterClick: function() {
            this.handleClickSearch();
        },

        handleClickSearch() {
            let currentDate = new Date();
            if (this.searchKeyword == null || this.searchKeyword == '')
                this.searchKeyword = ' ';
            this.saveCurrentSearch({
                search: {
                    keyword: this.searchKeyword,
                    searchId: null,
                    searchName: null,
                    refiner: null
                }
            }).then(
                this.setDateForSearch('0000-00-00').then(
                    this.setLand().then(
                        this.setBrand([]).then(
                            this.saveSelectedBrands([]).then(
                                //this.setCurrentFavourites([]).then(
                                this.saveSelectedCategories([]).then(
                                    router.push({
                                        name: 'ProductsWithCustomSearch'
                                    })
                                )
                                //)
                            )
                        )
                    )
                )
            );
        }
    }
};
</script>
<style>
.search-box-container .v-text-field {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: unset !important;
    border-bottom-right-radius: unset !important;
    border: unset !important;
}

.search-box-container .v-label {
    color: #ccc !important;
}
.search-box-container .search-icon {
    color: #fff;
    border-top-left-radius: unset !important;
    border-bottom-left-radius: unset !important;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 48px !important;
}
.input-black input {
    color: black !important;
}
</style>