<template>
	<view class="box">
		<view class="scrollContent">
			<scroll-view scroll-y="true" class="scrollView" @scrolltolower="handleLoadMore" refresher-enabled="true"
				:refresher-triggered="refreshing" @refresherrefresh="handleRefresh" :show-scrollbar="false">
				<!-- 下拉刷新 -->
				<view class="refresh-indicator" v-if="refreshing">
					<text>刷新中...</text>
				</view>

				<!-- 加载中 -->
				<view v-if="loading && orders.length === 0" class="loading-state">
					<view class="loading-spinner"></view>
					<text>加载中...</text>
				</view>

				<!-- 没有数据 -->
				<view v-else-if="orders.length === 0" class="empty-state">
					<text class="empty-icon">📦</text>
					<text class="empty-text">暂无订单</text>
					<text v-if="searchKeyword" class="empty-tip">尝试调整搜索条件</text>
				</view>

				<!-- 动态渲染订单 -->
				<template v-else>
					<navigator v-for="order in orders" :key="order.order_id"
						:url="`/pages/orderDetails/orderDetails?orderId=${order.order_id}`" class="order-item">
						<OrderCard :order="order" />
					</navigator>
				</template>

				<!-- 加载更多 -->
				<view v-if="loadingMore" class="load-more">
					<text>加载更多...</text>
				</view>

				<view v-if="!hasMore && orders.length > 0" class="no-more">
					<text>没有更多订单了</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		orders: {
			type: Array,
			default: () => []
		},
		loading: {
			type: Boolean,
			default: false
		},
		loadingMore: {
			type: Boolean,
			default: false
		},
		refreshing: {
			type: Boolean,
			default: false
		},
		hasMore: {
			type: Boolean,
			default: false
		},
		searchKeyword: {
			type: String,
			default: ''
		}
	})

	const emit = defineEmits(['refresh', 'loadMore'])

	const handleRefresh = () => {
		emit('refresh')
	}

	const handleLoadMore = () => {
		emit('loadMore')
	}
</script>

<style scoped>
	.box {
		height: 100%;
	}

	.scrollContent {
		height: 650rpx;
	}

	.scrollView {
		height: 100%;
		-webkit-overflow-scrolling: touch;
	}

	.refresh-indicator,
	.load-more,
	.no-more {
		text-align: center;
		padding: 30rpx;
		color: #999;
		font-size: 28rpx;
	}

	.loading-state {
		text-align: center;
		padding: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20rpx;
	}

	.loading-spinner {
		width: 60rpx;
		height: 60rpx;
		border: 4rpx solid #f3f3f3;
		border-top: 4rpx solid #667eea;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	.empty-state {
		text-align: center;
		padding: 100rpx 60rpx;
		color: #999;
	}

	.empty-icon {
		font-size: 120rpx;
		display: block;
		margin-bottom: 20rpx;
	}

	.empty-text {
		font-size: 32rpx;
		display: block;
		margin-bottom: 10rpx;
	}

	.empty-tip {
		font-size: 26rpx;
	}

	.order-item {
		margin-bottom: 20rpx;
	}
</style>