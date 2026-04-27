<template>
	<view>
		<view class="box">
			<view class="box2">
				<div class='title'>{{title}}</div>
				<div class='customer'>by {{customer}}</div>
			</view>
			<view class="content box2">
				<div>{{content}}</div>
			</view>
			<view class="box2 more-container">
				<div class="more">more</div>
			</view>
		</view>
	</view>
</template>

<script setup>
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import {
		defineProps
	} from 'vue';

	const props = defineProps({
		title: String,
		customer: String,
		content: String,
		to: String
	})
</script>

<style scoped>
	.more {
		font-size: 10px;
	}

	.more-container {
		justify-content: flex-end;
		padding-right: 20rpx;
	}

	.title {
		margin-left: 20rpx;
		font-size: 48rpx;
		flex: 1;
		font-weight: 500;
	}

	.customer {
		font-weight: 500;
		margin-right: 20rpx;
	}

	.box2 {
		display: flex;
		align-items: center;
		/* border: solid 1px black; */
	}

	.box {
		border-radius: 20rpx;
		/* padding: 3rpx; */
		background-color: rgba(204, 204, 204, 0.7);
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}

	.content {
		/* 		border: solid 1px black; */
		margin: 0rpx 10px 0px 10px;
		word-wrap: break-word;
		word-break: break-all;
		text-indent: 2em;
		font-size: 24rpx;
	}

	.colorLump {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
		margin-left: 20rpx;
	}

	.fas {
		font-size: 30rpx;
		color: #666;
		margin-left: 10rpx;
	}
</style>