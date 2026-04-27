import {
	ref,
	computed
} from 'vue'

export function useOrders() {
	// 响应式数据
	const orders = ref([])
	const loading = ref(false)
	const loadingMore = ref(false)
	const refreshing = ref(false)
	const hasMore = ref(true)
	const searchKeyword = ref('')
	const statusFilterIndex = ref(0)
	const currentPage = ref(1)
	const pageSize = ref(10)

	// 🔥 新增：存储全部订单的统计数据
	const allOrdersStats = ref({
		total_orders: 0,
		pending_orders: 0,
		total_amount: '0.00'
	})

	// 状态筛选选项
	const statusFilters = ref([{
			label: '全部状态',
			value: ''
		},
		{
			label: '待处理',
			value: 'pending'
		},
		{
			label: '处理中',
			value: 'processing'
		},
		{
			label: '已完成',
			value: 'completed'
		},
		{
			label: '已取消',
			value: 'cancelled'
		}
	])

	// 计算是否正在筛选
	const isFiltered = computed(() => {
		return searchKeyword.value !== '' || statusFilters.value[statusFilterIndex.value]?.value !== ''
	})

	// 计算属性
	const filteredOrders = computed(() => orders.value)

	// 🔥 修改：统计信息使用后端返回的全部订单统计数据
	const totalOrders = computed(() => allOrdersStats.value.total_orders)

	const pendingCount = computed(() => allOrdersStats.value.pending_orders)

	const totalAmount = computed(() => allOrdersStats.value.total_amount)

	// 获取订单数据
	const getMyOrders = async (page = 1, isRefresh = false) => {
		console.log('🔄 开始获取订单数据，页码:', page, '搜索:', searchKeyword.value, '状态:', statusFilters.value[
			statusFilterIndex.value]?.value)

		if (page === 1) {
			loading.value = true
			if (isRefresh) {
				orders.value = []
			}
		} else {
			loadingMore.value = true
		}

		try {
			const token = uni.getStorageSync('token')
			if (!token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				loading.value = false
				loadingMore.value = false
				return
			}

			// 构建查询参数
			const params = {
				page,
				limit: pageSize.value
			}

			// 添加搜索关键词
			if (searchKeyword.value) {
				params.keyword = searchKeyword.value
			}

			// 添加状态筛选
			const statusFilter = statusFilters.value[statusFilterIndex.value]?.value
			if (statusFilter) {
				params.status = statusFilter
			}

			console.log('🔍 请求参数:', params)

			// 使用 Promise 方式调用 uni.request
			const [err, res] = await new Promise((resolve) => {
				uni.request({
					url: 'http://localhost:5000/api/orders/purchase',
					method: 'GET',
					data: params,
					header: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					success: (result) => resolve([null, result]),
					fail: (error) => resolve([error, null])
				})
			})

			if (err) {
				console.error('🔍 请求错误:', err)
				uni.showToast({
					title: '网络请求失败',
					icon: 'none'
				})
				return
			}

			if (res.statusCode === 200 && res.data.success) {
				const responseData = res.data.data
				const newOrders = responseData.orders || []
				const pagination = responseData.pagination || {}

				// 🔥 新增：保存全部订单的统计数据
				if (responseData.statistics) {
					allOrdersStats.value = responseData.statistics
				}

				console.log('🔍 解析的订单数据:', {
					当前页数据: newOrders.length,
					全部统计数据: allOrdersStats.value
				})

				if (page === 1) {
					orders.value = newOrders
				} else {
					// 去重处理
					const existingIds = new Set(orders.value.map(order => order.order_id))
					const uniqueNewOrders = newOrders.filter(order => !existingIds.has(order.order_id))
					orders.value = [...orders.value, ...uniqueNewOrders]
				}

				// 更新分页状态
				hasMore.value = page < (pagination.total_pages || 1)
				currentPage.value = page

				console.log('✅ 数据加载成功:', {
					当前页: page,
					总页数: pagination.total_pages,
					是否有下一页: hasMore.value,
					当前订单数: orders.value.length,
					全部订单数: totalOrders.value,
					全部待处理: pendingCount.value,
					全部金额: totalAmount.value
				})

			} else {
				const errorMsg = res.data?.message || '获取数据失败'
				console.error('❌ 请求失败:', errorMsg)
				uni.showToast({
					title: errorMsg,
					icon: 'none'
				})
			}
		} catch (error) {
			console.error('💥 获取订单失败:', error)
			uni.showToast({
				title: '请求异常: ' + (error.message || '未知错误'),
				icon: 'none'
			})
		} finally {
			loading.value = false
			loadingMore.value = false
			refreshing.value = false
		}
	}

	// 搜索处理
	let searchTimer = null
	const handleSearch = (keyword) => {
		console.log('🔍 处理搜索:', keyword)
		searchKeyword.value = keyword
		if (searchTimer) {
			clearTimeout(searchTimer)
		}
		searchTimer = setTimeout(() => {
			console.log('🔍 执行搜索，关键词:', searchKeyword.value)
			currentPage.value = 1
			getMyOrders(1, true)
		}, 500)
	}

	const clearSearch = () => {
		console.log('🧹 清除搜索')
		searchKeyword.value = ''
		currentPage.value = 1
		getMyOrders(1, true)
	}

	// 状态筛选变化
	const onStatusFilterChange = (e) => {
		const index = e.detail?.value || 0
		console.log('🔍 状态筛选变化:', statusFilters.value[index]?.label)
		statusFilterIndex.value = index
		currentPage.value = 1
		getMyOrders(1, true)
	}

	// 下拉刷新
	const onRefresh = () => {
		console.log('🔄 下拉刷新')
		refreshing.value = true
		getMyOrders(1, true)
	}

	// 加载更多
	const loadMore = () => {
		if (!loadingMore.value && hasMore.value && !loading.value) {
			console.log('📥 加载更多数据')
			getMyOrders(currentPage.value + 1)
		}
	}

	return {
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
	}
}