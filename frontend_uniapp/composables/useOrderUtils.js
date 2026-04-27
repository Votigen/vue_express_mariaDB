// 订单工具函数
export function useOrderUtils() {
	// 状态相关函数
	const getStatusClass = (status) => {
		const statusMap = {
			'pending': 'status-pending',
			'processing': 'status-processing',
			'completed': 'status-completed',
			'cancelled': 'status-cancelled'
		}
		return statusMap[status] || 'status-pending'
	}

	const getStatusText = (status) => {
		const statusMap = {
			'pending': '待处理',
			'processing': '处理中',
			'completed': '已完成',
			'cancelled': '已取消'
		}
		return statusMap[status] || '待处理'
	}

	// 日期格式化
	const formatDate = (dateString) => {
		if (!dateString) return ''
		try {
			const date = new Date(dateString)
			return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
		} catch (error) {
			return ''
		}
	}

	return {
		getStatusClass,
		getStatusText,
		formatDate
	}
}