<template>
	<view>
		<view class="pure_top">

		</view>
		
	</view>
</template>

<script>
	export default {
		name: "pureTop",
		data() {
			return {
				// src: "https://tcualhp-notes.oss-cn-hangzhou.aliyuncs.com/img/expertInfo.png",
				// src: "@/static/expertInfo.png"
			};
		}
	}
</script>

<style>
	.pure_top {
		width: 100%;
		height: 200rpx;
		position: relative;
		z-index: 0;
		overflow: hidden;
	}

	.pure_top::after {
		content: '';
		width: 110%;
		height: 200rpx;
		position: absolute;
		left: -5%; //椭圆左边隐藏10%，右边隐藏10%
		top: -20%;
		border-radius: 0 0 50% 50%; //左上角，右上角，右下角，左下角
		background: #66ccff;
	}

	
</style>
