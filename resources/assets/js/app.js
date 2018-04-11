import Vue from 'vue';
import "core-js/fn/object/assign";
import ListingPage from '../components/ListingPage.vue';
import App from '../components/App.vue';
import router from './router';

var app = new Vue({
	el: '#app',
	render: h => h(App),
	router
});
