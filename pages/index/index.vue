<template>
	<view>
		<u-search placeholder="请输入关键词、单位等检索论文" v-model="keyword" @search="primarySearch" :clearabled=false
			bg-color="white" border-color="#E6E6E6" margin="10rpx 30rpx" :show-action=false shape="square"></u-search>
		<paper-brief :papers="papers" v-show="paperShow" @clickCard="showPaperDetail"></paper-brief>

		<view class="u-margin-top-50">
			<u-empty text="无结果" mode="search" v-show="stringShow"></u-empty>
		</view>
	</view>
</template>

<script>
	import paperBrief from '@/components/paperBrief.vue'
	export default {
		data() {
			return {
				papers: [],
				type: "",
				paperShow: false,
				stringShow: false,
				keyword: "",
				curCardType: ""
			}
		},
		onLoad() {

		},
		components: {
			'paper-brief': paperBrief,
		},
		methods: {
			primarySearch(value) {
				uni.request({
					url: "http://localhost:8080/paper/mix",
					method: 'POST',
					data: {
						keyword: value
					},
					success: (res) => {
						let data = res.data.data
						console.log(data)
						this.genData(data)
					}
				})
			},

			genData(data) {
				// console.log(data)
				let type
				if(data['totalElements'] == 0){
					type = 'String'
				}
				else{
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

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}
</style>
