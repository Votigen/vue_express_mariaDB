<template>
	<view class="container">
		<div class="box2">
			<!-- 标题 -->
			<Mtitle title="采购订单"></Mtitle>

			<!-- 统计卡片 - 现在显示当前筛选条件下的统计数据 -->
			<StatsCards :totalOrders="totalOrders" :pendingCount="pendingCount" :totalAmount="totalAmount"
				:isFiltered="isFiltered" />

			<!-- 筛选和搜索 -->
			<FilterSection :searchKeyword="searchKeyword" :statusFilterIndex="statusFilterIndex"
				:statusFilters="statusFilters" @search="handleSearch" @clearSearch="clearSearch"
				@statusChange="onStatusFilterChange" />

			<!-- 订单列表 -->
			<OrderList :orders="filteredOrders" :loading="loading" :loadingMore="loadingMore" :refreshing="refreshing"
				:hasMore="hasMore" :searchKeyword="searchKeyword" @refresh="onRefresh" @loadMore="loadMore"
				class="orderList" />

			<!-- 底部按钮组 -->
			<view class="buttonLump">
				<newBar title="新建订单" to="/pages/NewOrder/NewOrder"></newBar>
			</view>
		</div>
	</view>
</template>

<script setup>
	import {
		onMounted,
		computed
	} from 'vue'
	import {
		useOrders
	} from '@/composables/useOrders.js'

	// 使用订单组合式函数
	const {
		orders,
		loading,
		loadingMore,
		refreshing,
		hasMore,
		searchKeyword,
		statusFilterIndex,
		statusFilters,
		filteredOrders,
		totalOrders,
		pendingCount,
		totalAmount,
		isFiltered,
		getMyOrders,
		handleSearch,
		clearSearch,
		onStatusFilterChange,
		onRefresh,
		loadMore
	} = useOrders()

	// 页面加载时获取数据
	onMounted(() => {
		console.log('🚀 页面加载完成，开始获取订单数据')
		getMyOrders(1)
	})
</script>

<style scoped>
	.container {
		position: relative;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 30rpx;
	}

	.orderList {
		/* border: solid 4px #667eea; */
		border-radius: 25rpx;
	}

	.box2 {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 20rpx;
		padding: 30rpx;
		height: 100%;
	}

	.buttonLump {
		margin-top: 40rpx;
		text-align: center;
	}
</style>