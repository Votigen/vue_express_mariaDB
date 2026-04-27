<template>
	<view class="stats-cards">
		<view class="stat-card">
			<text class="stat-number">{{ totalOrders }}</text>
			<text class="stat-label">总订单数</text>
			<!-- <text class="stat-description">全部采购订单</text> -->
		</view>
		<view class="stat-card">
			<text class="stat-number">{{ pendingCount }}</text>
			<text class="stat-label">待处理</text>
			<!-- <text class="stat-description">全部待处理订单</text> -->
		</view>
		<view class="stat-card">
			<text class="stat-number">{{ totalAmount }}</text>
			<text class="stat-label">总金额(元)</text>
			<!-- <text class="stat-description">全部订单金额</text> -->
		</view>
	</view>
</template>

<script setup>
	defineProps({
		totalOrders: Number,
		pendingCount: Number,
		totalAmount: [String, Number]
	})
</script>

<style scoped>
	.stats-cards {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.stat-card {
		flex: 1;
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		padding: 20rpx;
		border-radius: 15rpx;
		text-align: center;
		margin: 0 10rpx;
		box-shadow: 0 4rpx 15rpx rgba(102, 126, 234, 0.3);
	}

	.stat-number {
		font-size: 36rpx;
		font-weight: bold;
		display: block;
		margin-bottom: 8rpx;
	}

	.stat-label {
		font-size: 26rpx;
		opacity: 0.95;
		display: block;
		margin-bottom: 5rpx;
	}

	.stat-description {
		font-size: 20rpx;
		opacity: 0.7;
		display: block;
	}
</style>