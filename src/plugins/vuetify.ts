import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import light from "@/plugins/vuetify/theme"

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa',
    },
    theme: {
        themes: {light}
    }
});
