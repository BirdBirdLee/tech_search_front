<template>
	<view>
		<view>
			<pure-top></pure-top>
		</view>
		
		<view class="expertInfo">
			<view class="expertInfoImage">
				<u-image :src="src" width="200rpx" height="200rpx"></u-image>
			</view>
			
			<view>
				<expert-detail :expert="expert"></expert-detail>
			</view>
			
			<view class="u-p-t-45">
				<paper-brief :papers="papers" v-show="paperShow" @clickCard="showPaperDetail"></paper-brief>
			</view>
		</view>

	</view>
	
</template>

<script>
	import expertDetail from '@/components/expertDetail.vue'
	import paperBrief from '@/components/paperBrief.vue'
	import pureTop from '@/components/pureTop.vue'
	
	export default {
		// onLoad(param) {
		// 	this.expert['name'] = param.name
		// 	this.expert['expertId'] = param.expertId
		// 	this.expert['units'] = param.units.split(',')
		// 	this.expert['subjects'] = param.subjects.split(',')
		// 	this.getPapersByExpertId(this.expert['expertId'])
		// },
		onLoad(options) {
			const eventChannel = this.getOpenerEventChannel();
			this.eventChannel = eventChannel;
			let _vm = this;
		
			eventChannel.on('getData', function(params) {
				_vm.expert = params
			})
			
			this.getPapersByExpertId(this.expert['expertId'])
		},
		onUnload() {
			this.eventChannel.off('getData');
		},
		data(){
			return{
				expert: {
					name: "",
					expertId:"",
					units: [],
					subjects: []
				},
				paperShow: false,
				papers: [],
				curCardType: "",
				src: "https://tcualhp-notes.oss-cn-hangzhou.aliyuncs.com/img/expertInfo.png",
			}
		},
		components:{
			'expert-detail': expertDetail,
			'paper-brief': paperBrief,
			'pure-top': pureTop,
		},
		methods:{
			getPapersByExpertId(value) {
				uni.request({
					url: "http://localhost:8080/paper/expertId",
					method: 'POST',
					data: {
						expertId: value
					},
					success: (res) => {
						let data = res.data.data
						console.log(res)
						console.log(data)
						this.genData(data)
					}
				})
			},
			
			genData(data) {
				// console.log(data)
				let type
				if (data['totalElements'] == 0) {
					type = 'String'
				} else {
					type = 'Paper'
				}
				this.curCardType = type
				this.hideAllResult()
				if (type == "String") {
					console.log("这是纯文本返回")
					this.stringShow = true
				} else if (type == "Paper") {
					this.paperShow = true
					this.genPaper(data)
				}
			
			},
			hideAllResult() {
				this.paperShow = false
				this.stringShow = false
			},
			genPaper(data) {
				let papersOrigin = data['content']
				let papersNew = new Array()
				for (let p of papersOrigin) {
					let paper = {}
					paper['title'] = p['title']
					let expertsList = []
					let expertNodes = p['expertNodes']
					if (expertNodes) {
						for (let e of expertNodes) {
							expertsList.push(e['name'])
						}
					}
					let expertsStr = expertsList.join(";")
					paper['expertsStr'] = expertsStr
					paper['experts'] = expertNodes
			
					let unitsList = []
					let unitNodes = p['unitNodes']
					if (unitNodes) {
						for (let u of unitNodes) {
							unitsList.push(u['name'])
						}
					}
					let unitsStr = unitsList.join(";")
					paper['unitsStr'] = unitsStr
					paper['units'] = unitsList
			
					let subjectsList = []
					let subjectNodes = p['subjectNodes']
					if (subjectNodes) {
						for (let u of subjectNodes) {
							subjectsList.push(u['name'])
						}
					}
					let subjectsStr = subjectsList.join(";")
					paper['subjectsStr'] = subjectsStr
					paper['subjects'] = subjectsList
			
					let journalNode = p['journalNode']
					if (journalNode) {
						paper['journal'] = journalNode['name']
					} else {
						paper['journal'] = ''
					}
			
					let keywordsList = []
					let keywordNodes = p['keywordNodes']
					if (keywordNodes) {
						for (let e of keywordNodes) {
							keywordsList.push(e['name'])
						}
					}
					paper['keywords'] = keywordsList
			
					paper['summary'] = p['summary']
					paper['year'] = p['year']
					paper['DOI'] = p['DOI']
					paper['cateCode'] = p['cateCode']
					paper['special'] = p['special']
					paper['thumb'] = "https://tcualhp-notes.oss-cn-hangzhou.aliyuncs.com/img/paper.png"
					papersNew.push(paper)
				}
				this.papers = papersNew
			},
			showPaperDetail(index) {
				let _this = this
				uni.navigateTo({
					url: '../info/paperInfo',
					success: function(res) {
						res.eventChannel.emit('getData', _this.papers[index])
					}
				})
			},
		}
	}
</script>

<style>
	
	.expertInfo {
		position: relative;
		top: -160rpx;
	}
	.expertInfoImage{
		z-index: 99;
		display: flex;
		/* align-items: center; */
		justify-content:center;
		/* position: absolute; */
		
	}
</style>
