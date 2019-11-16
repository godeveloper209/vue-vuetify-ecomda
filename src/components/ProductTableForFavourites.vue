<template>
    <v-layout>

        <v-card class="elevation-4">
            <v-toolbar color="primary" dark height="54px">
                <v-spacer></v-spacer>
                <v-toolbar-title>
                  Gemerkte Produkte
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

                    <v-list-item link @click="handleRemoveFavourites">
                        <v-list-item-icon>
                            <v-icon>mdi-file-document-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title class="hidden-sm-and-down mt-2">Von Merkliste entfernen </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-toolbar-items>
            </v-toolbar>
            <div>
                <v-card :class="'mb-4 ml-4 mr-4 table-no-radius with-data' + (withData? 'with-data':'')">
                    <v-card-title class="mt-0 pt-0">
                        <div class="flex-grow-1"></div>
                        <v-row>
                            <v-col cols="12 ml-auto" sm="6" md="3" class="mt-0 pt-3 pb-1">
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Suchen"
                                    single-line
                                    hide-details
                                    class="search-box mt-0 pt-0"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-title>

                    <v-data-table v-if="reqProdsStatus" item-key="name" class="elevation-1" loading loading-text="Loading... Please wait"></v-data-table>
                    <v-data-table
                        v-if="!reqProdsStatus"
                        v-model="selected"
                        :headers="headers"
                        fixed-header
                        height="55vh"
                        :items="productDataFromServer"
                        item-key="id"
                        show-select
                        :single-select="false"
                        :search="search"
                        no-data-text="Keine neuen Produkte für diese Suchparameter verfügbar."
                        :must-sort="true"
                        :sort-by.sync="sortBy"
                        sort-desc
                        @click:row="handleClickRow"
                        :footer-props="{
                        'items-per-page-text':'Ergebnisse pro Seite',
                        'items-per-page-options': [10, 20, 50, -1]
                        }"
                        :class="'elevation-0 product-table table-2-radius with-data' + (withData? 'with-data':'')"
                    >

                        <template v-slot:item.image="{ item }">
                            <v-icon color="grey">mdi-file-document-outline</v-icon>
                        </template>
                        <template v-slot:item.productTitle="{ item }">
                            <p class="mb-0">
                                {{
                                    item.productTitle.substring(0, 80)
                                }}...
                            </p>
                        </template>

                        <template v-slot:item.availableSinceSec="{ item }">
                            <v-tooltip
                                nudge-left="20"
                                width="400"
                                max-width="400"
                                content-class="column-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <p v-on="on" class="mb-0">
                                        {{ item.availableSince }}
                                    </p>
                                </template>
                                <span
                                    >Gibt an, seit wann ein Produkt in diesem
                                    Land<br />verfügbar ist (Aktualisierung 1 x
                                    wöchentlich)</span
                                ><br />
                            </v-tooltip>
                        </template>

                        <template v-slot:item.land="{ item }">
                            <v-tooltip
                                nudge-left="40"
                                width="400"
                                max-width="400"
                                content-class="column-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <p v-on="on" class="mb-0">
                                        <span>{{
                                            item.land == 'Germany'
                                                ? 'DE'
                                                : item.land
                                        }}</span
                                        ><br />
                                    </p>
                                </template>
                                <span>
                                    Derzeit Deutschland, Großbritannien und USA
                                    <br />- weitere Länder folgen zeitnah (sprechen
                                    <br />Sie uns dazu gern an) </span
                                ><br />
                            </v-tooltip>
                        </template>

                        <template v-slot:item.category="{ item }">
                            <v-tooltip
                                nudge-left="20"
                                width="400"
                                max-width="400"
                                content-class="column-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <p v-on="on" class="mb-0">
                                        <span>{{
                                            item.category
                                        }}</span
                                        ><br />
                                    </p>
                                </template>
                                <span>
                                    
                                 Kategorie, der ein Produkt zugeordnet ist
                                </span>
                            </v-tooltip>
                        </template>
                        
                        <template v-slot:item.price="{ item }">
                            <v-tooltip
                                nudge-left="20"
                                width="400"
                                max-width="400"
                                content-class="column-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <p v-on="on" class="mb-0">
                                        <span>
                                            {{
                                                item.land == 'UK' && item.price != 'n.a.'
                                                    ? '£'
                                                    : ''
                                            }}{{
                                                item.land == 'COM' && item.price != 'n.a.'
                                                    ? '$'
                                                    : ''
                                            }}{{ item.price
                                            }}{{
                                                item.land == 'DE' && item.price != 'n.a.'
                                                    ? ' €'
                                                    : ''
                                            }}
                                        </span>
                                    </p>
                                </template>
                                <span>
                                    Ist angegeben, sofern ein Produkt zum Zeitpunkt 
                                    <br />der Identifikation lieferbar war (ansonsten 
                                    <br/>n.a. = not available / nicht verfügbar)
                                </span>
                            </v-tooltip>
                            
                        </template>
                        <template v-slot:item.saleEstimate="{ item }">
                            <v-tooltip
                                nudge-left="20"
                                width="400"
                                max-width="400"
                                content-class="column-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <p v-on="on" class="mb-0">
                                        <span>
                                            {{item.saleEstimate}}
                                        </span>
                                    </p>
                                </template>
                                <span>
                                    Ungefähre Abschätzung der Verkaufszahlen für
                                    <br /> das Produkt auf Amazon im jeweiligen Land
                                </span>
                            </v-tooltip>
                        </template>
                        <template v-slot:item.rating="{ item }">
                            <v-tooltip
                                width="400"
                                max-width="400"
                                content-class="column-tooltip"
                                left
                            >
                                <template v-slot:activator="{ on }">
                                    <p v-on="on" class="mb-0">
                                        <span>
                                            {{item.rating}}
                                        </span>
                                    </p>
                                </template>
                                <span>
                                    Die Anzahl der Bewertungen für das Produkt
                                </span>
                            </v-tooltip>
                        </template>
                        <template v-slot:item.ratingQuality="{ item }">
                            <v-tooltip
                                width="400"
                                max-width="400"
                                content-class="column-tooltip"
                                left
                            >
                                <template v-slot:activator="{ on }">
                                    <p v-on="on" class="mb-0">
                                        <span>
                                            {{item.ratingQuality}}
                                        </span>
                                    </p>
                                </template>
                                <span>
                                    Die Durchschnittsbewertung für ein
                                    <br />Produkt über alle Bewertungen hinweg
                                </span>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                </v-card>
            </div>
        </v-card>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'ProductTableForFavourites',
    data() {
        return {
            search: '',
            sortBy: 'productTitle',
            selected: [],
            headers: [
                {
                    text: (
                        <v-icon color="grey">mdi-file-document-outline</v-icon>
                    ),
                    align: 'left',
                    sortable: false,
                    value: 'image',
                    width: '3%'
                },
                { text: 'Produkttitel', value: 'productTitle', width: '22%' },
                {
                    text: (
                        <span>
                            Verfügbar
                            <br /> seit
                        </span>
                    ),
                    value: 'availableSinceSec',
                    width: '9%'
                },
                { text: 'Land', value: 'land', width: '6%' },
                { text: 'Kategorie', value: 'category', width: '17%' },
                {
                    text: (
                        <span>
                            Marke/
                            <br />
                            Hersteller
                        </span>
                    ),
                    value: 'brand',
                    width: '9%'
                },
                // { text: 'Quelle', value: 'source', width: '6%' },
                // {
                //     text: 'Bestseller-Rang(aktuell)',
                //     value: 'rankCurrent',
                //     width: '8%'
                // },
                // {
                //     text: 'Bestseller-Rang(vor 30 Tagen)',
                //     value: 'rankPast',
                //     width: '10%'
                // },
                { text: 'Preis', value: 'price', width: '7%' },
                // {
                //     text: <span>Bestseller-Rang</span>,
                //     value: 'bestSellerRankRC',
                //     width: '8%'
                // },
                {
                    text: (
                        <span>
                            Geschätzte Verkäufe
                            <br />
                            pro Monat
                        </span>
                    ),
                    value: 'saleEstimate',
                    width: '10%'
                },
                {
                    text: (
                        <span>
                            Rating
                            <br />
                            (Anzahl)
                        </span>
                    ),
                    value: 'rating',
                    width: '8%'
                },
                {
                    text: (
                        <span>
                            Rating
                            <br />
                            (Qualität)
                        </span>
                    ),
                    value: 'ratingQuality',
                    width: '10%'
                }
            ],
            pagination: {
                sortBy: 'availableSince',
                descending: true,
                rowsPerPage: -1
            },
            withData: false,
        };
    },
    computed: {
        compSearchItem: function(){
            return this.getCurrentSearch();
        },
        productDataFromServer: function() {
            return this.getFavourites();
        },
        reqProdsStatus: function(){
            return this.getProductsRequestStatus();
        },
        currentSearchItem: function(){
            return this.getCurrentSearch();
        },
    },
    watch: {
        productDataFromServer: function(newVal, oldVal){
            if(newVal.length == 0)
            {
                console.log('favourite data is empty');
                this.withData = false;

            }
                
            else{
                console.log(newVal);
                this.withData = true;
            }
        }
    },
    methods: {
        ...mapGetters([
            'getProductsData',
            'getCurrentSearch',
            'getProductsRequestStatus',
            'getFavourites'
        ]),
        ...mapActions({ 
            loadProductsData: 'getProducts', 
            clearProductsData: 'clearProducts', 
            saveFavourites: 'saveFavourites'}),
        handleRemoveFavourites: function(){
            console.log('handle save favourites');
            console.log('added nodes', this.selected);
            //actually this means ids should be removed from the watch list
            let added_ids = [];
            console.log('selected', this.selected);
            this.selected.map(item => {
                added_ids.push(item.id);
            });
            this.saveFavourites({
                addedProductsIds: [],
                deletedProductsIds: added_ids
            }).then(
                this.selected = []
            )
        },
        isFavourite: function(product){
            let arrayEqualItem = this.selected.filter(item => item.id == product.id);
            if(arrayEqualItem.length > 0)
                return true;
            else
                return false;
        },
        handleClickRow: function(item){
            let country_code = this.getCountryCode(item.land);
            console.log('country code', country_code);
            let asin = item.asin;
            let link = `https://www.amazon.`+country_code+'/dp/'+asin;
            window.open( link, "_blank");
        },
        getCountryCode: function(land) {
            switch (land) {
                case 'DE':
                    return 'de';
                case 'US':
                    return 'com';
                case 'UK':
                    return 'co.uk';
                default:
                    return 'co.uk';
            }
        },
    },


    created() {
        // this.clearProductsData();
        // this.loadProductsData(this.currentSearchItem);
    }
};
</script>
<style>
.header-overflow {
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    max-width: 10px !important;
}
.table-no-radius {
    border: unset !important;
    box-shadow: unset !important;
}

.table-no-radius.with-data {
    margin-top: -10px !important;
    overflow: auto;
}


.product-table .v-data-table__wrapper {
    border-radius: 12px !important;
}
.product-table thead {
    background-color: #064976;
}

.theme--light.v-data-table.v-data-table--fixed-header thead th {
    background-color: #064976 !important;
}

.product-table thead .v-icon {
    color: #fff !important;
}
.product-table thead span {
    color: #fff !important;
}

.product-table.v-data-table td,
.v-data-table th {
    font-size: 12px !important;
    padding: 0 4px;
}

.product-table tr > td {
    font-size: 12px !important;
}

.table-2-radius {
    border-radius: 12px !important;
}

.product-table .v-data-footer {
    border-top: none !important;
    position: absolute !important;
    left: -160px !important;
    top: 0px !important;
    z-index: 1 !important;
}
.v-input.search-box {
}

.product-title-tooltip{
    width: 400px;
    background-color: #064976!important;
    border-radius: 10px!important;
}
@media (min-width: 600px) {
    /* .product-table tr > td:nth-child(3) {
        text-overflow: ellipsis !important;
        overflow: hidden !important;
        white-space: nowrap !important;
        max-width: 10px !important;
    } */
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