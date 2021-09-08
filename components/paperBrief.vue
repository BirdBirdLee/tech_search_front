<template>
	<view>
		<u-card v-for="(paper, i) in papers" :title="paper.title" :thumb="paper.thumb" :thumb-width="30" margin="20rpx 30rpx"
			:head-style="headStyle" title-size="25" title-color="#66ccff" padding="5" :foot-border-top=false
			@click="click(i)" border-radius="30">
			
			<view slot="head"
				class="u-card__head"
				:style="[{padding: padding + 'rpx', height: headHeight+ 'rpx'}, headStyle]"
			>
				<view class="u-flex u-row-between">
					<view class="u-card__head--left u-flex u-line-1">
						<image
							:src="paper.thumb"
							class="u-card__head--left__thumb"
							mode="aspectfull"
							:style="{ 
								height: thumbWidth + 'rpx', 
								width: thumbWidth + 'rpx', 
							}"
						></image>
						<text
							class="u-card__head--left__title u-line-1 u-margin-left-10"
							:style="{
								fontSize: titleSize + 'rpx',
								color: titleColor
							}"
						>
							{{ paper.title }}
						</text>
					</view>
				</view>
			</view>
			
			<view slot="body">
				<view class="infoUnderTitle u-p-l-20">
					{{paper.expertsStr}} | {{paper.journalStr}} | {{paper.unitsStr}} | {{paper.year}}
				</view>

			</view>
			<view slot="body">
				<view class="u-flex u-border-bottom u-col-between u-p-t-0 u-p-l-20 u-p-r-20">
					<view class="summary u-body-item-title u-line-4">{{paper.summary}}</view>
				</view>
			</view>
			<view v-for="keyword in paper.keywords" slot="foot" class="inline u-p-l-10">
				<u-tag :text="keyword" shape="circle" size="mini" class="tag" mode="plain" :color="tagColor"
					:border-color="tagBorderColor" />
			</view>

			<!-- <view class="" slot="foot"><u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon></view> -->
		</u-card>
	</view>
</template>

<script>
	export default {
		name: "paperBrief",
		data() {
			return {
				headStyle: {
					display: "flex",
					height: "50rpx",
					'text-align': "center",
					'border-color':"black"
				},
				tagColor: "#66ccff",
				tagBorderColor: "#66ccff",
				thumbWidth: "30",
				titleSize:"30",
				titleColor:"#66ccff",
				padding: "10",
				headHeight: "30"
			};
		},
		props: {
			papers: Array,
		},
		methods:{
			click(index){
				
				this.$emit('clickCard', index)
			}
		}
	}
</script>

<style scoped lang="scss">
	
	@import "@/uview-ui/libs/css/style.components.scss";
		
	.u-card {
		position: relative;
		overflow: hidden;
		font-size: 28rpx;
		background-color: #ffffff;
		box-sizing: border-box;
		
		&-full {
			// 如果是与屏幕之间不留空隙，应该设置左右边距为0
			margin-left: 0 !important;
			margin-right: 0 !important;
			width: 100%;
		}
		
		&--border:after {
			border-radius: 16rpx;
		}
	
		&__head {
			&--left {
				color: $u-main-color;
				
				&__thumb {
					margin-right: 16rpx;
				}
				
				&__title {
					max-width: 550rpx;
				}
			}
	
			&--right {
				color: $u-tips-color;
				margin-left: 6rpx;
			}
		}
	
		&__body {
			color: $u-content-color;
		}
	
		&__foot {
			color: $u-tips-color;
		}
	}
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 20rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.infoUnderTitle {
		color: grey;
		font-size: 20rpx;
		padding: 10rpx;
	}

	.summary {
		font-size: 25rpx;
		padding: 5rpx, 20rpx;
	}

	.inline {
		display: inline;
	}

	.tag {
		margin: 10rpx, 10rpx, 10rpx, 10rpx;
	}
</style>
