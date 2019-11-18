<template>
    <v-card class="caption">
        <v-toolbar color="primary" dark flat>
            <v-spacer></v-spacer>
            <v-toolbar-title class="subtitle-1" v-html="$vuetify.lang.t('$vuetify.saveSearchCreateAlert')"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <div class="mb-1 pt-4 px-4">
            <p class="body-2 black--text" v-html="$vuetify.lang.t('$vuetify.infoForSearchName')"></p>
            <v-text-field
                v-model="searchName"
                label="Name der Suche"
                solo
                background-color="#fff"
                class="mb-1 small-input"
                :hide-details="true"
            ></v-text-field>
            <p v-if="isEmptySearchName" class="red--text" v-html="$vuetify.lang.t('$vuetify.errorEmptySearchName')"></p>
            <!-- <p class="red--text">Did you fill the search keyword in the prev step?</p> -->
            <div class="body-2 black--text mt-4 pt-4" v-html="$vuetify.lang.t('$vuetify.inforForWeelyEmailing')"></div>
            <v-radio-group v-model="row" row class="small-radio" hide-details>
                <v-radio :label="$vuetify.lang.t('$vuetify.yes')" value="rdYes"></v-radio>
                <v-radio
                    :label="$vuetify.lang.t('$vuetify.noAndOnlyNewProducts')"
                    value="rdNo"
                ></v-radio>
            </v-radio-group>
        </div>
        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" class="capitalize-text" @click="handleSaveSearch">{{$vuetify.lang.t('$vuetify.save')}}</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import router from '../router'
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'SaveSearchBox',
    data: () => ({
        searchName: '',
        row: 'rdYes',
        isEmptySearchName: false,
    }),
    computed: {
        currentSearch: function(){
            return this.getCurrentSearch();
        }
    },
    methods: {
        ...mapGetters(['getCurrentSearch']),
        ...mapActions(['saveCurrentSearch', 'getProductsForSave', 'updateSearchAndRows']),
        handleSaveSearch: function() {
            if(this.searchName == undefined || this.searchName == ''){
                this.isEmptySearchName = true;
                return;
            }

            if (this.row == 'rdYes') {
                this.saveCurrentSearch({
                    search: {
                        searchName: this.searchName,
                    }
                })
                .then(() => {
                    // this is for save search newly
                    if(this.getCurrentSearch().searchId == null){
                        this.getProductsForSave()
                        .then(
                            router.push({
                            name: 'QuickTourStart'
                            })
                        )
                    }
                    else{
                        this.updateSearchAndRows()
                        .then(
                            router.push({
                            name: 'QuickTourStart'
                            })
                        )
                    }
                    
                })
            } 
            else {
                this.saveCurrentSearch({
                    search: {
                        searchName: this.searchName,
                    }
                })
                .then(() => {
                    if(this.getCurrentSearch().searchId == null){
                        this.getProductsForSave()
                        .then(
                            router.push({
                            name: 'QuickTourStart'
                            })
                        )
                    }
                    else{
                        this.updateSearchAndRows()
                        .then(
                            router.push({
                            name: 'QuickTourStart'
                            })
                        )
                    }
                    
                })
            }
        }
    },
    watch: {
        searchName: function(newVal){
            if(newVal != '' && newVal != undefined){
                this.isEmptySearchName = false;
            }
        }
    },
    mounted() {
        if(this.getCurrentSearch().searchName != ''){
            this.searchName = this.getCurrentSearch().searchName;
        }
    }
};
</script>

<style>
.small-radio{
    margin-top: 2px!important;
    padding-top: 2px!important;
}

.small-radio i {
    font-size: 16px !important;
}
.small-radio [class*='__ripple'] {
    left: -16px !important;
}
.small-radio label {
    padding-left: 3px !important;
    font-size: 14px;
}

.small-input textarea {
    font-size: 14px !important;
}

.small-input label {
    font-size: 14px !important;
}
</style>