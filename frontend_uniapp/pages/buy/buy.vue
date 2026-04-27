<template>
	<view class="container">
		<div class="box2">
			<!-- 修改标题 -->
			<Mtitle title="供货订单"></Mtitle>

			<!-- 统计卡片 -->
			<StatsCards :totalOrders="totalOrders" :pendingCount="pendingCount" :totalAmount="totalAmount"
				:isFiltered="isFiltered" />

			<!-- 筛选和搜索 -->
			<FilterSection :searchKeyword="searchKeyword" :statusFilterIndex="statusFilterIndex"
				:statusFilters="statusFilters" @search="handleSearch" @clearSearch="clearSearch"
				@statusChange="onStatusFilterChange" />

			<!-- 订单列表 -->
			<OrderList :orders="filteredOrders" :loading="loading" :loadingMore="loadingMore" :refreshing="refreshing"
				:hasMore="hasMore" :searchKeyword="searchKeyword" @refresh="onRefresh" @loadMore="loadMore" />

			<!-- 修改底部按钮文字 -->
			<view class="buttonLump">
				<!-- <newBar title="新建供货" to="/pages/NewSupply/NewSupply"></newBar> -->
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
		useSupplyOrders
	} from '@/composables/useSupplyOrders.js' // 修改导入
	// 使用供货订单组合式函数
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
		getMySupplyOrders, // 修改函数名
		handleSearch,
		clearSearch,
		onStatusFilterChange,
		onRefresh,
		loadMore
	} = useSupplyOrders()

	// 页面加载时获取数据
	onMounted(() => {
		console.log('🚀 供货页面加载完成，开始获取订单数据')
		getMySupplyOrders(1) // 修改函数调用
	})
</script>

<style scoped>
	.container {
		position: relative;
		min-height: 90vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 30rpx;
	}

	.orderList {
		border-radius: 25rpx;
	}

	.box2 {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 20rpx;
		padding: 30rpx;
		backdrop-filter: blur(10px);
		height: 100%;
		/* border: solid 1px black; */
	}

	.buttonLump {
		margin-top: 40rpx;
		text-align: center;
	}
</style>