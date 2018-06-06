<template>
	<div class="home-container">
		<div v-for="(group, country) in listingGroups" class="listing-summary-group">
			<h1>Places in {{country}}</h1>
			<div class="listing-summaries">
				<listing-summary v-for="listing in group" :key="listing.id" :listing="listing"></listing-summary>	
			</div>
		</div>
	</div>
</template>


<script>
import axios from 'axios';
import routeMixin from '../js/route-mixin';
import { groupByCountry } from '../js/helpers';
import ListingSummary from './ListingSummary.vue';

export default {
	data() {
		return { listingGroups: [] };
	},
	components: {
		ListingSummary
	},
	beforeRouteEnter(to, from, next) {
		let	serverData = JSON.parse(window.vuebnbServerData);

		if (to.path === serverData.path) {
			let	listingGroups = groupByCountry(serverData.listings);
			next( component => component.listingGroups = listingGroups)
		} else {
			axios.get(`/api/`).then(({	data	})	=>	{
				let	listingGroups	=	groupByCountry(data.listings);
				next(component	=>	component.listingGroups	=	listingGroups);
			});
		}

	},
	methods: {
		assignData({listings}){
			this.listingGroups = groupByCountry(listings);
		}
	}
}
</script>

<style>
.listing-summary-group	{
	padding-bottom:	20px;
}

.listing-summaries	{
	display: flex;
	flex-direction:	row;
	justify-content: space-between;
	overflow: hidden;
}

.listing-summaries	>	.listing-summary	{
	margin-right: 15px;
}

.listing-summaries	>	.listing-summary:last-child	{
	margin-right: 0;
}
</style>