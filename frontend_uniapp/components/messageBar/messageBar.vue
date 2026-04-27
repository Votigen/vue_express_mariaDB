<template>
	<view>
		<view class="box">
			<view class="colorLump" :style="{backgroundColor: color}"></view>
			<view class="content">{{ content }}</view>
			<i class="fas fa-angle-right" />
		</view>
	</view>
</template>

<script setup>
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import {
		defineProps
	} from 'vue';

	const props = defineProps({
		content: String,
		color: {
			type: String,
			default: '#ccc'
		}
	})
</script>

<style lang="scss" scoped>
	.box {
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		background-color: rgba(204, 204, 204, 0.7);
		justify-content: flex-start;
	}

	.colorLump {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
		margin-left: 20rpx
	}

	.content {
		flex: 1;
	}

	.fas {
		font-size: 30rpx;
		color: #666;
		margin-left: 10rpx;
	}
</style>