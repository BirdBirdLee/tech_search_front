<template>
	<view>
		<view class="u-p-30 u-border-top u-border-right u-border-bottom u-border-left"
			style="border-color: #82848A; border-width: 2px;">
			<view class="title"> {{paper['title']}}</view>
			<view>【作者】
				<view v-for="expert in paper['experts']" class="inline u-p-l-10">
					<expert-tag :expert="expert" class="inline"></expert-tag>
				</view>
			</view>
			<view>【期刊】{{paper['journal']}}</view>
			<view>【单位】
				<view v-for="unit in paper['units']" class="inline u-p-l-10">
					<u-tag :text="unit" shape="circle" size="mini" class="tag" mode="plain" :color="tagColor"
						:border-color="tagBorderColor" />
				</view>
			</view>
			<view>【摘要】{{paper['summary']}}</view>
			<view>【DOI】{{paper['DOI']}}</view>
			<view>【专辑】{{paper['special']}}</view>
			<view>【专题】
				<view v-for="subject in paper['subjects']" class="inline u-p-l-10">
					<u-tag :text="subject" shape="circle" size="mini" class="tag" mode="plain" :color="tagColor"
						:border-color="tagBorderColor" />
				</view>
			</view>
			<view>【分类号】{{paper['cateCode']}}</view>
			<view>【关键词】
				<view v-for="keyword in paper['keywords']" class="foot u-p-l-10 inline">
					<u-tag :text="keyword" shape="circle" size="mini" class="tag" mode="plain" :color="tagColor"
						:border-color="tagBorderColor" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import expertTag from '@/components/expertTag.vue'
	export default {
		name: "paperDetail",
		data() {
			return {
				tagColor: "#66ccff",
				tagBorderColor: "#66ccff"
			};
		},
		props: {
			paper: Object
		},
		components:{
			'expert-tag': expertTag
		}
	}
</script>

<style>
	.title {
		text-align: center;
		font-size: 35rpx;
	}

	.inline {
		display: inline;
	}
</style>
