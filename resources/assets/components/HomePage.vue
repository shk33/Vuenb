<template>
	<div class="home-container">
		<listing-summary-group v-for="(group, country) in listingGroups" 
			class="listing-summary-group"
			:key="country"
			:listings="group"
			:country="country"
			>
		</listing-summary-group>
	</div>
</template>


<script>
import axios from 'axios';
import { groupByCountry } from '../js/helpers';
import ListingSummaryGroup from './ListingSummaryGroup.vue';

export default {
	components: {
		ListingSummaryGroup
	},
	computed: {
		listingGroups() {
			return	groupByCountry(this.$store.state.listingSummaries);
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