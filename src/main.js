import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

import '@babel/polyfill';
import VueAnalytics from 'vue-analytics'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueI18n from 'vue-i18n'
import messages from './plugins/lang'
import FlagIcon from 'vue-flag-icon'
Vue.use(FlagIcon);
Vue.use(Vuetify);
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'de', // set locale
  messages, // set locale messages
})

const vuetify = new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
      themes: {
        light: {
          primary: '#064976',
        },
      },
    },
    lang: {
      t: (key, ...params) => {
        return i18n.t(key, params);
      }
    },
});

Vue.config.productionTip = false;

const isProd = process.env.NODE_ENV === 'development';
Vue.use(VueAnalytics, {
    id: 'UA-148873883-1',
    router,
    debug: {
        enabled: !isProd,
        sendHitTask: isProd
    },
    autoTracking: {
        screenview: true
    },
    sendHitTask: window.location.hostname === "localhost" ? false : true
})


new Vue({
    i18n,
    router,
    store,
    vuetify,
    render: h => h(App),
    mounted(){
        if(!localStorage.getItem('lang'))
        this.$store.dispatch('setLang', 'de');
        this.$i18n.locale = this.$store.state.Auth.lang;
        
        this.$store.watch(({Auth}) => Auth.lang, lang => this.$i18n.locale = lang)
    }
}).$mount('#app');
