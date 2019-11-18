<template>
    <div>
        <app-navigation></app-navigation>
        <loading-circle :loading="loadingStatus"></loading-circle>
        <v-content class="quick-tour-start-whole-cont">
            <v-container class="quick-tour-start-container">
                <feedback></feedback>
                <v-row justify="center">
                    <v-col justify="center">
                        <!-- search field on the home page -->
                        <search-bar style="max-width:400px;"></search-bar>
                    </v-col>
                </v-row>
                <v-row class="three-boxes-container" justify="center">
                    <v-col cols="sm" md="4" justify="center" class="px-4">
                        <!-- cards for the saved searches on the left -->

                        <v-card class="elevation-1 q-tour-start-card">
                            <v-tooltip top content-class open-delay="500" close-delay="500">
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        block
                                        color="primary"
                                        class="no-transform-text three-box-header"
                                        depressed
                                        @click="handleMoreSavedSearches"
                                        v-on="on"
                                        v-html="$vuetify.lang.t('$vuetify.savedSearches')"
                                    ></v-btn>
                                </template>
                                <v-card>
                                    <v-card-text class="black--text" v-html="$vuetify.lang.t('$vuetify.infoForSavedSearch')">
                                        
                                    </v-card-text>
                                </v-card>
                            </v-tooltip>
                            <v-card-text>
                                <v-list-item-group v-if="savedSearches.length != 0">
                                    <v-list-item
                                        two-line
                                        v-for="item in savedSearches.slice(
                                                    0,
                                                    5
                                                )"
                                        :key="item.id"
                                    >
                                        <v-list-item-content
                                            @click="
                                                        onSelectSearch(item.id)
                                                    "
                                        >
                                            <v-list-item-title class="body-2">{{ item.Name }}</v-list-item-title>
                                            <v-list-item-subtitle
                                                class="caption"
                                            >{{ item.updatedOn }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                                <p v-else class="text-center" v-html="$vuetify.lang.t('$vuetify.noSavedSearch')"></p>
                            </v-card-text>

                            <v-card-actions v-if="savedSearches.length >= 5">
                                <div class="flex-grow-1"></div>
                                <v-btn
                                    text
                                    class="capitalize-text"
                                    @click="handleMoreSavedSearches"
                                    v-html="$vuetify.lang.t('$vuetify.more') + '...'"
                                ></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>

                    <v-col cols="sm" md="4" justify="center" class="px-4">
                        <!-- card for newes products on the middle -->

                        <v-card class="elevation-1 q-tour-start-card">
                            <v-tooltip top content-class open-delay="500" close-delay="500">
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        block
                                        color="primary"
                                        class="no-transform-text three-box-header no-text-transform disable-effect-button"
                                        depressed
                                        :ripple="false"
                                        @click="handleMoreNewProducts"
                                        v-on="on"
                                        v-html="$vuetify.lang.t('$vuetify.newestProducts')"
                                    ></v-btn>
                                </template>
                                <v-card>
                                    <v-card-text class="black--text" v-html="$vuetify.lang.t('$vuetify.infoForSavedNewProduct')">
                                    </v-card-text>
                                </v-card>
                            </v-tooltip>

                            <v-card-text>
                                <v-list-Item-group v-if="newProducts.length != 0">
                                    <v-list-item
                                        disabled
                                        two-line
                                        v-for="item in newProducts.slice(
                                                    0,
                                                    5
                                                )"
                                        :key="item.id"
                                    >
                                        <v-list-item-icon class="mr-2 mt-1">
                                            <v-icon v-text="'mdi-rectangle'" :large="true"></v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content
                                            @click="
                                                        handleMoreNewProducts
                                                    "
                                            :ripple="false"
                                            class="black--text"
                                        >
                                            <v-list-item-title
                                                class="body-2"
                                            >{{ item.productTitle }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-Item-group>
                                <p v-else class="text-center" v-html="$vuetify.lang.t('$vuetify.noSavedNewProduct')">
                                </p>
                            </v-card-text>

                            <v-card-actions v-if="newProducts.length >= 5">
                                <div class="flex-grow-1"></div>
                            </v-card-actions>
                        </v-card>
                    </v-col>

                    <v-col cols="sm" md="4" justify="center" class="px-4">
                        <!-- card on the right for favorites products -->

                        <v-card class="elevation-1 q-tour-start-card">
                            <v-tooltip top content-class open-delay="500" close-delay="500">
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        block
                                        color="primary"
                                        class="no-transform-text three-box-header"
                                        depressed
                                        @click="handleMoreFavourites"
                                        v-on="on"
                                        v-html="$vuetify.lang.t('$vuetify.savedProducts')"
                                    >Gemerkte Produkte</v-btn>
                                </template>
                                <v-card>
                                    <v-card-text class="black--text" v-html="$vuetify.lang.t('$vuetify.infoForSavedProduct')">
                                    </v-card-text>
                                </v-card>
                            </v-tooltip>
                            <v-card-text>
                                <v-list-Item-group v-if="favourites.length != 0">
                                    <v-list-item
                                        @click="handleMoreFavourites"
                                        two-line
                                        v-for="item in favourites.slice(
                                                    0,
                                                    5
                                                )"
                                        :key="item.id"
                                    >
                                        <v-list-item-icon class="mr-2 mt-1">
                                            <v-icon v-text="'mdi-rectangle'" :large="true"></v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title
                                                class="body-2"
                                            >{{ item.productTitle }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-Item-group>
                                <p v-else class="text-center" v-html="$vuetify.lang.t('$vuetify.noSavedProduct')">
                                </p>
                            </v-card-text>
                            <v-card-actions v-if="favourites.length >= 5">
                                <div class="flex-grow-1"></div>
                                <v-btn
                                    @click="handleMoreFavourites"
                                    text
                                    class="capitalize-text"
                                    v-html="$vuetify.lang.t('$vuetify.more') + '...'"
                                ></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';
import SearchBar from '@/components/SearchBar';
import Feedback from '@/components/Feedback';
import LoadingCircle from '@/components/LoadingCircle';
import { mapActions, mapGetters } from 'vuex';
import router from '../router';
export default {
    name: 'Products',
    components: {
        AppNavigation,
        SearchBar,
        Feedback,
        LoadingCircle
    },
    data: () => ({
        drawer: null,
        loadingStatus: false
    }),
    methods: {
        ...mapGetters([
            'getSavedSearches',
            'getNewProducts',
            'getFavourites',
            'isVisited',
            'isLoading'
        ]),
        ...mapActions([
            'saveTempSearchKey',
            'getUserData',
            'setVisited',
            'saveCurrentSearch',
            'getProductsPerKeyword'
        ]),
        handleMoreSavedSearches: function() {
            router.push({
                name: 'SavedSearchList'
            });
        },
        handleMoreNewProducts: function() {
            //should remove return when new products is ready
            return;
            router.push({
                name: 'NewProducts'
            });
        },
        handleMoreFavourites: function() {
            router.push({
                name: 'Favourites'
            });
        },
        // click search item on the search cards
        onSelectSearch: function(index) {
            let temp_item = this.savedSearches.filter(item => {
                return item.id == index;
            });
            this.saveCurrentSearch({
                search: {
                    searchName: temp_item[0].Name,
                    keyword: temp_item[0].Keyword,
                    searchId: temp_item[0].id,
                    refiner: temp_item[0].refiner
                }
            }).then(
                this.getProductsPerKeyword().then(
                    router.push({
                        name: 'ProductsWithCustomSearch'
                    })
                )
            );
        }
    },
    computed: {
        savedSearches: function() {
            return this.getSavedSearches();
        },
        newProducts: function() {
            return this.getNewProducts();
        },
        favourites: function() {
            return this.getFavourites();
        },
        checkLoading: function() {
            return this.isLoading();
        }
    },
    watch: {
        checkLoading: function(newVal) {
            if (newVal == 'loading') {
                this.loadingStatus = true;
            }
            if (newVal == 'success') {
                this.loadingStatus = false;
            }
        }
    },
    created() {
        this.getUserData();
    },
    mounted() {}
};
</script>

<style>
.quick-tour-start-whole-cont {
    background-image: url('../assets/img/Formula5.png');
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100vw 100vh;
    align-items: start !important;
    padding-top: 8vh !important;
    height: 100vh;
}

.quick-tour-start-container .v-list--two-line .v-list-item,
.v-list-item--two-line {
    min-height: 32px !important;
}

.quick-tour-start-container .three-box-header {
    height: 54px !important;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
    font-size: 1.15vw;
}

.q-tour-start-card .v-list--two-line .v-list-item .v-list-item__icon,
.v-list-item--two-line .v-list-item__icon {
    margin-bottom: 8px;
}

.q-tour-start-card .v-list-item__content {
    padding: 16px 0;
}

.q-tour-start-card .disable-effect-button:hover:before {
    opacity: 0 !important;
}
@media (min-width: 600px) {
    .three-boxes-container {
        margin-top: 4vh !important;
        padding-left: 20px;
        padding-right: 20px;
    }
    .q-tour-start-card {
        height: 400px !important;
    }
}
</style>
