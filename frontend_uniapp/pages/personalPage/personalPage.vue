<template>
	<view class="container">
		<!-- 标题 -->
		<view class="header">
			<Mtitle title="主页"></Mtitle>
		</view>

		<!-- 用户信息模块 -->
		<UserInfoSection :userInfo="userInfo" :loading="loading" />

		<!-- 主要功能模块 -->
		<MainFeaturesSection />

		<!-- 库存管理模块 -->
		<InventorySection />

		<!-- <navigator url='/pages/modal/modal'>
			<Mbutton content=" test">
			</Mbutton>
		</navigator> -->
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue'
	import {
		decodeToken
	} from '@/utils/jwt.js'

	// 响应式数据
	const userInfo = ref({})
	const loading = ref(true)

	// 获取用户信息
	const getUserInfo = async () => {
		loading.value = true

		try {
			const token = uni.getStorageSync('token')
			const decoded = decodeToken(token)
			if (!decoded) return

			const userId = decoded.userId || decoded.uid || decoded.id
			if (!token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				return
			}

			const result = await new Promise((resolve, reject) => {
				uni.request({
					url: `http://localhost:5000/api/users/users/${userId}`,
					method: 'GET',
					header: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					success: resolve,
					fail: reject
				})
			})

			console.log('完整响应:', result)

			if (result.statusCode === 200) {
				if (result.data && result.data.data) {
					userInfo.value = result.data.data
					console.log('用户信息(data.data):', userInfo.value)
				} else {
					userInfo.value = result.data
					console.log('用户信息(data):', userInfo.value)
				}
			} else {
				uni.showToast({
					title: result.data.message || '获取失败',
					icon: 'none'
				})
			}
		} catch (error) {
			console.error('获取用户信息失败:', error)
			uni.showToast({
				title: '网络错误',
				icon: 'none'
			})
		} finally {
			loading.value = false
		}
	}


	// 页面加载时获取数据
	onMounted(() => {
		getUserInfo()
	})
</script>

<style scoped>
	.container {
		position: relative;
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 30rpx;
	}

	.header {
		text-align: center;
		margin-bottom: 40rpx;
	}

	/* 响应式调整 */
	@media (max-width: 750rpx) {
		.container {
			padding: 20rpx;
		}
	}
</style>