<template>
    <div>
        <app-navigation></app-navigation>
        <home-navigator></home-navigator>
        <v-content>
            <v-container class="cofigure-search-container">
                <feedback></feedback>
                <v-row justify="center">
                    <v-col justify="center" cols="12" md="6" sm="12">
                        <save-search-box></save-search-box>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation'
import HomeNavigator from '@/components/HomeNavigator'
import Feedback from '@/components/Feedback'
import SaveSearchBox from '@/components/SaveSearchBox'
import CustomSearchBox from '@/components/CustomSearchBox'
import { mapGetters } from 'vuex';
export default {
    name: 'SaveSearchList',
    components: {
        AppNavigation,
        HomeNavigator,
        Feedback,
        SaveSearchBox,
        CustomSearchBox
    },
    data: () => ({
        drawer: null,
        dialog: true
    }),
    methods: {

    }
};
</script>

<style>
@media (min-width: 600px) {
}
@media (max-width: 600px) {
}
</style>
