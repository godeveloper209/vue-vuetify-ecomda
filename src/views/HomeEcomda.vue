<template>
    <v-app>
        <v-content>
            <v-container class="fill-height home-ecomda" fluid>
                <v-row class="">
                    <v-col md="6" lg="6" xl="6">
                        <v-layout column class="left-title">
                            <v-flex
                                class="white--text text-md-center font-weight-bold"
                                >BE THE FIRST.</v-flex
                            >
                            <v-flex
                                class="white--text text-md-center font-weight-bold mb-3 mt-2"
                                >BE A PIONEER.</v-flex
                            >
                        </v-layout>
                    </v-col>
                    
                    <v-col md="6" lg="6"  xl="6" class="ml-auto">
                        <sign-in></sign-in>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import SignIn from '@/components/SignIn';
export default {
    name: 'HomeEcomda',
    components: {
        SignIn
    },
    props: {
        source: String
    },
    data: () => ({
        drawer: null
    })
};
</script>

<style scoped>
@media (min-width: 700px){
    .home-ecomda {
        /* padding : 3.75vw 0 0 12vw; */
        background-image: url('../assets/img/latest-background.png');
        background-position:0 0;
        background-repeat: no-repeat;
        background-size: 50vw 100vh;
        align-items: start!important;
        padding-top: 15vh;
    }
    .left-title{
        font-size: 72px!important;
    }
}

@media (max-width: 700px) {
    .home-ecomda {
        background: url('../assets/img/main-mobile-background.png');
        background-repeat: no-repeat;
        padding-top: 10vh;
    }
    .left-title{
        font-size: 48px!important;
        text-align: center;
    }

}
</style>
