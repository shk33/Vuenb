import Vue from 'vue';
import "core-js/fn/object/assign";
import { populateAmenitiesAndPrices } from './helpers';
import ImageCarousel from '../components/ImageCarousel.vue';

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
	methods: {
		escapeKeyListener: function (event) {
			if (event.keyCode === 27 && this.modalOpen) {
				this.modalOpen = false;
			} 
		}
	},
	components: {
		ImageCarousel
	},
	created: function () {
		document.addEventListener('keyup', this.escapeKeyListener)
	},
	destroyed: function () {
		document.removeEventListener('keyup', this.escapeKeyListener)
	},
	watch: {
		modalOpen: function () {
			var className = 'modal-open';

			if (this.modalOpen) {
				document.body.classList.add(className)
			} else {
				document.body.classList.remove(className)
			}
		}
	}
});
