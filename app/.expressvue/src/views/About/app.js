import Vue from "vue";
import App from "C:\\Users\\gazzo\\Documents\\MEGA - 2\\Unipd\\2_ Msc Computer Engineering\\ENSSAT\\Web Services\\project\\IntegrationWebProject\\app\\src\\views\\About.vue";

export function createApp(data) {
    const mergedData = Object.assign(App.data ? App.data() : {}, data);
    App.data = () => (mergedData)
 
    const app = new Vue({
        data,
        render: h => h(App),
    });
    return { app };
}