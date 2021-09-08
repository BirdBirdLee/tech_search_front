<template>
	<view>
		<view>
			<paper-detail :paper="paper"></paper-detail>
		</view>
	</view>


</template>

<script>
	import paperDetail from '@/components/paperDetail.vue'
	export default {
		// onLoad(param) {

		// 	this.paper['title'] = param.title
		// 	this.paper['experts'] = param.experts.split(',')
		// 	this.paper['journal'] = param.journal
		// 	this.paper['units'] = param.units.split(',')
		// 	this.paper['summary'] = param.summary
		// 	this.paper['DOI'] = param.DOI
		// 	this.paper['special'] = param.special
		// 	this.paper['subjects'] = param.subjects.split(',')
		// 	this.paper['cateCode'] = param.cateCode
		// 	this.paper['keywords'] = param.keywords.split(',')
		// },
		onLoad(options) {
			const eventChannel = this.getOpenerEventChannel();
			this.eventChannel = eventChannel;
			let _vm = this;

			eventChannel.on('getData', function(params) {
				_vm.paper = params
			})
		},
		onUnload() {
			this.eventChannel.off('getData');
		},
		data() {
			return {
				eventChannel: null,
				paper: Object
			}
		},
		components: {
			'paper-detail': paperDetail,
		},
		methods: {

		}
	}
</script>

<style>
	
</style>
