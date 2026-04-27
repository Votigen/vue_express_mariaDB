<!-- components/orderDetail.vue -->
<template>
	<view class="order-card">
		<view class="card-content">
			<!-- 头部信息 -->
			<view class="header-section">
				<text class="order-id">订单号: {{ order_id }}</text>
				<view class="status-badge">
					<view class="status-dot" :style="{ backgroundColor: getStatusColor(status) }"></view>
					<text class="status-text">{{ getStatusText(status) }}</text>
				</view>
			</view>

			<!-- 产品详情 -->
			<view class="product-section">
				<text class="section-title">订单详情</text>
				<view class="detail-grid">
					<view class="detail-item">
						<text class="label">产品编号</text>
						<text class="value">{{ product || '--' }}</text>
					</view>
					<view class="detail-item">
						<text class="label">数量</text>
						<text class="value">{{ number || 0 }}</text>
					</view>
					<view class="detail-item">
						<text class="label">单价</text>
						<text class="value">¥{{ singlePrice || 0 }}</text>
					</view>
				</view>
			</view>

			<!-- 底部信息 -->
			<view class="footer-section">
				<view class="total-price">
					<text class="total-label">总价:</text>
					<text class="total-value">¥{{ totalPrice || 0 }}</text>
				</view>
				<view class="date-range">
					<text class="date">{{ formatDate(startDate) }}</text>
					<text class="separator">至</text>
					<text class="date">{{ formatDate(endDate) }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue'

	const props = defineProps({
		order_id: {
			type: String,
			default: ''
		},
		status: {
			type: String,
			default: 'draft'
		},
		product: {
			type: String,
			default: ''
		},
		number: {
			type: Number,
			default: 0
		},
		singlePrice: {
			type: Number,
			default: 0
		},
		totalPrice: {
			type: Number,
			default: 0
		},
		startDate: {
			type: String,
			default: ''
		},
		endDate: {
			type: String,
			default: ''
		}
	})

	// 根据状态返回颜色 - 更新为完整的数据库状态映射
	const getStatusColor = (status) => {
		const statusMap = {
			'draft': '#999999', // 灰色 - 草稿
			'pending_approval': '#FF9800', // 橙色 - 待审批
			'approved': '#4CAF50', // 绿色 - 已批准
			'rejected': '#F44336', // 红色 - 已拒绝
			'confirmed': '#2196F3', // 蓝色 - 已确认
			'processing': '#2196F3', // 蓝色 - 处理中
			'completed': '#4CAF50', // 绿色 - 已完成
			'cancelled': '#F44336' // 红色 - 已取消
		}
		return statusMap[status] || '#999'
	}

	// 获取状态文本 - 更新为完整的数据库状态映射
	const getStatusText = (status) => {
		const statusMap = {
			'draft': '草稿',
			'pending_approval': '待审批',
			'approved': '已批准',
			'rejected': '已拒绝',
			'confirmed': '已确认',
			'processing': '处理中',
			'completed': '已完成',
			'cancelled': '已取消'
		}
		return statusMap[status] || '未知状态'
	}

	// 格式化日期
	const formatDate = (dateString) => {
		if (!dateString) return '--'
		try {
			const date = new Date(dateString)
			return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
		} catch {
			return dateString
		}
	}
</script>

<style scoped>
	.order-card {
		width: 100%;
		margin: 16rpx 0;
	}

	.card-content {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
		border: 1rpx solid #f1f3f4;
	}

	/* 头部信息 */
	.header-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.order-id {
		font-size: 28rpx;
		color: #666;
		font-weight: 500;
	}

	.status-badge {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	.status-dot {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
	}

	.status-text {
		font-size: 26rpx;
		color: #333;
		font-weight: 500;
	}

	/* 产品详情 */
	.product-section {
		margin-bottom: 30rpx;
	}

	.section-title {
		display: block;
		font-size: 30rpx;
		color: #333;
		font-weight: 600;
		margin-bottom: 20rpx;
	}

	.detail-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 20rpx;
	}

	.detail-item {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}

	.label {
		font-size: 24rpx;
		color: #999;
	}

	.value {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}

	/* 底部信息 */
	.footer-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		border-top: 1rpx solid #f5f5f5;
	}

	.total-price {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	.total-label {
		font-size: 28rpx;
		color: #666;
	}

	.total-value {
		font-size: 32rpx;
		color: #ff6b35;
		font-weight: 600;
	}

	.date-range {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	.date {
		font-size: 26rpx;
		color: #999;
		padding: 6rpx 12rpx;
		background: #f8f9fa;
		border-radius: 8rpx;
	}

	.separator {
		font-size: 24rpx;
		color: #ccc;
	}

	/* 响应式调整 */
	@media (max-width: 750rpx) {
		.card-content {
			padding: 24rpx;
		}

		.detail-grid {
			grid-template-columns: 1fr;
			gap: 16rpx;
		}

		.detail-item {
			flex-direction: row;
			justify-content: space-between;
		}

		.footer-section {
			flex-direction: column;
			align-items: flex-start;
			gap: 16rpx;
		}

		.date-range {
			align-self: flex-end;
		}
	}
</style>