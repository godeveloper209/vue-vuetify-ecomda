<template>
    <div>
        <app-navigation></app-navigation>
        <home-navigator></home-navigator>
        <v-content>
            <v-container 
            fill-height   
            fluid 
            >
                <feedback></feedback>
                <v-layout justify-center align-center>
                    <v-row
                    align="start"
                    justify="center"
                    class="px-4 mx-4"
                    >
                        <v-col
                            cols="12"
                            sm="12"
                            md="3"
                        >
                            <select-search-box></select-search-box>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="12"
                            md="8"
                        >
                            <product-table></product-table>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation'
import HomeNavigator from '@/components/HomeNavigator'
import Feedback from '@/components/Feedback'
import ProductTable from '@/components/ProductTable'
import SelectSearchBox from '@/components/SelectSearchBox'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ProductsWithSearch',
    components : {
        AppNavigation,
        HomeNavigator,
        Feedback,
        ProductTable,
        SelectSearchBox
    },
    props: {
        
    },

    data: () => ({
        drawer: null
    }),

    mounted(){
        
    }
};
</script>

<style>
.product-container{
    background: url('../assets/img/background.png');
    background-size: cover;
    height: 100%;
}  

.table-control-bar .v-list-item__icon {
    margin-right: 0.8vw!important;
}
</style>
