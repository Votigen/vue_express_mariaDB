<!-- pages/orderDetails/orderDetails.vue -->
<template>
	<view class="container">
		<div class="box2">
			<Mtitle title="订单详情"></Mtitle>

			<view class="box">
				<!-- 加载中 -->
				<view v-if="loading" style="text-align: center; padding: 20px;">
					<text>加载中...</text>
				</view>

				<!-- 订单详情 -->
				<view v-else-if="orderData" class="detail-content">
					<orderDetail :order_id="orderData.order_id" :status="orderData.order_status"
						:product="orderData.product_id" :number='orderData.quantity' :singlePrice='orderData.unit_price'
						:startDate='orderData.created_at' :endDate="orderData.end_at"
						:totalPrice='orderData.total_price' />

					<!-- 简化版审批链 -->
					<view class="approval-section" v-if="showApprovalChain">
						<text class='section-title'>审批进度</text>
						<view class="status-flow">
							<view v-for="step in approvalSteps" :key="step.status"
								:class="['status-step', getStepStatus(step.status)]">
								<text class="step-dot"></text>
								<text class="step-label">{{ step.label }}</text>
								<text class="step-time" v-if="step.time">{{ step.time }}</text>
							</view>
						</view>
					</view>

					<text class='section-title'>采购方</text>
					<personalCard class="pCard" :name="creatorInfo.username" :uid="creatorInfo.uid"
						:content="creatorInfo.bio || '暂无简介'" />

					<text class='section-title'>供应方</text>
					<personalCard class="pCard" :name="customerInfo.username" :uid="customerInfo.uid"
						:content="customerInfo.bio || '暂无简介'" />
				</view>

				<!-- 订单不存在 -->
				<view v-else style="text-align: center; color: #999; padding: 20px;">
					<text>订单不存在或加载失败</text>
				</view>
			</view>
		</div>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	// 响应式数据
	const loading = ref(true)
	const orderData = ref(null)
	const creatorInfo = ref({})
	const customerInfo = ref({})

	// 状态映射
	const statusTextMap = {
		'draft': '草稿',
		'pending_approval': '待审批',
		'approved': '已批准',
		'rejected': '已拒绝',
		'confirmed': '已确认',
		'processing': '处理中',
		'completed': '已完成',
		'cancelled': '已取消'
	}

	// 审批步骤定义
	const approvalSteps = ref([{
			status: 'draft',
			label: '订单创建'
		},
		{
			status: 'pending_approval',
			label: '待审批'
		},
		{
			status: 'approved',
			label: '已批准'
		},
		{
			status: 'confirmed',
			label: '已确认'
		},
		{
			status: 'processing',
			label: '处理中'
		},
		{
			status: 'completed',
			label: '已完成'
		}
	])

	// 计算属性
	const showApprovalChain = computed(() => {
		return orderData.value && orderData.value.order_status !== 'draft'
	})

	const currentOrderStatus = computed(() => {
		return orderData.value?.order_status || 'draft'
	})

	onLoad(async (options) => {
		const orderId = options.orderId
		console.log('接收订单ID:', orderId)

		if (!orderId) {
			uni.showToast({
				title: '缺少订单ID',
				icon: 'none'
			})
			loading.value = false
			return
		}

		await getOrderDetail(orderId)
		loading.value = false
	})

	// 获取步骤状态
	const getStepStatus = (stepStatus) => {
		const currentStatus = currentOrderStatus.value
		const stepIndex = approvalSteps.value.findIndex(step => step.status === stepStatus)
		const currentIndex = approvalSteps.value.findIndex(step => step.status === currentStatus)

		if (currentStatus === 'rejected' && stepStatus === 'pending_approval') {
			return 'rejected'
		} else if (currentStatus === 'cancelled') {
			return stepStatus === currentStatus ? 'cancelled' : 'pending'
		} else if (stepIndex < currentIndex) {
			return 'completed'
		} else if (stepIndex === currentIndex) {
			return 'current'
		} else {
			return 'pending'
		}
	}

	// 获取订单详情
	const getOrderDetail = async (orderId) => {
		const token = uni.getStorageSync('token')
		if (!token) {
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			})
			return
		}

		try {
			const [err, res] = await new Promise((resolve) => {
				uni.request({
					url: `http://localhost:5000/api/orders/orderss/${orderId}`,
					method: 'GET',
					header: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					success: (result) => resolve([null, result]),
					fail: (error) => resolve([error, null])
				})
			})

			if (err) throw err

			if (res.statusCode === 200) {
				const data = res.data
				// 处理数组或对象响应
				orderData.value = Array.isArray(data) ?
					data.find(item => item.order_id === orderId) :
					data

				if (orderData.value) {
					await Promise.all([
						getUserInfo(orderData.value.creator_uid, 'creator'),
						getUserInfo(orderData.value.customer_uid, 'customer')
					])
				}
			} else {
				uni.showToast({
					title: res.data.message || '加载失败',
					icon: 'none'
				})
			}
		} catch (error) {
			console.error('请求订单详情失败:', error)
			uni.showToast({
				title: '网络错误',
				icon: 'none'
			})
		}
	}

	// 获取用户信息（统一处理创建者和客户）
	const getUserInfo = async (userId, type) => {
		if (!userId) {
			console.error(`缺少${type} UID`)
			return
		}

		try {
			const token = uni.getStorageSync('token')
			const [err, res] = await new Promise((resolve) => {
				uni.request({
					url: `http://localhost:5000/api/users/public/${userId}`,
					method: 'GET',
					header: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					success: (result) => resolve([null, result]),
					fail: (error) => resolve([error, null])
				})
			})

			if (err) throw err

			if (res.statusCode === 200) {
				if (type === 'creator') {
					creatorInfo.value = res.data
				} else {
					customerInfo.value = res.data
				}
			} else {
				// 设置默认信息
				const defaultInfo = {
					uid: userId,
					username: type === 'creator' ? '未知创建者' : '未知客户',
					bio: '信息加载失败'
				}
				if (type === 'creator') {
					creatorInfo.value = defaultInfo
				} else {
					customerInfo.value = defaultInfo
				}
			}
		} catch (error) {
			console.error(`获取${type}信息失败:`, error)
			const errorInfo = {
				uid: userId,
				username: type === 'creator' ? '未知创建者' : '未知客户',
				bio: '网络错误'
			}
			if (type === 'creator') {
				creatorInfo.value = errorInfo
			} else {
				customerInfo.value = errorInfo
			}
		}
	}
</script>

<style scoped>
	.container {
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		width: 100%;
		min-height: 100vh;
	}

	.section-title {
		display: block;
		margin: 20px 0 10px 10px;
		font-weight: bold;
		color: #333;
	}

	.pCard {
		margin-top: 10px;
	}

	/* 审批进度样式 */
	.approval-section {
		margin: 20px 0;
	}

	.status-flow {
		background: white;
		border-radius: 12px;
		padding: 20px;
		margin: 0 10px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.status-step {
		display: flex;
		align-items: center;
		padding: 12px 0;
		position: relative;
	}

	.status-step:not(:last-child)::after {
		content: '';
		position: absolute;
		left: 8px;
		top: 40px;
		width: 2px;
		height: calc(100% - 16px);
		background: #e0e0e0;
	}

	.step-dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		margin-right: 12px;
		background: #e0e0e0;
		border: 2px solid white;
		box-shadow: 0 0 0 2px #e0e0e0;
		z-index: 1;
	}

	.step-label {
		flex: 1;
		font-size: 14px;
		color: #666;
	}

	.step-time {
		font-size: 12px;
		color: #999;
	}

	/* 步骤状态 */
	.status-step.completed .step-dot {
		background: #4caf50;
		box-shadow: 0 0 0 2px #4caf50;
	}

	.status-step.completed .step-label {
		color: #4caf50;
		font-weight: 500;
	}

	.status-step.current .step-dot {
		background: #2196f3;
		box-shadow: 0 0 0 2px #2196f3;
		animation: pulse 2s infinite;
	}

	.status-step.current .step-label {
		color: #2196f3;
		font-weight: bold;
	}

	.status-step.rejected .step-dot {
		background: #f44336;
		box-shadow: 0 0 0 2px #f44336;
	}

	.status-step.rejected .step-label {
		color: #f44336;
		font-weight: 500;
	}

	.status-step.cancelled .step-dot {
		background: #ff9800;
		box-shadow: 0 0 0 2px #ff9800;
	}

	.status-step.cancelled .step-label {
		color: #ff9800;
		font-weight: 500;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.1);
		}

		100% {
			transform: scale(1);
		}
	}
</style>