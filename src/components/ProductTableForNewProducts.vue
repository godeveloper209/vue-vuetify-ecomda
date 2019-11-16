<template>
    <v-layout>

        <v-card class="elevation-4">
            <v-toolbar color="primary" dark height="54px">
                <v-spacer></v-spacer>
                <v-toolbar-title>
                  Neueste Produkte aus Ihren Suchen
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-toolbar color="white" light dense class="elevation-0">
                <v-toolbar-items class="table-control-bar d-flex" rows>
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>mdi-chart-bar</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content class="hidden-sm-and-down mt-2">
                            <v-list-item-title>Analysieren</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link disabled>
                        <v-list-item-icon>
                            <v-icon disabled>mdi-email-open-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content class="hidden-sm-and-down mt-2">
                            <v-list-item-title>Weiterleiten</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link disabled>
                        <v-list-item-icon>
                            <v-icon disabled>mdi-download</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title class="hidden-sm-and-down mt-2">Download</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <!-- <v-list-item link @click="handleRemoveFavourites">
                        <v-list-item-icon>
                            <v-icon>mdi-file</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title class="hidden-sm-and-down mt-2">Von Merkliste entfernen </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> -->
                </v-toolbar-items>
            </v-toolbar>
            <div>
                <v-card :class="'ma-4 table-no-radius ' + (withData? 'with-data':'')">
                    <v-card-title>
                        <div class="flex-grow-1"></div>
                        <v-row>
                            <v-col cols="12 ml-auto" sm="6" md="3">
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-file-search"
                                    label="Suchen"
                                    single-line
                                    hide-details
                                    class="search-box"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-title>

                    <v-data-table v-if="reqProdsStatus" item-key="name" class="elevation-1" loading loading-text="Loading... Please wait"></v-data-table>
                    <v-data-table
                        v-if="!reqProdsStatus"
                        v-model="selected"
                        :headers="headers"
                        :items="productDataFromServer"
                        item-key="id"
                        show-select
                        :single-select="false"
                        :search="search"
                        :must-sort="true"
                        :sort-by.sync="sortBy"
                        :footer-props="{
                        'items-per-page-text':'Ergebnisse pro Seite'
                        }"
                        :class="'elevation-1 product-table table-2-radius ' + (withData? 'with-data':'')"
                    ></v-data-table>
                </v-card>
            </div>
        </v-card>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'ProductTableForNewProducts',
    data() {
        return {
            search: '',
            sortBy: 'productTitle',
            selected: [],
            headers: [
                {
                    text: 'Bild',
                    align: 'left',
                    sortable: false,
                    value: 'image',
                    width: '4%'
                },
                { text: 'Produkttitel', value: 'productTitle', width: '15%' },
                {
                    text: 'Verfügbar seit',
                    value: 'availableSince',
                    width: '9%'
                },
                { text: 'Land', value: 'land', width: '6%' },
                { text: 'Kategorie', value: 'category', width: '15%' },
                { text: 'Brand', value: 'brand', width: '8%' },
                { text: 'Quelle', value: 'source', width: '6%' },
                {
                    text: 'Bestseller-Rang(aktuell)',
                    value: 'rankCurrent',
                    width: '8%'
                },
                {
                    text: 'Bestseller-Rang(vor 30 Tagen)',
                    value: 'rankPast',
                    width: '10%'
                },
                { text: 'Rating(Anzahl)', value: 'rating', width: '6%' },
                {
                    text: 'Rating(Qualität)',
                    value: 'ratingQuality',
                    width: '6%'
                },
                { text: 'Preis', value: 'price', width: '5%' }
            ],
            pagination: {
                sortBy: 'availableSince',
                descending: true,
                rowsPerPage: -1
            },
            // candFavourites: [],
            // dialog: false,
            // addedFav: [],
            // deletedFav: [],
        };
    },
    computed: {
        compSearchItem: function(){
            return this.getCurrentSearch();
        },
        productDataFromServer: function() {
            return this.getNewProducts();
        },
        reqProdsStatus: function(){
            return this.getProductsRequestStatus();
        },
        currentSearchItem: function(){
            return this.getCurrentSearch();
        },
        withData: function(){
            let temp = this.productDataFromServer;
            console.log('length', temp.length);
            if(temp.length == 0)
                return false;
            else
                return true;
        }
    },
    methods: {
        ...mapGetters([
            'getProductsData',
            'getCurrentSearch',
            'getProductsRequestStatus',
            'getNewProducts'
        ]),
        ...mapActions({ 
            loadProductsData: 'getProducts', 
            clearProductsData: 'clearProducts', 
            saveCandFavourites: 'saveCandFavourites', 
            saveFavourites: 'saveFavourites'}),
        handleRemoveFavourites: function(){
            console.log('handle save favourites');
            console.log('added nodes', this.selected);
            //actually this means ids should be removed from the watch list
            let added_ids = [];
            this.selected.map(item => {
                added_ids.push(item.id);
            });
            this.saveFavourites({
                addedProductsIds: [],
                deletedProductsIds: added_ids
            })
        }
    },
    watch:{
        candFavourites: function(newVal, oldVal){
            let _ = require('underscore');
            let union_fav = _.union(newVal, this.selected);
            let added_fav = _.difference(union_fav, this.selected);
            let temp = _.difference(newVal, added_fav);
            let deleted_fav = _.difference(this.selected, temp);
            this.addedFav = added_fav;
            this.deletedFav = deleted_fav;

        }
    },
    created() {
        // this.clearProductsData();
        // this.loadProductsData(this.currentSearchItem);
    }
};
</script>
<style>

.table-control-bar v-list-item.active{
    display: none;
}

.header-overflow {
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    max-width: 10px !important;
}
.table-no-radius{
    border: unset!important;
    box-shadow: unset!important;
    
}

.table-no-radius.with-data{
    overflow: auto;
    height: 500px;
}

.product-table .v-data-table__wrapper{
    border-radius: 12px!important;
}
.product-table thead{
    background-color: #064976;
}

.product-table thead .v-icon{
    color: #fff!important;
}
.product-table thead span{
    color: #fff!important;
}

.product-table tr > td {
    font-size: 12px !important;
}



.table-2-radius{
    border-radius: 12px!important;
}

.product-table .v-data-footer {
    border-top: none !important;
    position: absolute !important;
    left: -160px !important;
    top: 18px !important;
    z-index: 1 !important;
}

@media (min-width: 600px) {
    .product-table tr > td:nth-child(3) {
        text-overflow: ellipsis !important;
        overflow: hidden !important;
        white-space: nowrap !important;
        max-width: 10px !important;
    }
}

@media (max-width: 600px) {
    .search-box {
        margin-top: 25px;
    }

    .product-table .v-data-footer .v-data-footer__select {
        margin-right: -19px;
    }

    .product-table .v-data-footer .v-data-footer__select .v-input {
        margin-right: 20px;
        margin-left: 5px !important;
    }
}
</style>