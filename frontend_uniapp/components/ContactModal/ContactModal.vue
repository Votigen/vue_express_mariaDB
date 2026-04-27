<template>
	<view class="modal-overlay" @click="$emit('close')">
		<view class="modal-content" @click.stop>
			<view class="modal-header">
				<text class="modal-title">选择供应商</text>
				<text class="modal-close" @click="$emit('close')">✕</text>
			</view>
			<scroll-view scroll-y="true" class="modal-list">
				<view v-for="contact in contacts" :key="contact.uid" class="contact-item"
					@click="$emit('select', contact)">
					<text class="contact-name">{{ contact.username }}</text>
					<text class="contact-company">{{ contact.company || '暂无公司信息' }}</text>
				</view>
				<view v-if="contacts.length === 0" class="empty-state">
					<text class="empty-text">暂无联系人</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		contacts: {
			type: Array,
			default: () => []
		}
	})

	defineEmits(['select', 'close'])
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
		border-radius: 20rpx;
		width: 80%;
		max-height: 70%;
		overflow: hidden;
		box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.3);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #e0e0e0;
	}

	.modal-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
	}

	.modal-close {
		font-size: 36rpx;
		color: #999;
		cursor: pointer;
	}

	.modal-list {
		max-height: 500rpx;
	}

	.contact-item {
		padding: 25rpx 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.contact-item:active {
		background: #f5f5f5;
	}

	.contact-name {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		display: block;
	}

	.contact-company {
		font-size: 24rpx;
		color: #666;
		display: block;
		margin-top: 5rpx;
	}

	.empty-state {
		padding: 60rpx 30rpx;
		text-align: center;
		color: #999;
	}

	.empty-text {
		font-size: 28rpx;
	}
</style>