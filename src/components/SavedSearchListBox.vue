<template>
    <v-card class="mx-auto">
        <v-toolbar color="primary" dark flat>
            <v-spacer></v-spacer>
            <v-toolbar-title class="subtitle-1" v-html="$vuetify.lang.t('$vuetify.savedSearches')"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line subheader class="saved-searches-list-container">
            <v-list-item-group>
                <v-list-item v-for="(item) in savedSearches" :key="item.id" two-line >
                    <v-list-item-content @click="customSearch(item.id)">
                        <v-list-item-title class="body-2">{{item.Name}}</v-list-item-title>
                        <v-list-item-subtitle class="caption">{{item.updatedOn}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon @click="deleteSearchResult(item.id)">
                            <v-icon :color="'primary'">mdi-close-circle-outline</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item v-if="savedSearches == null || savedSearches.length == 0" two-line>
                    <v-list-item-content>
                        <v-list-item-title class="body-2">Sie haben bisher noch keine Suchen angelegt.</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>
<script>
import router from '../router';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'SavedSearchListBox',
    data: () => ({
        deletedItem: {
            index: null,
            item: null,
        },
        updatedMessage: ''
    }),
    computed:{
        savedSearches: function(){
            console.log('this is savedSearches on savedSearchlistbox', this.getSavedSearches());
            return this.getSavedSearches();
        }
    },
    methods: {
        ...mapGetters(['getSavedSearches',]),
        ...mapActions(['deleteSavedSearches', 'saveSearch', 'saveCurrentSearch', 'getProductsPerKeyword']),
        deleteSearchResult: function(index) {
            this.deletedItem.index = index;
            let temp_item = this.savedSearches.filter(item => {
                return item.id == index;
            });
            this.deletedItem.item = temp_item[0];
            console.log("this is deleted ITEM: ", this.deletedItem);

            this.deleteSavedSearches(index).
            then(() => {
                console.log('delete is finished')
            });
        },

        customSearch: function(index) {
            let temp_item = this.savedSearches.filter(item => {
                return item.id == index;
            });
            this.saveCurrentSearch({
                search: {
                    searchName: temp_item[0].Name,
                    keyword: temp_item[0].Keyword,
                    searchId: temp_item[0].id,
                    refiner: temp_item[0].refiner,
                }
            }).
            then(
                this.getProductsPerKeyword()
                .then(
                    router.push({
                    name: 'ProductsWithCustomSearch'
                })
                )
            )
        },
    },
    
};
</script>
<style>
.saved-searches-list-container .v-list-item:last-child::before {
    display: none;
}
.saved-searches-list-container .v-list-item:last-child {
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
}
</style>