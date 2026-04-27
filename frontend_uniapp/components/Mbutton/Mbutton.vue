<template>
	<view>
		<button class="content">{{content}}</button>
	</view>
</template>

<script setup>
	import {
		defineProps,
	} from 'vue';

	const props = defineProps({
		content: String
	})
</script>

<style scoped>
	.content {
		background: rgba(181, 94, 94);
		color: white;
		font-weight: bold;
		width: 200px;
		border-radius: 50px;
		transition: all 0.2s ease;
		border: none;
		outline: none;
	}

	.content:active {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
		transform: translateY(2px);
	}
</style>