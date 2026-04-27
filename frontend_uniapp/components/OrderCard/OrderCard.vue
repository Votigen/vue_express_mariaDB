<template>
	<view class="order-card">
		<view class="order-header">
			<text class="order-title">{{ order.title }}</text>
			<view :class="['status-badge', statusClass]">
				<text>{{ statusText }}</text>
			</view>
		</view>

		<view class="order-content">
			<text class="order-desc">{{ order.description || '暂无描述' }}</text>

			<view class="order-details">
				<view class="detail-item">
					<text class="detail-label">供应商:</text>
					<text class="detail-value">{{ order.customer_username || '未知供应商' }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">数量:</text>
					<text class="detail-value">{{ order.quantity }} 件</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">单价:</text>
					<text class="detail-value">¥{{ order.unit_price }}</text>
				</view>
			</view>

			<view class="order-footer">
				<text class="total-amount">总金额: ¥{{ totalAmount }}</text>
				<text class="order-date">{{ formattedDate }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue'
	import {
		useOrderUtils
	} from '@/composables/useOrderUtils.js'

	const props = defineProps({
		order: {
			type: Object,
			required: true
		}
	})

	const {
		getStatusClass,
		getStatusText,
		formatDate
	} = useOrderUtils()

	const statusClass = computed(() => getStatusClass(props.order.order_status))
	const statusText = computed(() => getStatusText(props.order.order_status))
	const formattedDate = computed(() => formatDate(props.order.created_at))
	const totalAmount = computed(() => {
		const quantity = Number(props.order.quantity) || 0
		const unitPrice = Number(props.order.unit_price) || 0
		return (quantity * unitPrice).toFixed(2)
	})
</script>

<style scoped>
	.order-card {
		background: white;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		border-left: 6rpx solid #667eea;
		transition: all 0.3s ease;
	}

	.order-card:active {
		transform: scale(0.98);
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
	}

	.order-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 20rpx;
	}

	.order-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		flex: 1;
		margin-right: 20rpx;
	}

	.status-badge {
		padding: 8rpx 20rpx;
		border-radius: 20rpx;
		font-size: 22rpx;
		font-weight: 500;
	}

	.status-pending {
		background: #fff3e0;
		color: #ef6c00;
	}

	.status-processing {
		background: #e3f2fd;
		color: #1976d2;
	}

	.status-completed {
		background: #e8f5e8;
		color: #2e7d32;
	}

	.status-cancelled {
		background: #ffebee;
		color: #c62828;
	}

	.order-desc {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
		line-height: 1.5;
	}

	.order-details {
		margin-bottom: 20rpx;
	}

	.detail-item {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.detail-label {
		font-size: 26rpx;
		color: #999;
		width: 120rpx;
	}

	.detail-value {
		font-size: 26rpx;
		color: #333;
		flex: 1;
	}

	.order-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		border-top: 1rpx solid #f0f0f0;
	}

	.total-amount {
		font-size: 28rpx;
		font-weight: 600;
		color: #ff6b35;
	}

	.order-date {
		font-size: 24rpx;
		color: #999;
	}
</style>