<template>
	<view class="container">
		<view class="box">
			<!-- 页面标题 -->
			<Mtitle title="创建采购订单"></Mtitle>

			<!-- 供应商选择 -->

			<view class="box2">
				<!-- 产品选择 -->
				<Minput title="选择产品" class="input" placeholder="请选择产品" v-model="selectedProductName" readonly
					@click="showProductList = true"></Minput>
				<Minput title="供应商" class="input" placeholder="请选择供应商" v-model="supplierName" readonly
					@click="showContactList = true"></Minput>
				<Minput title="订单标题" class="input" placeholder="请输入订单标题" v-model="title"></Minput>
				<Minput title="订单描述" class="input" placeholder="请输入订单描述（可选）" v-model="description"></Minput>
				<Minput title="产品数量" class="input" placeholder="请输入产品数量" type="number" v-model="quantity"></Minput>
				<Minput title="产品单价" class="input" placeholder="请输入产品单价" type="number" v-model="unitPrice"></Minput>


				<Minput title="持续天数" class="input" placeholder="请输入持续天数" type="number" v-model="durationDays"></Minput>

				<!-- 库存状态提醒 -->
				<view v-if="stockAlert.message" class="stock-alert" :class="stockAlert.type">
					<text class="alert-icon">{{ stockAlert.icon }}</text>
					<text class="alert-message">{{ stockAlert.message }}</text>
				</view>

				<!-- 显示总金额 -->
				<view class="total-amount" v-if="quantity && unitPrice">
					<text>订单总金额: {{ totalAmount }} 元</text>
					<text class="order-type-badge">采购</text>
				</view>
			</view>

			<!-- 创建按钮 -->
			<view class="btn" @click="handleCreateOrder">
				<Mbutton content="创建采购订单"></Mbutton>
			</view>

			<!-- 联系人选择模态框 -->
			<ContactModal v-if="showContactList" :contacts="contacts" @select="selectContact"
				@close="showContactList = false" />

			<!-- 产品选择模态框 -->
			<ProductModal v-if="showProductList" :products="availableProducts" @select="selectProduct"
				@close="showProductList = false" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		watch,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';


	// 响应式数据
	const supplierUid = ref('');
	const supplierName = ref('');
	const title = ref('');
	const description = ref('');
	const quantity = ref('');
	const unitPrice = ref('');
	const productId = ref('');
	const selectedProductName = ref('');
	const durationDays = ref('');
	const showContactList = ref(false);
	const showProductList = ref(false);
	// 库存提醒
	const stockAlert = ref({
		message: '',
		type: '',
		icon: ''
	});
	// 联系人和产品数据
	const contacts = ref([]);
	const availableProducts = ref([]);
	// 计算总金额
	const totalAmount = computed(() => {
		const number = parseFloat(quantity.value) || 0;
		const price = parseFloat(unitPrice.value) || 0;
		return (number * price).toFixed(2);
	});
	// 监听产品选择和数量变化，更新库存提醒
	watch([() => productId.value, () => quantity.value], () => {
		updateStockAlert();
	});
	// 选择联系人
	const selectContact = (contact) => {
		supplierUid.value = contact.uid;
		supplierName.value = contact.username;
		showContactList.value = false;
	};
	// 表单验证函数
	const validateForm = () => {
		if (!supplierUid.value) {
			uni.showToast({
				title: '请选择供应商',
				icon: 'none'
			});
			return false;
		}

		if (!title.value.trim()) {
			uni.showToast({
				title: '请输入订单标题',
				icon: 'none'
			});
			return false;
		}

		if (!quantity.value || parseInt(quantity.value) <= 0) {
			uni.showToast({
				title: '请输入有效的产品数量',
				icon: 'none'
			});
			return false;
		}

		if (!unitPrice.value || parseFloat(unitPrice.value) <= 0) {
			uni.showToast({
				title: '请输入有效的产品单价',
				icon: 'none'
			});
			return false;
		}

		// 检查库存警告
		if (stockAlert.value.type === 'error') {
			uni.showModal({
				title: '库存警告',
				content: stockAlert.value.message,
				confirmText: '继续创建',
				cancelText: '重新填写',
				success: (res) => {
					if (res.confirm) {
						// 用户确认继续创建
						return true;
					}
					return false;
				}
			});
		}

		return true;
	};
	// 选择产品
	const selectProduct = (product) => {
		productId.value = product.product_id;
		selectedProductName.value = product.product_name;
		showProductList.value = false;
		updateStockAlert();
	};
	// 创建订单函数
	const handleCreateOrder = async () => {
		// 先获取 token
		const token = uni.getStorageSync('token');
		if (!token) {
			uni.showModal({
				title: '登录已过期',
				content: '请重新登录',
				showCancel: false,
				confirmText: '去登录',
				success: () => {
					uni.redirectTo({
						url: '/pages/login/login'
					});
				}
			});
			return;
		}

		// 表单验证
		if (!validateForm()) {
			return;
		}

		try {
			uni.showLoading({
				title: '创建订单中...',
				mask: true
			});

			const requestData = {
				supplier_uid: parseInt(supplierUid.value),
				title: title.value,
				quantity: parseInt(quantity.value),
				unit_price: parseFloat(unitPrice.value),
				order_type: 'purchase'
			};

			if (description.value) requestData.description = description.value;
			if (productId.value) requestData.product_id = productId.value;
			if (durationDays.value) requestData.duration_days = parseInt(durationDays.value);

			console.log('发送的请求数据:', requestData);
			console.log('使用的token:', token); // 调试用

			const result = await new Promise((resolve, reject) => {
				uni.request({
					url: 'http://localhost:5000/api/orders/orders',
					method: 'POST',
					data: requestData,
					header: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					success: (res) => {
						console.log('请求成功:', res);
						resolve(res);
					},
					fail: (err) => {
						console.log('请求失败:', err);
						reject(err);
					}
				});
			});

			uni.hideLoading();

			if (result.statusCode === 201) {
				uni.showModal({
					title: '创建成功',
					content: `订单创建成功！\n订单号: ${result.data.data.order_id}\n状态: 等待审批\n下一步: 请等待上级审批通过`,
					showCancel: false,
					confirmText: '确定',
					success: (res) => {
						if (res.confirm) {
							resetForm();
							uni.navigateTo({
								url: '/pages/orders/orders'
							});
						}
					}
				});
			} else {
				// 处理其他状态码
				if (result.statusCode === 403) {
					throw {
						statusCode: 403,
						data: {
							message: '令牌无效或已过期'
						}
					};
				} else {
					throw result;
				}
			}
		} catch (error) {
			uni.hideLoading();

			console.log('完整错误信息:', error);

			let errorMessage = '创建订单失败，请重试';

			if (error.statusCode === 403 || (error.data && error.data.message && error.data.message.includes(
					'令牌'))) {
				errorMessage = '登录已过期，请重新登录';
				// 清除无效的 token
				uni.removeStorageSync('token');
				uni.showModal({
					title: '登录过期',
					content: errorMessage,
					showCancel: false,
					confirmText: '重新登录',
					success: () => {
						uni.redirectTo({
							url: '/pages/login/login'
						});
					}
				});
				return;
			}

			if (error.statusCode) {
				switch (error.statusCode) {
					case 400:
						errorMessage = `请求参数错误: ${error.data?.message || '请检查填写内容'}`;
						break;
					case 401:
						errorMessage = '登录已过期，请重新登录';
						break;
					case 500:
						errorMessage = `服务器错误: ${error.data?.message || '请稍后重试'}`;
						break;
					default:
						errorMessage = `网络错误 (${error.statusCode}): ${error.data?.message || '请检查网络连接'}`;
				}
			} else if (error.errMsg) {
				errorMessage = `请求失败: ${error.errMsg}`;
			}

			uni.showModal({
				title: '创建失败',
				content: errorMessage,
				showCancel: false,
				confirmText: '确定'
			});
		}
	};
	// 库存状态提醒
	const updateStockAlert = () => {
		if (!productId.value || !quantity.value) {
			stockAlert.value = {
				message: '',
				type: '',
				icon: ''
			};
			return;
		}

		const product = availableProducts.value.find(p => p.product_id === productId.value);
		if (!product) {
			stockAlert.value = {
				message: '该产品在库存中不存在，采购后将新增到库存',
				type: 'info',
				icon: 'ℹ️'
			};
			return;
		}

		const currentQuantity = product.quantity;
		const purchaseQuantity = parseInt(quantity.value) || 0;
		const futureQuantity = currentQuantity + purchaseQuantity;
		const maxCapacity = product.max_capacity || 1000; // 假设有最大容量限制

		// 采购订单的库存检查逻辑
		if (futureQuantity > maxCapacity) {
			stockAlert.value = {
				message: `警告：采购后库存将超过最大容量！当前: ${currentQuantity}，采购: ${purchaseQuantity}，总计: ${futureQuantity}，最大容量: ${maxCapacity}`,
				type: 'error',
				icon: '🚨'
			};
		} else if (futureQuantity > maxCapacity * 0.8) {
			stockAlert.value = {
				message: `注意：采购后库存将达到容量的${Math.round(futureQuantity/maxCapacity*100)}%，请确认仓储空间`,
				type: 'warning',
				icon: '⚠️'
			};
		} else {
			stockAlert.value = {
				message: `采购后库存将从 ${currentQuantity} 增加到 ${futureQuantity}`,
				type: 'success',
				icon: '📈'
			};
		}
	};

	// 重置表单函数
	const resetForm = () => {
		supplierUid.value = '';
		supplierName.value = '';
		title.value = '';
		description.value = '';
		quantity.value = '';
		unitPrice.value = '';
		productId.value = '';
		selectedProductName.value = '';
		durationDays.value = '';
		stockAlert.value = {
			message: '',
			type: '',
			icon: ''
		};
	};

	// 加载联系人数据
	const loadContacts = async () => {
		try {
			const token = uni.getStorageSync('token');
			if (!token) return;

			const result = await new Promise((resolve, reject) => {
				uni.request({
					url: 'http://localhost:5000/api/contacts/contacts',
					method: 'GET',
					header: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					success: resolve,
					fail: reject
				});
			});

			if (result.statusCode === 200) {
				if (result.data && result.data.data) {
					contacts.value = result.data.data;
				} else if (Array.isArray(result.data)) {
					contacts.value = result.data;
				}
				console.log('成功加载联系人:', contacts.value.length, '个');
			}
		} catch (error) {
			console.error('加载联系人失败:', error);
			uni.showToast({
				title: '加载联系人失败',
				icon: 'none'
			});
		}
	};

	// 加载产品数据
	const loadProducts = async () => {
		try {
			const token = uni.getStorageSync('token');
			if (!token) return;

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
				});
			});

			if (result.statusCode === 200) {
				if (result.data && result.data.data) {
					availableProducts.value = result.data.data;
				} else if (Array.isArray(result.data)) {
					availableProducts.value = result.data;
				}
				console.log('成功加载产品:', availableProducts.value.length, '个');
			}
		} catch (error) {
			console.error('加载产品失败:', error);
			uni.showToast({
				title: '加载产品失败',
				icon: 'none'
			});
		}
	};

	// 页面加载时的逻辑
	// 页面加载时的逻辑
	onLoad(() => {
		const token = uni.getStorageSync('token');
		console.log('页面加载，当前token:', token); // 调试

		if (!token) {
			uni.showModal({
				title: '未登录',
				content: '请先登录',
				showCancel: false,
				confirmText: '去登录',
				success: () => {
					uni.redirectTo({
						url: '/pages/login/login'
					});
				}
			});
			return;
		}

		// 加载数据
		loadContacts();
		loadProducts();
	});
</script>

<style scoped>
	.container {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 30rpx;
	}

	.box2 {
		/* border: solid; */
	}

	.box {
		padding: 40rpx;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 20rpx;

	}

	.input {
		margin-bottom: 30rpx;
	}

	.btn {
		margin-top: 40rpx;
		text-align: center;
	}

	.stock-alert {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-radius: 10rpx;
		margin: 20rpx 0;
		font-size: 28rpx;
	}

	.stock-alert.error {
		background: #ffebee;
		color: #c62828;
		border: 1rpx solid #ffcdd2;
	}

	.stock-alert.warning {
		background: #fff3e0;
		color: #ef6c00;
		border: 1rpx solid #ffe0b2;
	}

	.stock-alert.success {
		background: #e8f5e8;
		color: #2e7d32;
		border: 1rpx solid #c8e6c9;
	}

	.alert-icon {
		margin-right: 15rpx;
		font-size: 32rpx;
	}

	.total-amount {
		background: linear-gradient(135deg, #4caf50, #45a049);
		padding: 25rpx;
		border-radius: 15rpx;
		text-align: center;
		margin: 30rpx 0;
		font-size: 34rpx;
		color: white;
		font-weight: bold;
		box-shadow: 0 4rpx 15rpx rgba(76, 175, 80, 0.3);
		position: relative;
	}

	.order-type-badge {
		position: absolute;
		top: 10rpx;
		right: 20rpx;
		background: rgba(255, 255, 255, 0.3);
		padding: 5rpx 15rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
	}

	@media (max-width: 750rpx) {
		.box {
			width: 95%;
			padding: 30rpx;
		}
	}
</style>