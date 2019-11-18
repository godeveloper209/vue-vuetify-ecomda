<template>
    <v-container class="sign-in">
        <v-layout column align="start">
            <form @submit.prevent="login">
                <v-flex class="display-2 white--text align-center mb-1 mt-2">
                    <v-row align="center" justify="center">
                        <v-img src="../assets/img/latest_logo.png" max-width="290px"></v-img>
                    </v-row>
                    <v-row align="center" justify="center">
                        <p class="input-label label-black mt-1 text-center display-1" v-html="$vuetify.lang.t('$vuetify.mainTitle')">
                        </p>
                    </v-row>
                </v-flex>
                <v-flex>
                    <v-layout>
                        <v-row>
                            <v-col cols="12" md="2"></v-col>
                            <v-col cols="12" md="8" class="pt-0 pb-0" v-if="isAuthFailed" align="center" justify="center"> 
                                <p
                                    class="input-label label-red mt-1"
                                    v-html="$vuetify.lang.t('$vuetify.emailPwdWrong')"
                                ></p>
                            </v-col>
                            <v-col cols="12" md="2"></v-col>
                        </v-row>
                    </v-layout>
                </v-flex>
                <v-flex v-if="!haveIssue">
                    <v-layout>
                        <v-row>
                            <v-col cols="12" md="2"></v-col>
                            <v-col cols="12" md="8">
                                <p class="input-label label-base" v-html="$vuetify.lang.t('$vuetify.emailAddress')"></p>
                                <v-text-field
                                    v-model="emailAddress"
                                    placeholder="E-Mail-Address"
                                    background-color="#fff"
                                    class="mb-3 email-input"
                                    :single-line="true"
                                    :hide-details="true"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="2"></v-col>
                            <!-- <v-col 
                                v-if="!emailValidation"
                                cols="12" md="3" 
                                class="d-flex"
                                justify="center" 
                                >
                                    <p class="input-label label-red pt-0 pb-0">Diese E-Mail-Adresse ist leider nicht registriert.</p>
                            </v-col>-->
                        </v-row>
                    </v-layout>
                </v-flex>

                <v-flex v-if="!haveIssue">
                    <v-layout>
                        <v-row>
                            <v-col cols="12" md="2"></v-col>
                            <v-col cols="12" md="8" class="pt-0 pb-0">
                                <p class="input-label label-base" v-html="$vuetify.lang.t('$vuetify.password')"></p>
                                <v-text-field
                                    v-model="password"
                                    type="password"
                                    placeholder="Passwort"
                                    background-color="#fff"
                                    class="pwd-input"
                                    :single-line="true"
                                    :hide-details="true"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="2"></v-col>
                        </v-row>
                    </v-layout>
                </v-flex>
                <v-flex v-if="!haveIssue">
                    <v-layout>
                        <v-row>
                            <v-col cols="12" md="2"></v-col>
                            <v-col cols="12" md="8">
                                <v-layout class="d-flex">
                                    <v-flex col="12" class="mr-auto">
                                        <v-checkbox
                                            :label="$vuetify.lang.t('$vuetify.rememberMe')"
                                            class="base-primary-theme"
                                            :hide-details="true"
                                        ></v-checkbox>
                                    </v-flex>

                                    <v-flex col="12" class="text-right">
                                        <v-btn
                                            text
                                            @click="handleClickProblem"
                                            class="input-label label-black body-2 mb-0 btn-pure-link no-transform-text"
                                            v-html="$vuetify.lang.t('$vuetify.problemLogin')+'?'"
                                        ></v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-col>
                            <v-col cols="12" md="2"></v-col>
                        </v-row>
                    </v-layout>
                </v-flex>
                <v-flex v-if="haveIssue">
                    <v-layout>
                        <v-row>
                            <v-col cols="12" md="2"></v-col>
                            <v-col cols="12" md="8">
                                <p
                                    v-if="haveIssue"
                                    class="input-label label-black text-center problem-label"
                                    style="width:500px"
                                    v-html="$vuetify.lang.t('$vuetify.problemLogin') + '?' + '<br>' + $vuetify.lang.t('$vuetify.requestSupport')"
                                >
                
                                </p>
                            </v-col>
                            <v-col cols="12" md="2"></v-col>
                        </v-row>
                    </v-layout>
                </v-flex>

                <v-flex>
                    <v-row>
                        <v-col cols="12" md="2"></v-col>
                        <v-col v-if="!haveIssue" cols="12" md="8">
                            <v-btn
                                type="submit"
                                block
                                class="capitalize-text"
                                color="primary"
                                v-html="$vuetify.lang.t('$vuetify.login')"
                            ></v-btn>
                        </v-col>
                        <v-col cols="12" md="2"></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="2"></v-col>
                        <v-col v-if="haveIssue" cols="12" md="8">
                            <v-btn
                                type="button"
                                @click="handleClickBack"
                                block
                                class="no-transform-text"
                                color="primary"
                                v-html="$vuetify.lang.t('$vuetify.backLogin')"
                            ></v-btn>
                        </v-col>
                        <v-col cols="12" md="2"></v-col>
                    </v-row>
                </v-flex>
            </form>
        </v-layout>
    </v-container>
</template>

<script>
import router from '../router';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'SignIn',
    props: {
        source: String
    },
    data: () => ({
        drawer: null,
        emailAddress: '',
        password: '',
        haveIssue: false,
        isIconLarge: true,
        isAuthFailed: false
    }),
    computed: {
    },
    methods: {
        ...mapGetters({
            getAuthStatus: 'authStatus'
        }),
        ...mapActions({ loginAction: 'login' }),
        login: function() {
            this.$ga.event ({
                eventCategory: 'login',
                eventAction: 'attempt',
                eventValue: 1,
            })
            this.errorMessage = '';
            let data = {
                email: this.emailAddress,
                password: this.password
            };
            this.loginAction(data)
                .then(() => {
                    this.isAuthFailed = false;
                    router.push({ name: 'QuickTourStart' });
                })
                .catch(error => {
                    let errors = error;
                    this.isAuthFailed = true;
                });
        },
        handleClickProblem: function() {
            this.haveIssue = true;
        },
        handleClickBack: function() {
            this.haveIssue = false;
        }
    }
};
</script>


<style>
.sign-in .input-label.problem-label {
    /* margin-left: -55px;
    margin-top: 20vh; */
}

.sign-in .email-input .v-label {
    color: #807f7f !important;
}

.sign-in .pwd-input .v-label {
    color: #807f7f !important;
}
.sign-in .base-primary-theme .accent--text {
    color: #064976 !important;
}
.sign-in .v-input--selection-controls {
    margin-top: 0px !important;
    padding-top: 5px !important;
}

.sign-in .v-input--selection-controls__input {
    margin-right: 0px !important;
}

.sign-in .v-input--selection-controls.v-input .v-label {
    font-size: 0.9rem !important;
    color: rgba(0, 0, 0, 0.9);
}
.sign-in .v-input--selection-controls__ripple {
    height: 24px !important;
    width: 24px !important;
    left: -11.5px !important;
    top: calc(50% - 19px) !important;
    margin: 7px !important;
}
</style>