<template>
    <v-layout>
        <v-dialog
            v-model="alertDialog"
            persistent
            max-width="550px"
            class="quick-tour-start-container"
        >
            <v-card>
                <v-card-title class="subtitle-1"
                    >Kein Suchwort eingegeben</v-card-title
                >
                <v-card-text class="black--text">
                    Bitte geben Sie mindestens ein Suchwort ein.
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                        color="primary"
                        dark
                        @click="alertDialog = false"
                        class="capitalize-text"
                        >OK</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card class="elevation-4 custom-search">
            <v-toolbar color="primary" dark flat height="54px">
                <v-spacer></v-spacer>
                <v-toolbar-title v-html="$vuetify.lang.t('$vuetify.configureSearch')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <div class="mb-1 pa-4">
                <p v-html="$vuetify.lang.t('$vuetify.searchWordsInLocal') + ':'"></p>

                <v-textarea
                    v-model="searchKeyword"
                    @keyup.enter="handleUpdateOnly"
                    ref="inputKeyword"
                    label="Suchwort"
                    solo
                    background-color="#fff"
                    class="mb-1 small-input"
                    rows="2"
                    hide-details
                ></v-textarea>
                <v-radio-group
                    v-model="compSearchItem.refiner"
                    row
                    class="small-radio pl-2"
                    ref="inputBinSearch"
                >
                    <v-radio :label="$vuetify.lang.t('$vuetify.andAllWords')" value="AND"></v-radio>
                    <v-radio
                        :label="$vuetify.lang.t('$vuetify.orOneOfWords')"
                        value="OR"
                    ></v-radio>
                    <v-radio
                        disabled
                        :label="Erweitert"
                        value="EXT"
                        v-if="false"
                    ></v-radio>
                </v-radio-group>

                <v-btn
                    color="primary"
                    block
                    class="no-transform-text search-control-button"
                    @click="handleUpdateOnly"
                    v-html="$vuetify.lang.t('$vuetify.updateResults')"
                    >
                </v-btn>
                <v-btn
                    color="primary mt-2"
                    block
                    class="no-transform-text search-control-button"
                    @click="handleSaveSearchAndRows"
                    v-html="$vuetify.lang.t('$vuetify.saveSearchCreateAlert')"
                    >
                </v-btn>

                <v-expansion-panels class="mt-4">
                    <v-expansion-panel>
                        <v-expansion-panel-header
                            v-slot="{ open }"
                            class="acc-header-grey"
                        >
                            <v-row no-gutters>
                                <v-col cols="12"><span v-html="$vuetify.lang.t('$vuetify.land')" ></span></v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="land-check-box">
                            <v-radio-group
                                v-model="land"
                                class="small-radio"
                                hide-details
                            >
                                <v-row class="caption mt-4">
                                    <v-col
                                        cols="12"
                                        md="4"
                                        class="continent-label"
                                    >
                                        <span class="body-2" v-html="$vuetify.lang.t('$vuetify.europe') + ':'"></span>
                                    </v-col>
                                    <v-col cols="12" md="8" class="pb-0">
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.germany')"
                                            value="rdDE"
                                            hide-details
                                        ></v-radio>
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.greatBritain')"
                                            value="rdUK"
                                            hide-details
                                        ></v-radio>
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.france')"
                                            value=""
                                            hide-details
                                            disabled
                                        ></v-radio>
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.italy')"
                                            value=""
                                            hide-details
                                            disabled
                                        ></v-radio>
                                        <v-radio
                                            label="Spanien"
                                            value=""
                                            hide-details
                                            disabled
                                        ></v-radio>
                                    </v-col>
                                </v-row>

                                <v-row class="caption mt-0">
                                    <v-col
                                        cols="12"
                                        md="4"
                                        class="pt-0 continent-label"
                                    >
                                        <span class="body-2" v-html="$vuetify.lang.t('$vuetify.america') + ':'"></span>
                                    </v-col>
                                    <v-col cols="12" md="8" class="pt-0 pb-0">
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.usa')"
                                            value="rdUSA"
                                            hide-details
                                        ></v-radio>
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.brazil')"
                                            value=""
                                            hide-details
                                            disabled
                                        ></v-radio>
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.canada')"
                                            value=""
                                            hide-details
                                            disabled
                                        ></v-radio>
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.mexico')"
                                            value=""
                                            hide-details
                                            disabled
                                        ></v-radio>
                                    </v-col>
                                </v-row>
                                <v-row class="caption">
                                    <v-col
                                        cols="12"
                                        md="4"
                                        class="pt-0 pb-0 continent-label"
                                    >
                                        <span class="body-2"
                                        v-html="$vuetify.lang.t('$vuetify.asiaPacific') + ':'"
                                            ></span
                                        >
                                    </v-col>
                                    <v-col cols="12" md="8" class="pt-0 pb-1">
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.australia')"
                                            value=""
                                            hide-details
                                            disabled
                                        ></v-radio>
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.china')"
                                            value=""
                                            hide-details
                                            disabled
                                        ></v-radio>
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.india')"
                                            value=""
                                            hide-details
                                            disabled
                                        ></v-radio>
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.japan')"
                                            value=""
                                            hide-details
                                            disabled
                                        ></v-radio>
                                    </v-col>
                                </v-row>
                            </v-radio-group>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header
                            v-slot="{ open }"
                            class="acc-header-grey"
                        >
                            <v-row no-gutters>
                                <v-col cols="12"><span v-html="$vuetify.lang.t('$vuetify.category')" ></span></v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content v-if="!hideCategory">
                            <v-treeview
                                v-model="selectedCategories"
                                :items="categoryMock"
                                :dense="false"
                                :selectable="true"
                                :activatable="true"
                                :open-on-click="true"
                                :selected-color="'accent'"
                                :color="'primary'"
                                :selection-type="selectionType"
                                ref="tvForCategory"
                                class="category-tree"
                            ></v-treeview>
                        </v-expansion-panel-content>
                        <v-expansion-panel-content v-else>
                            <p class="mt-4 body-2">
                                Für das gewählte Land ist eine Kategoriesuche
                                derzeit noch nicht möglich.
                            </p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header
                            v-slot="{ open }"
                            class="acc-header-grey"
                        >
                            <v-row no-gutters>
                                <v-col cols="12"><span v-html="$vuetify.lang.t('$vuetify.brandManufacture')"></span></v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row
                                justify="space-around"
                                no-gutters
                                class="mt-2"
                            >
                                <v-autocomplete
                                    v-model="brands"
                                    :items="brandsOptions"
                                    :loading="loadingBrands"
                                    :search-input.sync="watchBrands"
                                    hide-no-data
                                    item-text="name"
                                    item-value="name"
                                    prepend-icon=""
                                    append-icon=""
                                    placeholder="Marke/Hersteller"
                                    clearable
                                    return-object
                                    multiple
                                    ref="autoComForBrand"
                                >
                                    <template v-slot:selection="data">
                                        <v-chip
                                            v-bind="data.attrs"
                                            :input-value="data.selected"
                                            close
                                            @click="data.select"
                                            @click:close="remove(data.item)"
                                            >{{ data.item.name }}</v-chip
                                        >
                                    </template>
                                    <template v-slot:item="data">
                                        <template
                                            v-if="typeof data.item !== 'object'"
                                        >
                                            <v-list-item-content
                                                v-text="data.item"
                                            ></v-list-item-content>
                                        </template>
                                        <template v-else>
                                            <v-list-item-content>
                                                <v-list-item-title
                                                    v-html="data.item.name"
                                                ></v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header
                            v-slot="{ open }"
                            class="acc-header-grey"
                        >
                            <v-row no-gutters>
                                <v-col cols="12"><span v-html="$vuetify.lang.t('$vuetify.availableSince')"></span></v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row justify="space-around" no-gutters>
                                <v-col cols="12">
                                    <v-radio-group
                                        v-model="fromDate"
                                        class="small-radio mt-4"
                                        hide-details
                                    >
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.lastThirtyDays')"
                                            value="rdThDate"
                                            hide-details
                                        ></v-radio>
                                        <v-radio
                                            :label="$vuetify.lang.t('$vuetify.lastNinetyDays')"
                                            value="rdNiDate"
                                            hide-details
                                        ></v-radio>
                                    </v-radio-group>
                                    <v-menu
                                        ref="startMenu"
                                        :close-on-content-click="false"
                                        :return-value.sync="dateForSearch"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="dateForSearch"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date"
                                            no-title
                                            scrollable
                                        >
                                            <div class="flex-grow-1"></div>
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="
                                                    $refs.startMenu.isActive = false
                                                "
                                                >Abbrechen</v-btn
                                            >
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="
                                                    $refs.startMenu.save(date)
                                                "
                                                >OK</v-btn
                                            >
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <v-btn
                    color="primary"
                    block
                    class="no-transform-text search-control-button mt-4"
                    @click="handleUpdateOnly"
                    v-html="$vuetify.lang.t('$vuetify.updateResults')"
                    >
                </v-btn>
            </div>
        </v-card>
    </v-layout>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import router from '../router';
import debounce from 'debounce';
import { dateMixin } from './mixins/index';
import {
    CATEGORY_TREE_MOCK_FOR_DE,
    CATEGORY_TREE_MOCK_FOR_USA,
    CATEGORY_TREE_MOCK_FOR_UK,
    CATE
} from '../constants/category';
export default {
    name: 'CustomSearchBox',
    props: {},
    mixins: [dateMixin],
    data() {
        return {
            searchKeyword: this.compSearchKeyword,
            binSearch: 'rdOR',
            land: '',
            hideCategory: false,
            date: null,
            dateForSearch: null,
            autoUpdate: true,
            isUpdating: false,
            candSelectedCategories: [],
            candBrands: [],
            watchBrands: '',
            selectionType: 'leaf',
            categoryMock: [],
            fromDate: 'rdThDate',
            temp_index: 0,
            mockArrayForRemove: [],
            alertDialog: false,
            searchKeyword: '',
            currentSearch: null
        };
    },
    computed: {
        // get all search figures from the store
        compSearchItem: function() {
            return this.getCurrentSearch();
        },
        loadingBrands: function() {
            return this.getLoadingBrandStatus();
        },
        brands: {
            get: function() {
                return this.getSelectedBrands();
            },
            set: function(newVal) {
                this.candBrands = newVal;
                this.saveSelectedBrands(this.brandsList).then(
                    this.setBrand(this.getSelectedBrands())
                );
            }
        },
        //get all candidate brands
        brandsOptions: {
            get: function() {
                return this.getBrands();
            },
            set: function() {
                return;
            }
        },
        //get saved categories and set current selected categories
        selectedCategories: {
            get: function() {
                return this.getSelectedCategories();
            },
            set: function(newVal) {
                this.candSelectedCategories = newVal;
            }
        },
        // add brands in the brand search list
        brandsList: function() {
            let brand_list = [];
            let brandsItems = this.candBrands;
            if (
                brandsItems == null ||
                brandsItems == undefined ||
                brandsItems.length == 0
            )
                return [];
            brandsItems.map(item => {
                brand_list.push(item);
            });
            return brand_list;
        },

        //set search Date as 30 days ago when date is null , null means initial search
        dateFromServer: function(){
            if (this.getDateForSearch() == null || this.getDateForSearch()=='' || this.getDateForSearch()=='0000-00-00'){
                this.fromDate = 'rdThDate';
                let currentDate = new Date();
                this.dateForSearch = this.getISODateFormat(currentDate.setDate(currentDate.getDate() - 30));
            }
            return this.getDateForSearch();
        }
    },
    watch: {
        isUpdating(val) {
            if (val) {
                setTimeout(() => (this.isUpdating = false), 3000);
            }
        },
        //trigger search brands event when over 3 characters inputed
        watchBrands(value) {
            if (!value || value.length < 3) {
                return;
            }
            debounce(this.searchBrands, 200)(value, this);
        },
        //set categories according to land
        land: function(newVal, oldVal) {
            if (newVal === 'rdDE') {
                let temp_category = CATEGORY_TREE_MOCK_FOR_DE;
                if (temp_category && temp_category.length == 0) {
                    this.hideCategory = true;
                    this.categoryMock = [];
                } else {
                    this.hideCategory = false;
                    let category_array = this.processCategory(temp_category);
                    this.categoryMock = category_array;
                }
            }

            if (newVal === 'rdUSA') {
                let temp_category = CATEGORY_TREE_MOCK_FOR_USA;
                if (temp_category.length == 0) {
                    this.hideCategory = true;
                    this.categoryMock = [];
                } else {
                    this.hideCategory = false;
                    let category_array = this.processCategory(temp_category);
                    this.categoryMock = category_array;
                }
            }

            if (newVal === 'rdUK') {
                let temp_category = CATEGORY_TREE_MOCK_FOR_UK;
                if (temp_category.length == 0) {
                    this.hideCategory = true;
                    this.categoryMock = [];
                } else {
                    this.hideCategory = false;
                    let category_array = this.processCategory(temp_category);
                    this.categoryMock = category_array;
                }
            }
        },
        //set search Date range according to date options 30 days ago, 90 days ago
        fromDate: function(newVal, oldVal) {
            let currentDate = new Date();
            if (newVal == 'rdThDate') {
                this.dateForSearch = this.getISODateFormat(
                    currentDate.setDate(currentDate.getDate() - 30)
                );
            } else if (newVal == 'rdNiDate') {
                this.dateForSearch = this.getISODateFormat(
                    currentDate.setDate(currentDate.getDate() - 90)
                );
            }
        },

        currentSearch: function(newVal) {
            this.searchKeyword = newVal.keyword;
        },

        dateFromServer: function(newVal){
            if (newVal == null || newVal=='' || newVal=='0000-00-00'){
                this.fromDate = 'rdThDate';
                let currentDate = new Date();
                this.dateForSearch = this.getISODateFormat(currentDate.setDate(currentDate.getDate() - 30));
            }
            else{
                this.dateForSearch = newVal;
                this.fromDate = null;
            }
        }
    },
    methods: {
        ...mapGetters([
            'getCurrentSearch',
            'getLoadingBrandStatus',
            'getBrands',
            'getSelectedBrands',
            'getSelectedCategories',
            'getLand',
            'getDateForSearch'
        ]),
        ...mapActions([
            'saveCurrentSearch',
            'saveSearchAndRows',
            'getProductsForNotSave',
            'getBrandsApi',
            'saveSelectedBrands',
            'saveSelectedCategories',
            'saveSelectedPAndCCategories',
            'setBrand',
            'setLand',
            'setDateForSearch'
        ]),
        //remove brands when click X on a chip
        remove(selectedItem) {
            let indexOfItem = null;
            this.brands.map((brandItem, index) => {
                if (brandItem.name == selectedItem.name) {
                    indexOfItem = index;
                }
            });
            if (indexOfItem >= 0) this.brands.splice(indexOfItem, 1);
        },
        // save current search 
        handleSaveSearchAndRows: function() {
            if (
                (this.$refs.inputKeyword.value == '' ||
                this.$refs.inputKeyword.value == undefined ||
                this.$refs.inputKeyword.value == ' ' ||
                this.$refs.inputKeyword.value == ' \n' ||
                this.$refs.inputKeyword.value == '\n')
            ) {
                this.alertDialog = true;
                this.searchKeyword = '';
                return;
            }
            this.searchKeyword = this.searchKeyword.replace(/\n$/, '');
            this.setDateForSearch(this.dateForSearch).then(
                this.setLand(this.getCountryName(this.land)).then(
                    this.saveCurrentSearch({
                        search: {
                            keyword: this.searchKeyword,
                            refiner: this.$refs.inputBinSearch.value
                        }
                    }).then(
                        this.saveSelectedCategories(this.candSelectedCategories)
                            .then(() => {
                                router.push({ name: 'SaveSearch' });
                            })
                    )
                )
            );
        },
        // search products only
        handleUpdateOnly: function() {
            if (
                (this.$refs.inputKeyword.value == '' ||
                this.$refs.inputKeyword.value == undefined ||
                this.$refs.inputKeyword.value == ' ' ||
                this.$refs.inputKeyword.value == ' \n' ||
                this.$refs.inputKeyword.value == '\n') 
                 && 
                (this.candSelectedCategories == null || 
                this.candSelectedCategories.length == 0)
                 && 
                (this.getSelectedBrands() == null || 
                this.getSelectedBrands().length == 0
                )
            ) {
                this.alertDialog = true;
                this.searchKeyword = '';
                return;
            }
            this.searchKeyword = this.searchKeyword.replace(/\n$/, '');

            this.setDateForSearch(this.dateForSearch).then(
                this.setLand(this.getCountryName(this.land)).then(
                    this.saveCurrentSearch({
                        search: {
                            keyword: this.searchKeyword,
                            refiner: this.$refs.inputBinSearch.value
                        }
                    }).then(
                        this.saveSelectedCategories(this.candSelectedCategories)
                            .then(this.getProductsForNotSave())
                    )
                )
            );
        },
        // convert json for categories tree
        processCategory(payload) {
            let category_array = [];
            payload.map((item, index) => {
                var temp_item = {};
                temp_item['id'] = item.catId;
                temp_item['name'] = item.text;
                if (item.nodes != undefined) {
                    temp_item['children'] = this.processCategory(item.nodes);
                }
                category_array.push(temp_item);
            });
            return category_array;
        },
        
        //remove repeated category, used only once for saving constant
        removeRepeatedCategory(payload) {
            let category_array = [];
            payload.map((item, index) => {
                var temp_item = {};
                temp_item['text'] = item.text;
                temp_item['catId'] = item.catId;

                if (
                    this.mockArrayForRemove.find(removeitem => {
                        return removeitem['catId'] == temp_item['catId'];
                    }) == undefined
                ) {
                    this.mockArrayForRemove.push(temp_item);
                    if (item.nodes != undefined) {
                        temp_item['nodes'] = this.removeRepeatedCategory(
                            item.nodes
                        );
                    }
                    category_array.push(temp_item);
                }
            });

            return category_array;
        },
        // trigger search brands
        searchBrands: async (value, self) => {
            if (!value) {
                self.brandsOptions = [];
                self.brands = [];
            }
            if (self.loadingBrands) {
                return;
            }
            self.loadingBrands = true;
            self.getBrandsApi(value).then(() => {
                self.brandsOptions = self.getBrands();
            });
        },
        //get Country Code according to option for Land
        getCountryName: function(land) {
            switch (land) {
                case 'rdDE':
                    return 'DE';
                case 'rdUSA':
                    return 'US';
                case 'rdUK':
                    return 'UK';
                default:
                    return 'DE';
            }
        },
        //set radio options for land according to saved search
        getRadioCoutryName: function(land) {
            switch (land) {
                case 'DE':
                    return 'rdDE';
                case 'US':
                    return 'rdUSA';
                case 'UK':
                    return 'rdUK';
                default:
                    return 'rdDE';
            }
        },
        // set categoriesa according to saved search
        getSelectedPAndCCategories() {
            if (this.$refs.tvForCategory && this.$refs.tvForCategory.nodes) {
                let category_nodes = this.$refs.tvForCategory.nodes;
                let _ = require('underscore');
                let temp_category_array = [];

                _.mapObject(category_nodes, function(val, key) {
                    if (val.isSelected || val.isIndeterminate) {
                        temp_category_array.push(val.item);
                    }
                });
                return temp_category_array.map(item => item.origin_index);
            } else return [];

        }
    },
    mounted() {
        this.candBrands = this.getSelectedBrands();
        this.land = this.getRadioCoutryName(this.getLand());
        this.currentSearch = this.getCurrentSearch();
    }
};
</script>

<style>
.custom-search .small-radio i {
    font-size: 20px !important;
}
.custom-search .small-radio [class*='__ripple'] {
    top: -7px;
    left: -9px !important;
    width: 24px !important;
    height: 24px !important;
}
.custom-search .small-radio label {
    padding-left: 3px !important;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.87) !important;
}

.custom-search .small-radio .v-radio--is-disabled label {
    color: rgba(0, 0, 0, 0.38) !important;
}

.custom-search .continent-label {
    margin-top: 1px !important;
}
.land-check-box .v-radio {
    margin-right: 0px !important;
    margin-bottom: 4px !important;
}

.land-check-box .v-radio [class*='__ripple'] {
    left: -9px !important;
}

.land-check-box .v-input {
    margin-top: 0px !important;
    padding-top: 0px !important;
}
.land-check-box .v-input__control {
    width: 100% !important;
}
.land-check-box i {
    font-size: 16px !important;
}
.land-check-box [class*='__ripple'] {
    left: -16px !important;
}
.land-check-box label {
    padding-left: 0px !important;
    margin-left: -8px !important;
    font-size: 12px;
}

.land-check-box .accent--text {
    color: #95989a !important;
    caret-color: #95989a !important;
}

.small-input textarea {
    font-size: 14px !important;
}

.small-input label {
    font-size: 14px !important;
}

.acc-header-grey {
    background-color: #7d7d7d;
    color: #fff;
    font-size: 1.1vw;
    font-weight: bold;
}

.search-control-button {
    font-size: 1vw !important;
    letter-spacing: 0.5px !important;
}

.v-data-table-header .v-data-table__checkbox.v-simple-checkbox {
    display: none;
}

.category-tree .v-treeview-node .v-treeview-node__root {
    min-height: 36px !important;
}

.category-tree .v-treeview-node .v-treeview-node__checkbox {
    font-size: 18px !important;
}

.category-tree .v-treeview-node .v-treeview-node__content {
    font-size: 14px !important;
}
</style>