import Vue from 'vue';
import "core-js/fn/object/assign";
import { populateAmenitiesAndPrices } from './helpers';
import ImageCarousel from '../components/ImageCarousel.vue';
import ModalWindow from '../components/ModalWindow.vue';
import HeaderImage from '../components/HeaderImage.vue';
import FeatureList from '../components/FeatureList.vue';

let	model = JSON.parse(window.vuebnbListingModel);
model = populateAmenitiesAndPrices(model);

var app = new Vue({
	el: '#app',
	data: Object.assign(model, {
		headerImageStyle:	{
			'background-image':	`url(${model.images[0]})`
		},
		isContracted:true,
		contractedText: "+ More",
		modalOpen: false,
	}),
	components: {
		ImageCarousel,
		ModalWindow,
		HeaderImage,
		FeatureList,
	},
	methods: {
		openModal() {
			this.$refs.imagemodal.modalOpen = true;
		}
	}
});
