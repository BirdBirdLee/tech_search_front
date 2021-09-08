<template>
	<view>
		<u-card v-for="(expert, i) in experts" :thumb="expert.thumb" :thumb-width="30" :show-head=false
			margin="20rpx 30rpx" title-size="25" title-color="#66ccff" padding="5" :foot-border-top=false
			@click="click(i)" border-radius="30">


			<view slot="body">

				<view class="u-body-item u-flex u-row-between u-p-t-0 u-p-l-20 u-p-r-20">
					<image
						src="../static/expert.png"
						mode="aspectFill"></image>
					<view class="u-margin-left-30">
						<view class="u-font-lg u-margin-top-15" style="color: #66ccff;">{{expert.name}}</view>
						<view class="u-font-sm u-margin-top-10">{{expert.unitsStr}}</view>
						<view class="u-font-sm u-margin-top-5 u-margin-bottom-15">{{expert.subjectsStr}}</view>
					</view>
				</view>

			</view>

			<!-- <view class="" slot="foot"><u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon></view> -->
		</u-card>
	</view>
</template>

<script>
	export default {
		name: "expertBrief",
		data() {
			return {

			};
		},
		props: {
			experts: Array
		},
		methods: {
			click(index) {

				this.$emit('clickExpertCard', index)
			}
		}
	}
</script>

<style>
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 20rpx;
		display: 'flexbox';
		justify-content: flex-start;
	}

	.u-body-item image {
		width: 160rpx;
		flex: 0 0 160rpx;
		height: 160rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
		margin-top: 20rpx;
	}
</style>
