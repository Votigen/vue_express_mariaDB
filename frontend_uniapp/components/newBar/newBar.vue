<template>
	<view>
		<navigator :url="to">
			<view class="box">
				<view class="box2">
					<div class='title'>{{title}}</div>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import {
		defineProps
	} from 'vue';

	const props = defineProps({
		title: String,
		to: String
	})
</script>

<style scoped>
	.title {
		padding: 8px;
		font-size: 48rpx;
		font-weight: 500;
	}

	.box2 {
		display: flex;
		justify-content: center;
		/* border: solid 1px red; */
	}

	.box {
		width: 97%;
		border-radius: 20rpx;
		/* padding: 3rpx; */
		background-color: rgba(255, 255, 255, 0.9);
		display: flex;
		flex-direction: column;
		gap: 10rpx;
		margin-top: 4px;
		margin-left: 1.5%;
	}
</style>