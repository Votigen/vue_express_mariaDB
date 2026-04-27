<template>
	<view class="modal-overlay" @click="$emit('close')">
		<view class="modal-content" @click.stop>
			<view class="modal-header">
				<text class="modal-title">选择产品</text>
				<text class="modal-close" @click="$emit('close')">✕</text>
			</view>
			<scroll-view scroll-y="true" class="modal-list">
				<view v-for="product in products" :key="product.product_id" class="product-item"
					@click="$emit('select', product)">
					<text class="product-name">{{ product.product_name }}</text>
					<text class="product-stock" :class="getStockStatusClass(product.quantity, product.alert_threshold)">
						库存: {{ product.quantity }}
					</text>
					<text
						class="product-status">{{ getStockStatusText(product.quantity, product.alert_threshold) }}</text>
				</view>
				<view v-if="products.length === 0" class="empty-state">
					<text class="empty-text">暂无产品</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		products: {
			type: Array,
			default: () => []
		}
	})

	defineEmits(['select', 'close'])

	// 获取库存状态样式
	const getStockStatusClass = (quantity, threshold) => {
		if (quantity === 0) return 'out-of-stock';
		if (!threshold) return 'no-threshold';
		if (quantity <= threshold) return 'low-stock';
		if (quantity <= threshold * 2) return 'medium-stock';
		return 'good-stock';
	}

	// 获取库存状态文本
	const getStockStatusText = (quantity, threshold) => {
		if (quantity === 0) return '缺货';
		if (!threshold) return '无阈值';
		if (quantity <= threshold) return '库存预警';
		if (quantity <= threshold * 2) return '库存偏低';
		return '库存正常';
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

	.product-item {
		padding: 25rpx 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.product-item:active {
		background: #f5f5f5;
	}

	.product-name {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		display: block;
	}

	.product-stock {
		font-size: 24rpx;
		display: block;
		margin-top: 5rpx;
	}

	.product-stock.out-of-stock {
		color: #f44336;
	}

	.product-stock.low-stock {
		color: #ff9800;
	}

	.product-stock.medium-stock {
		color: #ffc107;
	}

	.product-stock.good-stock {
		color: #4caf50;
	}

	.product-stock.no-threshold {
		color: #2196f3;
	}

	.product-status {
		font-size: 22rpx;
		color: #999;
		display: block;
		margin-top: 2rpx;
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