<template>
	<view class="container">
		<div class="box2">
			<Mtitle title="库存预警"></Mtitle>
			<view class="box">
				<view class="filter-tabs">
					<view :class="['filter-tab', activeFilter === 'all' ? 'active' : '']" @click="changeFilter('all')">
						全部预警
					</view>
					<view :class="['filter-tab', activeFilter === 'outOfStock' ? 'active' : '']"
						@click="changeFilter('outOfStock')">
						缺货
					</view>
					<view :class="['filter-tab', activeFilter === 'lowStock' ? 'active' : '']"
						@click="changeFilter('lowStock')">
						库存偏低
					</view>
				</view>

				<view class="scrollContent">
					<scroll-view scroll-y="true" class="scrollView">
						<!-- 加载中 -->
						<view v-if="loading" class="loading" style="text-align: center; padding: 20px;">
							<text>加载中...</text>
						</view>

						<!-- 没有数据 -->
						<view v-else-if="filteredInventory.length === 0" class="empty"
							style="text-align: center; color: #999; padding: 20px;">
							<text>{{ getEmptyMessage() }}</text>
						</view>

						<!-- 预警库存列表 -->
						<view v-else>
							<stockBar v-for="product in filteredInventory" :key="product.product_id"
								:title="product.product_name"
								:color="getStockColor(product.quantity, product.alert_threshold)"
								:content="getStockContent(product)"
								:status="getStockStatus(product.quantity, product.alert_threshold)" class="as" />
						</view>
						<view style="display: flex;justify-content: center;height: 150rpx;">
							<text style="color: #999;">没有啦~😌</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</div>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		computed
	} from 'vue'

	// 定义响应式数据
	const inventory = ref([]) // 原始库存列表
	const loading = ref(true) // 加载状态
	const activeFilter = ref('all') // 当前激活的筛选类型

	// 筛选后的库存列表
	const filteredInventory = computed(() => {
		if (!inventory.value.length) return []

		switch (activeFilter.value) {
			case 'outOfStock':
				// 缺货商品
				return inventory.value.filter(product => product.quantity === 0)
			case 'lowStock':
				// 库存偏低商品 (有库存但低于预警阈值)
				return inventory.value.filter(product =>
					product.quantity > 0 &&
					product.alert_threshold &&
					product.quantity <= product.alert_threshold * 2
				)
			case 'all':
			default:
				// 所有预警商品 (缺货或库存偏低)
				return inventory.value.filter(product =>
					product.quantity === 0 ||
					(product.alert_threshold && product.quantity <= product.alert_threshold * 2)
				)
		}
	})

	const getStockStatus = (quantity, threshold) => {
		if (quantity === 0) return '缺货'
		if (!threshold) return '无阈值'
		if (quantity <= threshold) return '库存预警'
		if (quantity <= threshold * 2) return '库存偏低'
		return '库存正常'
	}

	const getStockColor = (quantity, threshold) => {
		if (!threshold) return 'blue'
		if (quantity === 0) return 'gray' // 无库存
		if (quantity <= threshold) return 'red' // 低于预警
		if (quantity <= threshold * 2) return 'orange' // 接近预警
		return 'green' // 安全库存
	}

	// 获取库存内容显示
	const getStockContent = (product) => {
		let content = `数量: ${product.quantity}`
		if (product.alert_threshold) {
			content += ` | 预警: ${product.alert_threshold}`
		}
		return content
	}

	// 获取空数据提示信息
	const getEmptyMessage = () => {
		switch (activeFilter.value) {
			case 'outOfStock':
				return '暂无缺货商品'
			case 'lowStock':
				return '暂无库存偏低商品'
			case 'all':
			default:
				return '暂无预警库存'
		}
	}

	// 切换筛选类型
	const changeFilter = (type) => {
		activeFilter.value = type
	}

	// 获取我的库存数据
	const getMyInventory = async () => {
		loading.value = true
		try {
			// 获取 token
			const token = uni.getStorageSync('token')
			if (!token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				loading.value = false
				return
			}

			console.log('开始获取库存预警数据...')

			// 使用 Promise 方式处理请求
			const result = await new Promise((resolve, reject) => {
				uni.request({
					url: 'http://localhost:5000/api/inventory/inventory',
					method: 'GET',
					header: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					success: resolve,
					fail: reject
				})
			})

			console.log('库存API响应:', result)

			// 处理响应
			if (result.statusCode === 200) {
				let data = []
				// 处理不同的响应结构
				if (result.data && result.data.data) {
					data = result.data.data
				} else if (Array.isArray(result.data)) {
					data = result.data
				} else {
					console.error('库存数据格式异常:', result.data)
					uni.showToast({
						title: '库存数据格式错误',
						icon: 'none'
					})
					inventory.value = []
					return
				}

				// 筛选出预警商品 (缺货或库存偏低)
				inventory.value = data.filter(product =>
					product.quantity === 0 ||
					(product.alert_threshold && product.quantity <= product.alert_threshold * 2)
				)

				console.log('成功加载预警库存:', inventory.value.length, '个产品')
			} else {
				console.error('获取库存失败，状态码:', result.statusCode)
				uni.showToast({
					title: result.data?.message || '获取库存失败',
					icon: 'none'
				})
				inventory.value = []
			}
		} catch (error) {
			console.error('获取库存失败:', error)
			uni.showToast({
				title: '网络错误，请检查连接',
				icon: 'none'
			})
			inventory.value = []
		} finally {
			loading.value = false
		}
	}

	// 页面加载时获取数据
	onMounted(() => {
		getMyInventory()
	})
</script>

<style scoped>
	.buttonLump {
		margin-top: 50px;
	}

	.scrollView {
		height: 100%;
	}

	.scrollContent {
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
	}

	.container {
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		background-attachment: fixed;
		width: 100%;
		height: 100vh;
	}

	.as {
		margin-top: 5px;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200rpx;
	}

	.empty {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200rpx;
		font-size: 32rpx;
		color: #999;
	}

	/* 筛选标签样式 */
	.filter-tabs {
		display: flex;
		justify-content: space-around;
		padding: 20rpx;
		background-color: #fff;
		border-bottom: 1px solid #f0f0f0;
	}

	.filter-tab {
		padding: 15rpx 30rpx;
		border-radius: 30rpx;
		font-size: 28rpx;
		color: #666;
		background-color: #f8f8f8;
		transition: all 0.3s;
	}

	.filter-tab.active {
		background-color: #2979ff;
		color: #fff;
		font-weight: bold;
	}
</style>