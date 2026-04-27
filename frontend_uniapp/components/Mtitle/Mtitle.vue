<template>
	<view class="asd">
		<view class="title">
			{{title}}
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue';

	const props = defineProps({
		title: String,
	})
</script>


<style scoped>
	.asd {
		display: flex;
		justify-content: center;
	}

	.title {
		/* border: 1px solid black; */
		/* margin-left: 250rpx; */
		color: black;
		font-size: 60rpx;
		font-weight: bold;
		font-weight: 900;
		font-family: 'Noto Serif SC', serif;
		/* position: relative; */
		left: 10px
	}
</style>