<template>
	<view class="container">
		<div class="box2">
			<Mtitle title="库存"></Mtitle>
			<view class="box">
				<view class="scrollContent">
					<scroll-view scroll-y="true" class="scrollView">
						<!-- 加载中 -->
						<view v-if="loading" class="loading" style="text-align: center; padding: 20px;">
							<text>加载中...</text>
						</view>

						<!-- 没有数据 -->
						<view v-else-if="inventory.length === 0" class="empty"
							style="text-align: center; color: #999; padding: 20px;">
							<text>暂无库存</text>
						</view>

						<!-- 库存列表 -->
						<view v-else>
							<stockBar v-for="product in inventory" :key="product.product_id"
								:title="product.product_name"
								:color="getStockColor(product.quantity, product.alert_threshold)"
								:content="`数量: ${product.quantity}`"
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
		ref
	} from 'vue'

	// 定义响应式数据
	const inventory = ref([]) // 库存列表
	const loading = ref(true) // 加载状态

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

			console.log('开始获取库存数据...')

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
				// 处理不同的响应结构
				if (result.data && result.data.data) {
					inventory.value = result.data.data
					console.log('成功加载库存:', inventory.value.length, '个产品')
				} else if (Array.isArray(result.data)) {
					inventory.value = result.data
					console.log('成功加载库存(数组格式):', inventory.value.length, '个产品')
				} else {
					console.error('库存数据格式异常:', result.data)
					uni.showToast({
						title: '库存数据格式错误',
						icon: 'none'
					})
					inventory.value = []
				}
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
</style>