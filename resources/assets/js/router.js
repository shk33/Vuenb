import Vue from 'vue';
import VueRouter from 'vue-router';
import ListingPage from '../components/ListingPage.vue';
import HomePage from '../components/HomePage.vue';
import SavedPage from '../components/SavedPage.vue';
import store from './store';
import axios from 'axios';

Vue.use(VueRouter);

let router = new	VueRouter({
	mode: 'history',
	routes: [
		{	path:	'/',	component:	HomePage, name: 'home'	},
		{ path: '/listing/:listing', component: ListingPage, name: 'listing' },
		{ path: '/saved', component: SavedPage, name: 'saved' }
	],
	scrollBehavior (to, from, savedPosition){
		return {x:0, y: 0}
	}
});

router.beforeEach((to, from, next) => {
	let	serverData = JSON.parse(window.vuebnbServerData);

	if (
    	to.name === 'listing'
	    	? store.getters.getListing(to.params.listing)
	    	: store.state.listingSummaries.length > 0
  	) {
		next();
	}
	else if	(!serverData.path || to.path !== serverData.path)	{
		axios.get(`/api${to.path}`).then(({data})	=>	{
			store.commit('addData',	{route:	to.name, data});
			next();
		});
	}
	else	{
		store.commit('addData',	{route:	to.name, data: serverData});
		next();
	}	
})

export default router;