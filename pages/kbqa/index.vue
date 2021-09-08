<template>
	<view>
		<u-search placeholder="请输入自然语言查询句子" v-model="question" @search="kbqaSearch" :clearabled=false bg-color="white"
			border-color="#E6E6E6" margin="10rpx 30rpx" :show-action=false shape="square"></u-search>
		<paper-brief :papers="papers" v-show="paperShow" @clickCard="showPaperDetail"></paper-brief>

		<expert-brief :experts="experts" v-show="expertShow" @clickExpertCard="showExpertDetail"></expert-brief>

		<view class="u-margin-top-50">
			<u-empty text="无结果" mode="search" v-show="stringShow"></u-empty>
		</view>

		<!-- <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" @loadmore="loadmore"/> -->


	</view>
</template>

<script>
	import paperBrief from '@/components/paperBrief.vue'
	import expertBrief from '@/components/expertBrief.vue'

	export default {
		data() {
			return {
				// question: this.question == null ? "浙江大学的人才" : this.question,
				question: '',
				papers: [],
				experts: [],
				curCardType: "",
				paperShow: false,
				stringShow: false,
				expertShow: false,
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}

			}
		},
		components: {
			'paper-brief': paperBrief,
			'expert-brief': expertBrief
		},
		methods: {
			hideAllResult() {
				this.paperShow = false
				this.stringShow = false
				this.expertShow = false
			},
			kbqaSearch(value) {
				// let _this = this
				uni.request({
					url: "http://localhost:8080/kbqa/query",
					method: 'POST',
					data: {
						question: value
					},
					success: (res) => {
						let data = res.data.data
						this.genData(data)
					}
				})
			},


			genData(data) {
				// console.log(data)
				let type = data['type']
				this.curCardType = type
				this.hideAllResult()
				if (type == "String") {
					console.log("这是纯文本返回")
					this.stringShow = true
				} else if (type == "Paper") {
					this.paperShow = true
					this.genPaper(data)
				} else if (type == "Expert") {
					this.expertShow = true
					this.genExpert(data)
				}

			},

			genPaper(data) {
				let papersOrigin = data['data']['content']
				let papersNew = []
				console.log(papersOrigin)
				for (let p of papersOrigin) {
					console.log('here')
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

			genExpert(data) {
				let expertsOrigin = data['data']['content']
				// console.log(expertsOrigin)
				let expertsNew = new Array()
				for (let e of expertsOrigin) {
					let expert = {}
					expert['name'] = e.name
					let unitNodes = e.unitNodes
					let unitsList = []
					if (unitNodes) {
						for (let u of unitNodes) {
							unitsList.push(u['name'])
						}
					}
					expert['units'] = unitsList
					expert['unitsStr'] = unitsList.join(";")

					let subjectNodes = e.subjectNodes
					let subjectsList = []
					if (subjectNodes) {
						for (let u of subjectNodes) {
							subjectsList.push(u['name'])
						}
					}
					expert['subjects'] = subjectsList
					expert['subjectsStr'] = subjectsList.join(";")
					expert['expertId'] = e.expertId
					expertsNew.push(expert)
				}
				this.experts = expertsNew
				console.log(this.experts)
			},
			showPaperDetail(index) {
				// console.log(this.papers[index])
				// this.$navTo.togo('../info/paperInfo', this.papers[index])
				let _this = this
				uni.navigateTo({
					url: '../info/paperInfo',
					success: function(res) {
						res.eventChannel.emit('getData', _this.papers[index])
					}
				})
			},
			showExpertDetail(index) {
				let _this = this
				uni.navigateTo({
					url: '../info/expertInfo',
					success: function(res) {
						res.eventChannel.emit('getData', _this.experts[index])
					}
				})
			},

			loadmore() {
				if (this.curCardType == "String") {
					return
				} else if (this.curCardType == "Expert") {
					console.log("异步加载")
					this.kbqaSearch(this.question)
				}
			},
		}
	}
</script>

<style>

</style>
