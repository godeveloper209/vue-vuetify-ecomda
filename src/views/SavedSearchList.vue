<template>
    <div>
        <app-navigation></app-navigation>
        <home-navigator></home-navigator>
        <v-content>
            <v-container class="cofigure-search-container">
                <feedback></feedback>
                <v-row justify="center">
                    <v-col justify="center" cols="12" md="4" sm="12">
                        <saved-search-list-box></saved-search-list-box>
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
import SavedSearchListBox from '@/components/SavedSearchListBox'
import { mapGetters } from 'vuex';
export default {
    name: 'SavedSearchList',
    components: {
        AppNavigation,
        HomeNavigator,
        Feedback,
        SavedSearchListBox
    },

};
</script>

