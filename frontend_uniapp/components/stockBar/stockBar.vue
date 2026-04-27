<template>
	<view class="order-card">
		<navigator :url="to" class="card-link">
			<view class="card-container">
				<!-- 头部信息 -->
				<view class="card-header">
					<text class="order-title">{{ title }}</text>
					<view class="status-container">
						<view class="status-dot" :style="{ backgroundColor: color }"></view>
						<text class="status-text">{{ status }}</text>
					</view>
				</view>

				<!-- 客户信息 -->
				<view v-if="customer" class="customer-info">
					<text class="customer-label">客户:</text>
					<text class="customer-name">{{ customer }}</text>
				</view>

				<!-- 内容区域 -->
				<view class="content-section">
					<text class="content-text">{{ content }}</text>
				</view>

				<!-- 底部操作 -->
				<view class="card-footer">
					<view class="more-action">
						<text class="more-text">查看详情</text>
						<text class="more-icon">›</text>
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue';

	const props = defineProps({
		title: String,
		customer: String,
		content: String,
		to: String,
		status: String,
		color: {
			type: String,
			default: '#667eea'
		}
	})
</script>

<style scoped>
	.order-card {
		margin: 20rpx 0;
		border-radius: 20rpx;
		background: #ffffff;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		overflow: hidden;
		transition: all 0.3s ease;
		border: 1rpx solid #f0f0f0;
	}

	.order-card:active {
		transform: translateY(-2rpx);
		box-shadow: 0 6rpx 30rpx rgba(0, 0, 0, 0.12);
		background: #fafbfc;
	}

	.card-link {
		display: block;
		text-decoration: none;
	}

	.card-container {
		padding: 30rpx;
	}

	/* 头部信息 */
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 20rpx;
	}

	.order-title {
		font-size: 34rpx;
		font-weight: 700;
		color: #1a1a1a;
		line-height: 1.4;
		flex: 1;
		margin-right: 20rpx;
	}

	.status-container {
		display: flex;
		align-items: center;
		background: rgba(102, 126, 234, 0.1);
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		min-width: 120rpx;
		justify-content: center;
	}

	.status-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		margin-right: 8rpx;
		flex-shrink: 0;
	}

	.status-text {
		font-size: 24rpx;
		font-weight: 600;
		color: #667eea;
		white-space: nowrap;
	}

	/* 客户信息 */
	.customer-info {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		padding: 12rpx 16rpx;
		background: #f8f9fa;
		border-radius: 12rpx;
	}

	.customer-label {
		font-size: 26rpx;
		color: #666;
		font-weight: 500;
		margin-right: 12rpx;
	}

	.customer-name {
		font-size: 26rpx;
		color: #333;
		font-weight: 600;
	}

	/* 内容区域 */
	.content-section {
		margin-bottom: 24rpx;
		padding: 20rpx;
		background: #fafbfc;
		border-radius: 12rpx;
		border-left: 4rpx solid #667eea;
	}

	.content-text {
		font-size: 28rpx;
		line-height: 1.6;
		color: #4a5568;
		word-wrap: break-word;
		word-break: break-word;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* 底部操作 */
	.card-footer {
		display: flex;
		justify-content: flex-end;
		padding-top: 20rpx;
		border-top: 1rpx solid #f0f0f0;
	}

	.more-action {
		display: flex;
		align-items: center;
		padding: 12rpx 24rpx;
		background: linear-gradient(135deg, #667eea, #764ba2);
		border-radius: 25rpx;
		color: white;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.more-action:active {
		transform: scale(0.95);
		opacity: 0.9;
	}

	.more-text {
		font-size: 26rpx;
		margin-right: 8rpx;
	}

	.more-icon {
		font-size: 32rpx;
		font-weight: bold;
	}

	/* 状态颜色变体 */
	.status-container.success {
		background: rgba(76, 175, 80, 0.1);
	}

	.status-container.success .status-text {
		color: #4caf50;
	}

	.status-container.warning {
		background: rgba(255, 152, 0, 0.1);
	}

	.status-container.warning .status-text {
		color: #ff9800;
	}

	.status-container.error {
		background: rgba(244, 67, 54, 0.1);
	}

	.status-container.error .status-text {
		color: #f44336;
	}

	/* 动画效果 */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20rpx);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.order-card {
		animation: fadeInUp 0.5s ease-out;
	}

	/* 响应式调整 */
	@media (max-width: 750rpx) {
		.card-container {
			padding: 24rpx;
		}

		.card-header {
			flex-direction: column;
			align-items: stretch;
			gap: 16rpx;
		}

		.order-title {
			margin-right: 0;
		}

		.status-container {
			align-self: flex-start;
		}

		.content-text {
			font-size: 26rpx;
			-webkit-line-clamp: 2;
		}

		.more-action {
			padding: 10rpx 20rpx;
		}
	}

	/* 深色模式支持 */
	@media (prefers-color-scheme: light) {
		.order-card {
			background: #2d3748;
			border-color: #4a5568;
		}

		.order-title {
			color: #f7fafc;
		}

		.customer-info {
			background: #4a5568;
		}

		.customer-label {
			color: #cbd5e0;
		}

		.customer-name {
			color: #f7fafc;
		}

		.content-section {
			background: #4a5568;
		}

		.content-text {
			color: #e2e8f0;
		}

		.card-footer {
			border-top-color: #4a5568;
		}
	}
</style>