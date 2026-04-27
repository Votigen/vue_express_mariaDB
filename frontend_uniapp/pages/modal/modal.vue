<template>
	<view>
		<!-- 触发按钮 -->
		<button @click="showModal = true">打开模态框</button>

		<!-- 模态框 -->
		<view v-if="showModal" class="modal-overlay" @click="showModal = false">
			<view class="modal-content" @click.stop>
				<view class="modal-header">
					<text>标题</text>
					<text @click="showModal = false">✕</text>
				</view>
				<view class="modal-body">
					<text>这里是模态框内容</text>
				</view>
				<view class="modal-footer">
					<button @click="showModal = false">取消</button>
					<button @click="handleConfirm">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const showModal = ref(false)

	const handleConfirm = () => {
		console.log('确认操作')
		showModal.value = false
	}
</script>

<style scoped>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-content {
		background: white;
		border-radius: 10px;
		width: 80%;
		max-width: 500px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		border-bottom: 1px solid #eee;
	}

	.modal-body {
		padding: 20px;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		padding: 20px;
		border-top: 1px solid #eee;
	}
</style>