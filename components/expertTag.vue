<template>
	<view>
		<u-tag :text="expert.name" shape="circle" size="mini" class="tag" mode="plain" :color="tagColor"
			:border-color="tagBorderColor" @click="showExpertDetail"/>
	</view>
</template>

<script>
	export default {
		name:"expertTag",
		data() {
			return {
				tagColor: "#66ccff",
				tagBorderColor: "#66ccff"
			};
		},
		props:{
			expert: {}
		},
		methods:{
			showExpertDetail(){
				let expertId = this.expert['expertId']
				let expertName = this.expert['name']
				uni.request({
					method:'POST',
					url:"http://localhost:8080/expert/id",
					data:{
						id: expertId
					},
					success: (res) => {
						let data = res.data.data
						let expert = {}
						expert['name'] = data.name
						expert['id'] = expertId
						let unitNodes = data.unitNodes
						let unitsList = []
						if (unitNodes) {
							for (let u of unitNodes) {
								unitsList.push(u['name'])
							}
						}
						expert['units'] = unitsList
						expert['unitsStr'] = unitsList.join(";")
						
						let subjectNodes = data.subjectNodes
						let subjectsList = []
						if (subjectNodes) {
							for (let s of subjectNodes) {
								subjectsList.push(s['name'])
							}
						}
						expert['subjects'] = subjectsList
						expert['subjectsStr'] = subjectsList.join(";")
						expert['expertId'] = data.expertId
						uni.navigateTo({
							url: '../info/expertInfo',
							success: function(res) {
								res.eventChannel.emit('getData', expert)
							}
						})
						
					}
				})
			}
		}
	}
</script>

<style>

</style>
