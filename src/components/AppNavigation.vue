<template>
    <div>
        <v-app-bar color="primary" height="70">
            <v-toolbar-title class="ml-2 pl-2 pt-4 pb-4">
                <router-link to="/quick-tour-start">
                    <v-img
                        class="ml-md-4 nav-logo"
                        src="../assets/img/logo.png"
                    ></v-img>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-and-down">
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                        color="primary"
                        dark
                        v-on="on"
                        class="lang-dropdown capitalize-text"
                        >
                        <flag :iso="CountryFlag" />
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                        v-for="(lang, index) in languages"
                        :key="index"
                        @click="setLanguage(lang)"
                        >
                        <flag :iso="getCountryFlag(lang)" />
                        <v-list-item-title class="ml-4">{{ lang }}</v-list-item-title>
                        
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-btn
                    @click="handleHelp"
                    :ripple="false"
                    class="capitalize-text"
                    color="#fff"
                    text
                    v-html="$vuetify.lang.t('$vuetify.help')"
                    ></v-btn
                >
                <v-btn
                    @click="handleLogout"
                    :ripple="false"
                    class="capitalize-text"
                    color="#fff"
                    text
                    v-html="$vuetify.lang.t('$vuetify.logout')"
                    ></v-btn
                >
            </v-toolbar-items>

            <v-menu>
                <v-app-bar-nav-icon
                    class="hidden-sm-and-up"
                ></v-app-bar-nav-icon>
            </v-menu>
        </v-app-bar>
        <v-dialog v-model="dialog" max-width="550px">
            <v-card class="help-dialog-container">
                <v-card-title class="pb-0">
                    Herzlich willkommen!
                    <v-spacer></v-spacer>
                    <v-btn
                        class="ma-1"
                        text
                        icon
                        color="black lighten-2"
                        @click="dialog = false"
                    >
                        <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="black--text mb-1 pb-1">
                    Schön, dass Sie da sind! Wir hoffen, dass die
                    Produkt-Launch-Datenbank für Sie ein wertvolles Werkzeug
                    wird. Wir möchten, Ihnen damit die Arbeit erleichtern, Sie
                    zu neuen Ideen führen sowie Sie und Ihr Unternehmen noch
                    erfolgreicher machen. Daher arbeiten wir jeden Tag hart
                    daran, die Launch-Datenbank noch besser zu machen. Viel Spaß
                    bei der Arbeit damit!
                </v-card-text>
                <v-card-title class="subtitle-1 mt-0 pt-0">
                    Überblick über die wichtigsten Funktionen:
                </v-card-title>
                <v-card-text class="black--text mb-1 pb-0">
                    <ul>
                        <li>Schnellsuche</li>
                        <p>
                            Mit der Schnellsuche können Sie in Produktnamen und
                            -titeln neuer Produkte suchen. Im Anschluss können
                            Sie die Suche verfeinern: Beispielsweise durch
                            Einschränkung auf bestimmte Produktkategorien,
                            Länder oder Hersteller/Marken.
                        </p>
                        <li>Gespeicherte Suchen</li>
                        <p>
                            Mit der Schnellsuche können Sie in Produktnamen und
                            -titeln neuer Produkte suchen. Im Anschluss können
                            Sie die Suche verfeinern: Beispielsweise durch
                            Einschränkung auf bestimmte Produktkategorien,
                            Länder oder Hersteller/Marken.
                        </p>
                        <li>Neueste Produkte aus Ihren Suchen</li>
                        <p>
                            Mit der Schnellsuche können Sie in Produktnamen und
                            -titeln neuer Produkte suchen. Im Anschluss können
                            Sie die Suche verfeinern: Beispielsweise durch
                            Einschränkung auf bestimmte Produktkategorien,
                            Länder oder Hersteller/Marken.
                        </p>
                        <li>Gemerkte Produkte</li>
                        <p class="pb-0 mb-0">
                            Mit der Schnellsuche können Sie in Produktnamen und
                            -titeln neuer Produkte suchen. Im Anschluss können
                            Sie die Suche verfeinern: Beispielsweise durch
                            Einschränkung auf bestimmte Produktkategorien,
                            Länder oder Hersteller/Marken.
                        </p>
                    </ul>
                </v-card-text>

                <v-card-title class="subtitle-1 mt-1 pt-1"
                    >Wir wollen weiter lernen. Am besten von
                    Ihnen!</v-card-title
                >
                <v-card-text class="black--text">
                    Sie haben noch weitere Ideen oder Wünsche? Dann können Sie
                    uns gern jederzeit kontaktieren: Thomas John, unser Head of
                    Product, spricht gerne mit Ihnen darüber, wie wir die Launch
                    Database weiter verbessern können!
                </v-card-text>
                <v-card-text class="black--text">
                    <p class="pb-0 mb-1">
                        Thomas John
                        <br />
                        Head of Product
                    </p>
                    Phone: (+49) 521/448 147 510
                    <br />
                    Cell: (+49) 179/78 46 357
                    <br />
                    Mail: thomas@ecomda.de
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                        color="primary"
                        dark
                        @click="dialog = false"
                        class="no-transform-text"
                        >Schließen</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import router from '../router';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'AppNavigation',
    data() {
        return {
            drawer: false,
            dialog: false,
            languages: ['Deutsch', 'English'],
            CountryFlag: null,
        };
    },
    computed: {
        currentLang: {
            get: function(){
                return this.getLang();
            },
            set: function(){
                return ;
            }
        }
    },
    methods: {
        ...mapGetters(['isVisited', 'getLang']),
        ...mapActions(['logout', 'setVisited', 'setLang']),
        //logout
        handleLogout() {
            this.logout().then(() => router.push({ name: 'HomeEcomda' }));
        },
        //open help dialog when click Help
        handleHelp() {
            this.dialog = true;
        },

        setLanguage(lang){
            switch(lang){
                case 'English':
                    this.setLang('en');
                    break;
                case 'Deutsch':
                    this.setLang('de')

            }
        },
        setCurrentLangFlag(lang){
            switch (lang){
                case 'en':
                    this.CountryFlag = 'us';
                    break;
                case 'de':
                    this.CountryFlag = 'de';
                    break;
            }
        },
        getCountryFlag(lang){
            switch (lang){
                case 'English':
                    return 'us';
                    break;
                case 'Deutsch':
                    return 'de';
                    break;
            }
        }
    },
    watch :{
        currentLang: function(newVal, oldVal){
            console.log('watch', newVal);
            this.setCurrentLangFlag(newVal);
        }
    },
    mounted() {
        if (this.isVisited()) {
            this.dialog = true;
            this.setVisited(false);
        }
        this.setCurrentLangFlag(this.getLang());
        
    }
};
</script>

<style scoped>
.nav-logo {
    width: calc(10vw + 6rem);
}

.welcome-img {
    width: calc(10vw + 6rem);
    max-width: calc(10vw + 10rem);
}

.lang-dropdown{
    box-shadow: unset!important;
}
</style>