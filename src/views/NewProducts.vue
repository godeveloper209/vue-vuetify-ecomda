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
                    align="center"
                    justify="center"
                    >
                        <v-col
                            cols="12"
                            sm="12"
                            md="8"
                        >
                            <product-table-for-new-products></product-table-for-new-products>
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
import ProductTableForNewProducts from '@/components/ProductTableForNewProducts'
import { mapActions } from 'vuex'
export default {
    name: 'NewProducts',
    components : {
        AppNavigation,
        Feedback,
        ProductTableForNewProducts,
        HomeNavigator
    },
    props: {
        source: String
    },
    data: () => ({
        drawer: null
    }),
    
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
