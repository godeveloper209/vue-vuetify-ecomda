<template>
    <v-layout>
        <v-dialog
            v-model="resultDialog"
            persistent
            max-width="550px"
            class="quick-tour-start-container"
        >
            <v-card>
                <v-card-title
                    class="subtitle-1"
                    v-html="$vuetify.lang.t('$vuetify.moreThanThousand')"
                ></v-card-title>
                <v-card-text
                    class="black--text"
                    v-html="$vuetify.lang.t('$vuetify.infoMoreThanThousand')"
                ></v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                        color="primary"
                        dark
                        @click="resultDialog = false"
                        class="capitalize-text"
                    >OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card class="elevation-4" width="100%">
            <v-toolbar color="primary" dark height="54px">
                <v-spacer></v-spacer>
                <v-toolbar-title v-html="$vuetify.lang.t('$vuetify.searchResult')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-toolbar color="white" light dense class="elevation-0">
                <v-toolbar-items class="table-control-bar d-flex" rows>
                    <v-list-item link disabled>
                        <v-list-item-icon>
                            <v-icon disabled>mdi-chart-bar</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content class="hidden-sm-and-down mt-2">
                            <v-list-item-title v-html="$vuetify.lang.t('$vuetify.anylize')"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link disabled>
                        <v-list-item-icon>
                            <v-icon disabled>mdi-email-open-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content class="hidden-sm-and-down mt-2">
                            <v-list-item-title v-html="$vuetify.lang.t('$vuetify.forward')"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link disabled>
                        <v-list-item-icon>
                            <v-icon disabled>mdi-download</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                class="hidden-sm-and-down mt-2"
                                v-html="$vuetify.lang.t('$vuetify.download')"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link @click="handleSaveFavourites">
                        <v-list-item-icon>
                            <v-icon>mdi-file-document-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                class="hidden-sm-and-down mt-2"
                                v-html="$vuetify.lang.t('$vuetify.saveForLater')"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-toolbar-items>
            </v-toolbar>
            <div>
                <v-card
                    :class="
                        'mb-4 ml-4 mr-4 table-no-radius ' +
                            (withData ? 'with-data' : '')
                    "
                >
                    <v-card-title class="mt-0 pt-0">
                        <div class="flex-grow-1"></div>
                        <v-row>
                            <v-col cols="12 ml-auto" sm="6" md="3" class="mt-0 pt-3 pb-1">
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    :label="$vuetify.lang.t('$vuetify.search')"
                                    single-line
                                    hide-details
                                    class="search-box mt-0 pt-0"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-data-table
                        v-if="reqProdsStatus"
                        item-key="name"
                        class="elevation-1"
                        loading
                        loading-text="Loading... Please wait"
                    ></v-data-table>
                    <v-data-table
                        v-if="!reqProdsStatus"
                        v-model="selected"
                        ref="refProductTable"
                        :headers="headers"
                        fixed-header
                        :items="productDataFromServer"
                        item-key="id"
                        :height="withData ? '60vh' : '15vh'"
                        show-select
                        :single-select="false"
                        :search="search"
                        :no-data-text="$vuetify.lang.t('$vuetify.noNewProducts')"
                        :must-sort="true"
                        :sort-by.sync="sortBy"
                        sort-desc
                        @click:row="handleClickRow"
                        :footer-props="{
                            'items-per-page-text': 'Ergebnisse pro Seite',
                            'items-per-page-options': [10, 20, 50, -1]
                        }"
                        :class="
                            'elevation-0 product-table table-2-radius with-data'
                        "
                    >
                        <template v-slot:header.productTitle=" headers ">
                            <span v-html="$vuetify.lang.t('$vuetify.productTitle')"></span>
                        </template>
                        <template v-slot:header.availableSinceSec=" headers ">
                            <v-tooltip
                                nudge-right="10"
                                width="400"
                                max-width="400"
                                content-class="header-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <span
                                        v-on="on"
                                        v-html="$vuetify.lang.t('$vuetify.availableSinceForTable')"
                                    ></span>
                                </template>
                                <span>
                                    Gibt an, seit wann ein Produkt in diesem
                                    Land
                                    <br />verfügbar ist (Aktualisierung 1 x
                                    wöchentlich)
                                </span>
                                <br />
                            </v-tooltip>
                        </template>

                        <template v-slot:header.land=" headers ">
                            <v-tooltip
                                nudge-right="10"
                                width="400"
                                max-width="400"
                                content-class="header-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <span v-on="on" v-html="$vuetify.lang.t('$vuetify.land')"></span>
                                </template>
                                <span>
                                    Derzeit Deutschland, Großbritannien und USA
                                    <br />- weitere Länder folgen zeitnah (sprechen
                                    <br />Sie uns dazu gern an)
                                </span>
                                <br />
                            </v-tooltip>
                        </template>

                        <template v-slot:header.category=" headers ">
                            <v-tooltip
                                nudge-right="10"
                                width="400"
                                max-width="400"
                                content-class="header-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <span v-on="on" v-html="$vuetify.lang.t('$vuetify.category')"></span>
                                </template>
                                <span>Kategorie, der ein Produkt zugeordnet ist</span>
                                <br />
                            </v-tooltip>
                        </template>

                        <template v-slot:header.brand=" headers ">
                            <v-tooltip
                                nudge-right="10"
                                width="400"
                                max-width="400"
                                content-class="header-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <span v-on="on" v-html="$vuetify.lang.t('$vuetify.brandManufactureForTable')"></span>
                                </template>
                                <span>Kategorie, der ein Produkt zugeordnet ist</span>
                                <br />
                            </v-tooltip>
                        </template>

                        <template v-slot:header.price=" headers ">
                            <v-tooltip
                                nudge-left="20"
                                width="400"
                                max-width="400"
                                content-class="column-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <span v-on="on" v-html="$vuetify.lang.t('$vuetify.price')"></span>
                                </template>
                                <span>
                                    Ist angegeben, sofern ein Produkt zum Zeitpunkt
                                    <br />der Identifikation lieferbar war (ansonsten
                                    <br />n.a. = not available / nicht verfügbar)
                                </span>
                            </v-tooltip>
                        </template>

                        <template v-slot:header.saleEstimate=" headers ">
                            <v-tooltip
                                nudge-left="20"
                                width="400"
                                max-width="400"
                                content-class="header-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <span
                                        v-on="on"
                                        v-html="$vuetify.lang.t('$vuetify.estimatedMonthlySales')"
                                    ></span>
                                </template>
                                <span>
                                    Ungefähre Abschätzung der Verkaufszahlen für
                                    <br />das Produkt auf Amazon im jeweiligen Land
                                </span>
                            </v-tooltip>
                        </template>
                        <template v-slot:header.rating=" headers ">
                            <v-tooltip
                                nudge-left="20"
                                width="400"
                                max-width="400"
                                content-class="header-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <span
                                        v-on="on"
                                        v-html="$vuetify.lang.t('$vuetify.ratingNumber')"
                                    ></span>
                                </template>
                                <span>Die Anzahl der Bewertungen für das Produkt</span>
                            </v-tooltip>
                        </template>
                        <template v-slot:header.ratingQuality=" headers ">
                            <v-tooltip
                                nudge-left="20"
                                width="400"
                                max-width="400"
                                content-class="header-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <span
                                        v-on="on"
                                        v-html="$vuetify.lang.t('$vuetify.ratingQuality')"
                                    ></span>
                                </template>
                                <span>
                                    Die Durchschnittsbewertung für ein
                                    <br />Produkt über alle Bewertungen hinweg
                                </span>
                            </v-tooltip>
                        </template>

                        <template v-slot:item.image="{ item }">
                            <v-icon
                                color="grey darken-1"
                                v-if="isFavourite(item)"
                            >mdi-file-document-outline</v-icon>
                        </template>
                        <template v-slot:item.productTitle="{ item }">
                            <v-tooltip
                                nudge-left="40"
                                width="400"
                                max-width="400"
                                content-class="column-tooltip"
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <p v-on="on" class="mb-0">
                                        {{
                                        item.productTitle.substring(0, 80)
                                        }}...
                                    </p>
                                </template>
                                <span
                                    v-html="
                                        addMarkWord(
                                            item.productTitle,
                                            currentSearch.keyword
                                        )
                                    "
                                ></span>
                            </v-tooltip>
                        </template>

                        <template v-slot:item.availableSinceSec="{ item }">
                            <p class="mb-0">{{ item.availableSince }}</p>
                        </template>

                        <template v-slot:item.land="{ item }">
                            <p class="mb-0">
                                <span>
                                    {{
                                    item.land == 'Germany'
                                    ? 'DE'
                                    : item.land
                                    }}
                                </span>
                                <br />
                            </p>
                        </template>

                        <template v-slot:item.category="{ item }">
                            <p class="mb-0">
                                <span>
                                    {{
                                    item.category
                                    }}
                                </span>
                                <br />
                            </p>
                        </template>

                        <template v-slot:item.price="{ item }">
                            <p class="mb-0">
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
                        <template v-slot:item.saleEstimate="{ item }">
                            <span>{{item.saleEstimate}}</span>
                        </template>
                        <template v-slot:item.rating="{ item }">
                            <p class="mb-0">
                                <span>{{item.rating}}</span>
                            </p>
                        </template>
                        <template v-slot:item.ratingQuality="{ item }">
                            <p class="mb-0">
                                <span>{{item.ratingQuality}}</span>
                            </p>
                        </template>
                    </v-data-table>
                </v-card>
            </div>
        </v-card>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { tableMixin } from './mixins';
export default {
    name: 'ProductTable',
    mixins: [tableMixin],

    data() {
        return {
            search: '',
            sortBy: 'availableSinceSec',
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
                { text: '', value: 'productTitle', width: '22%' },
                {
                    text: '',
                    value: 'availableSinceSec',
                    width: '9%'
                },
                { text: '', value: 'land', width: '7%' },
                { text: '', value: 'category', width: '17%' },
                {
                    text: '',
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
                { text: '', value: 'price', width: '7%' },
                // {
                //     text: <span>Bestseller-Rang</span>,
                //     value: 'bestSellerRankRC',
                //     width: '8%'
                // },
                {
                    text: '',
                    value: 'saleEstimate',
                    width: '10%'
                },
                {
                    text: '',
                    value: 'rating',
                    width: '8%'
                },
                {
                    text: '',
                    value: 'ratingQuality',
                    width: '9%'
                }
            ],
            pagination: {
                sortBy: 'availableSince',
                descending: true,
                rowsPerPage: -1
            },
            candFavourites: [],
            originFavourites: [],
            dialog: false,
            addedFav: [],
            deletedFav: [],
            resultDialog: 0,
            withData: false
        };
    },
    computed: {
        currentSearch: function() {
            return this.getCurrentSearch();
        },
        productDataFromServer: function() {
            return this.getProductsData();
        },
        reqProdsStatus: function() {
            return this.getProductsRequestStatus();
        },
        selected: {
            get: function() {
                return [];
            },
            set: function(newVal) {
                this.candFavourites = newVal;
            }
        }
    },
    methods: {
        ...mapGetters([
            'getProductsData',
            'getCurrentSearch',
            'getProductsRequestStatus',
            'getCurrentFavourites',
            'getNumberOfProducts'
        ]),
        ...mapActions({
            loadProductsData: 'getProducts',
            clearProductsData: 'clearProducts',
            saveCandFavourites: 'saveCandFavourites',
            saveFavourites: 'saveFavourites'
        }),

        // save favourites
        handleSaveFavourites: function() {
            let added_ids = [];
            this.addedFav.map(item => {
                added_ids.push(item.id);
            });
            let deleted_ids = [];
            this.deletedFav.map(item => {
                deleted_ids.push(item.id);
            });

            //save added and deleted product ids
            this.saveFavourites({
                addedProductsIds: added_ids,
                deletedProductsIds: []
            }).then(() => {
                this.$refs.refProductTable.toggleSelectAll();
            });
        },
        //check if product is favourite or not for favourite icon
        isFavourite: function(product) {
            let arrayEqualItem = this.originFavourites.filter(
                item => item.id == product.id
            );
            if (arrayEqualItem.length > 0) return true;
            else return false;
        },
        //oepn amazon tabs according to selected product
        handleClickRow: function(item) {
            let country_code = this.getCountryCode(item.land);
            let asin = item.asin;
            let link = `https://www.amazon.` + country_code + '/dp/' + asin;
            window.open(link, '_blank');
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
        }
    },
    watch: {
        // set added and deleted favorite products
        candFavourites: function(newVal, oldVal) {
            let _ = require('underscore');
            let union_fav = _.union(newVal, this.originFavourites);
            let added_fav = _.difference(union_fav, this.originFavourites);
            let temp = _.difference(newVal, added_fav);
            let deleted_fav = _.difference(this.originFavourites, temp);
            this.addedFav = added_fav;
            this.deletedFav = deleted_fav;
        },
        // show dialog according to number of products
        productDataFromServer: function(newVal) {
            if (this.getNumberOfProducts() > 1000) {
                this.resultDialog = true;
            }
            if (newVal.length == 0) this.withData = false;
            else if (newVal.length) this.withData = true;
        }
    },
    created() {},
    mounted() {
        this.candFavourites = this.getCurrentFavourites();
        this.originFavourites = this.getCurrentFavourites();
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
    left: -175px !important;
    top: 0px !important;
    z-index: 1 !important;
}
.v-input.search-box {
}

.column-tooltip {
    background-color: #064976 !important;
    border-radius: 10px !important;
}

.header-tooltip {
    background-color: #7e8386 !important;
    border-radius: 10px !important;
}
.description-section {
    border-top: #aaa solid 2px;
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