<template>
	<view>
		<view class="expertInfo u-margin-left-30">
			<view>
				<image src="@/static/expertName.png" width="30rpx" height="30rpx"></image>{{expert['name']}}
			</view>
			<view>
				<image src="@/static/expertUnit.png"></image>
				<view v-for="unit in expert['units']" class="inline u-p-l-10">
					<u-tag :text="unit" shape="circle" size="mini" class="tag" mode="plain" :color="tagColor"
						:border-color="tagBorderColor" />
				</view>
			</view>
			<view>
				<image src="@/static/expertSubject.png"></image>
				<view v-for="subject in expert['subjects']" class="inline u-p-l-10">
					<u-tag :text="subject" shape="circle" size="mini" class="tag" mode="plain" :color="tagColor"
						:border-color="tagBorderColor" />
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import paperBrief from '@/components/paperBrief.vue'
	export default {
		name: "expertDetail",
		data() {
			return {
				tagColor: "#66ccff",
				tagBorderColor: "#66ccff",
			};
		},

		props: {
			expert: Object
		},
		components: {
			'paper-brief': paperBrief,
		},
		methods: {

		}
	}
</script>

<style>
	.inline {
		display: inline;
	}
	
	.expertInfo image{
		width: 60rpx;
		height: 60rpx;
		margin-top: 20rpx;
		margin-right: 20rpx;
	}
</style>
