<template>
    <v-layout row justify-center v-if="loading">
            <v-container fill-height class="loading-circle">
                <v-layout row justify-center align-center>
                    <v-progress-circular  :size="50" color="deep-orange lighten-2" indeterminate></v-progress-circular>
                </v-layout>
            </v-container>
    </v-layout>
</template>
<script>
import router from '../router';
export default {
    name: 'LoadingCircle',
    data() {
        return {};
    },

    props: {
        loading: Boolean
    }
};
</script>

<style scoped>
.loading-circle{
    z-index: 300;
    position: absolute;
    top: -10vh;
}
</style>