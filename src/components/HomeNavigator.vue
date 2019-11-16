<template>
    <div class="home-navigator-container">
        <v-btn
            color="primary"
            @click="goHome"
            class="home-navigator"
            >
            <v-icon large color="#fff" class="pl-0">mdi-home</v-icon>
        </v-btn>
    </div>
</template>

<script>
import router from '../router'
export default {
    name: 'HomeNavigator',
    data() {
        return {
        };
    },

    methods: {
        goHome: function(){
            router.push({name: 'QuickTourStart'});
        }
    }
};
</script>

<style>
.home-navigator-container{
    position: absolute;
    top: 95px;
    z-index: 100;
}

.home-navigator{
    min-height: 50px;
    width: 40px;
    border-top-right-radius: 20px!important;
    border-bottom-right-radius: 20px!important;
}
@media (max-width: 600px) {
.home-navigator-container{
    top: 80px;
}
}
</style>