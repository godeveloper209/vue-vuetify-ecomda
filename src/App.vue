<template>
    <v-app>
        <v-content transition="slide-x-transition"  class="home-app" fill-height fluid>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    components : {
    }
};
</script>

<style>
.home-app {
    background-color:#F3F3F3;
    background-size: cover;
    width: 100%;
    height: 100%;
    padding : 3.75vw 0 0 12vw;
}

.capitalize-text{
    text-transform: capitalize!important;
}

.no-transform-text{
    text-transform: none!important;
}

.z-index-202{
    z-index: 202;
}

.input-label.label-black {
    color: #000;
    margin-bottom: 0.5rem !important;
}

.input-label.label-white {
    color: #fff;
    margin-bottom: 0.5rem !important;
}
.input-label.label-base {
    color: #064976;
    margin-bottom: 0.5rem !important;
}

.input-label.label-red {
    color: #f00;
    margin-bottom: 0.5rem !important;
}
.base-primary-theme{
    color: #064976;
}

.base-black-theme{
    color: #000;
}

.base-primary-theme .v-icon {
    font-size: 14px !important;
    color: #064976!important;
}

.base-black-theme .v-icon {
    color: #000;
}

.base-black-theme .v-label {
    font-size: 13px !important;
    color: #000;
}

.v-card{
    border-radius: 20px!important;
}

.v-dialog{
    border-radius: 20px!important;
}

.v-menu__content.menuable__content__active{
    border-radius: 20px!important;
}

.btn-pure-link:hover:before{
    background-color: transparent!important;
}

.v-tooltip__content {
    background: transparent!important;
}

.v-data-table__wrapper td{
    cursor: pointer;
}
</style>
