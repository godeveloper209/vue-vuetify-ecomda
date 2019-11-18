<template>
    <div v-click-outside="outside" class="feedback-form">
        <a href="#" class="feedback-form-btn btn btn-danger btn-lg" @click="toggleFeedback">Feedback</a>
        <div :class="'feedback_form_area ' + (feedbackStatus? 'open': 'close')">
            <div class="feedback_form_area_inner">
                <p class="text-center no-transform-text" v-if="!sentFeedback">
                        <strong v-html="$vuetify.lang.t('$vuetify.feedbackWelcome')"></strong>
                </p>
                <p class="text-center no-transform-text" v-else>
                        <strong v-html="$vuetify.lang.t('$vuetify.thanksForFeedback')"></strong>
                </p>
                <div v-if="!sentFeedback">
                    <p v-html="$vuetify.lang.t('$vuetify.askAdditional')">
                    </p>
                    <form>
                        <div class="form-group">
                            <label>
                                <small v-html="$vuetify.lang.t('$vuetify.name')"></small>
                            </label>
                            <input v-model="name" type="text" class="custom-inp" />
                        </div>
                        <div class="form-group">
                            <label>
                                <small v-html="$vuetify.lang.t('$vuetify.emailAddress')"></small>
                            </label>
                            <input v-model="email" type="email" class="custom-inp" />
                        </div>
                        <div class="form-group">
                            <label>
                                <small v-html="$vuetify.lang.t('$vuetify.message')"></small>
                            </label>
                            <textarea v-model="message" class="custom-inp-txt"></textarea>
                        </div>
                        <v-btn block class="primary capitalize-text" @click="handleSendFeedback" v-html="$vuetify.lang.t('$vuetify.send')"></v-btn>
                    </form>
                </div>
                <div v-else>
                    <p v-html="$vuetify.lang.t('$vuetify.askOtherIdeas')">
                        
                    </p>
                    <p v-html="$vuetify.lang.t('$vuetify.contactUsAnytime')">
                    </p>
                    <br />
                    <br />
                    <p v-html="$vuetify.lang.t('$vuetify.thomasJohn')">
                    </p>
                    <br />
                    <p v-html="$vuetify.lang.t('$vuetify.headOfProduct')">
                    <p class="pb-4 mb-4">
                        {{$vuetify.lang.t('$vuetify.phone')}}: (+49) 521/448 147 510
                        <br />
                        {{$vuetify.lang.t('$vuetify.cell')}}: (+49) 179/78 46 357
                        <br />
                        {{$vuetify.lang.t('$vuetify.mail')}}: thomas@ecomda.de
                        <br />
                    </p>
                    
                    <v-btn block class="primary capitalize-text mt-4" @click="handleSentFeedback" v-html="$vuetify.lang.t('$vuetify.close')"></v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'Feedback',
    data() {
        return {
            drawer: false,
            name: '',
            email: '',
            message: '',
            feedbackStatus: false,
            sentFeedback: false,
        };
    },

    methods: {
        ...mapActions(['sendFeedback']),
        //toggle feedback status for drawer
        toggleFeedback() {
            this.feedbackStatus = !this.feedbackStatus;
        },
        //send feedback
        handleSendFeedback(){
            if(this.name == '' || this.email == '' || this.message == '')
                return;
            else{
                this.sendFeedback({
                    name: this.name,
                    email: this.email,
                    message: this.message
                }).then(() => {
                    console.log('obnida i ');
                    this.email = '';
                    this.name = '';
                    this.message = '';
                    this.sentFeedback = true; 
                });
            }
        },
        //toggle sent feedback for thanks page on the feedback card
        handleSentFeedback(){
            if (this.sentFeedback) {
                this.feedbackStatus = false;
                this.sentFeedback = false;
            }

        },
      outside: function(e) {
        console.log('clicked outside!');
        if(this.feedbackStatus){
            this.feedbackStatus = false;
        }
      },
    },
    directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
        	const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) { warn += `Found in component '${compName}'` }
          
          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
          	binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler
        // add Event Listeners
        document.addEventListener('click', handler)
			},
      
      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
  }
};
</script>

<style>
.feedback-form {
    position: fixed;
    top: 20vh;
    right: 0;
    z-index: 100;
    min-height: 10vw;
}

.feedback-form-btn {
    position: absolute;
    left: -70px;
    transform: rotate(90deg);
    top: calc(5vh + 10rem);
    color: #fff !important;
    text-decoration: unset;
    background-color: #d9534f;
    border-radius: 10px;
    font-size: 16px !important;
    text-transform: none !important;
    padding: 0.5rem 1rem !important;
}
.feedback-form-show {
    right: 0 !important;
}

.feedback_form_area {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 1);
    color: black;
    padding: 1rem;
    margin-right: calc(-2vw - 20rem);
    transition: margin-right 0.5s;
    border: 1px rgb(100, 100, 100, 0.8) solid;
    border-radius: 2%;
}

.feedback_form_area.open {
    margin-right: -0px;
}

.feedback_form_area_inner {
    width: calc(2vw + 17rem);
    /* min-height: calc(10vh + 20rem); */
    color: black;
    padding: 0.3vw;
    font-size: 16px;
}

.feedback_form_area_inner p {
    margin-bottom: 0.5rem !important;
}

.feedback_form_area_inner .form-group {
    margin-bottom: 0.5rem !important;
}

.feedback_form_area h3 {
    margin-top: 0;
}

.custom-inp {
    width: 100%;
    height: 30px;
    padding-left: 0.26vw;
    color: black;
    border: 1px rgb(100, 100, 100, 0.8) solid;
    border-radius: 3px;
}

.custom-inp-txt {
    width: 100%;
    height: 80px;
    padding: 0.26vw;
    color: black;
    border: 1px rgb(100, 100, 100, 0.8) solid;
    border-radius: 3px;
}
</style>