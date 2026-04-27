<template>
	<view class="container">
		<!-- 渐变背景 -->
		<view class="background-gradient"></view>

		<!-- 标题 -->
		<view class="header">
			<Mtitle title="个人信息"></Mtitle>
		</view>

		<!-- 内容区域 -->
		<view class="content">
			<!-- 个人信息卡片 -->
			<view class="section">
				<view class="section-title">
					<text class="section-icon">👤</text>
					<text class="section-text">基本信息</text>
				</view>
				<view class="box card-box">
					<view class="profile-header">
						<image class="avatar" :src="userInfo.avatar_url || '@/static/images/avatar/1.png'"
							mode="aspectFill" />
						<view class="user-main-info">
							<text class="username">{{ userInfo.username || '未设置用户名' }}</text>
							<text class="uid">UID: {{ userInfo.uid || '--' }}</text>
						</view>
					</view>

					<view class="info-grid">
						<view class="info-item">
							<text class="info-label">用户名</text>
							<view class="info-value">
								<input class="edit-input" v-model="editData.username" placeholder="请输入用户名"
									:class="{ 'editing': isEditing.username }" />
								<text class="edit-icon" @click="toggleEdit('username')">✏️</text>
							</view>
						</view>

						<view class="info-item">
							<text class="info-label">公司</text>
							<view class="info-value">
								<input class="edit-input" v-model="editData.company" placeholder="请输入公司名称"
									:class="{ 'editing': isEditing.company }" />
								<text class="edit-icon" @click="toggleEdit('company')">✏️</text>
							</view>
						</view>

						<view class="info-item full-width">
							<text class="info-label">个人简介</text>
							<view class="info-value">
								<textarea class="edit-textarea" v-model="editData.bio" placeholder="请输入个人简介"
									:class="{ 'editing': isEditing.bio }" maxlength="200" />
								<text class="edit-icon" @click="toggleEdit('bio')">✏️</text>
							</view>
							<text class="char-count">{{ editData.bio?.length || 0 }}/200</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 操作按钮 -->
			<view class="action-buttons">
				<button class="btn btn-secondary" @click="resetForm">重置</button>
				<button class="btn btn-primary" @click="saveProfile" :disabled="saving">
					<text v-if="saving" class="btn-loading">保存中...</text>
					<text v-else>保存更改</text>
				</button>
			</view>

			<!-- 退出登录按钮 -->
			<button @click="handleLogout" type="default" class="logout-btn">
				退出登录
			</button>

		</view>

		<!-- 加载状态 -->
		<view v-if="loading" class="loading-overlay">
			<view class="loading-content">
				<view class="loading-spinner"></view>
				<text class="loading-text">加载中...</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		reactive
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		decodeToken
	} from '@/utils/jwt.js'

	// 响应式数据
	const loading = ref(true)
	const saving = ref(false)
	const userInfo = ref({})

	// 编辑数据
	const editData = reactive({
		username: '',
		company: '',
		bio: ''
	})
	const handleLogout = () => {
		uni.showModal({
			title: '确认退出',
			content: '确定要退出登录吗？',
			confirmColor: '#ff4757',
			success: (res) => {
				if (res.confirm) {
					performLogout();
				}
			}
		});
	}

	const performLogout = () => {
		console.log('🚪 开始执行退出登录');

		// 1. 清除本地存储的 token
		uni.removeStorageSync('token');
		console.log('✅ token 已清除');

		// 2. 清除用户信息
		uni.removeStorageSync('userInfo');

		// 3. 显示退出成功提示
		uni.showToast({
			title: '退出成功',
			icon: 'success',
			duration: 1500
		});

		// 4. 跳转到登录页
		setTimeout(() => {
			console.log('🔄 跳转到登录页');
			uni.reLaunch({
				url: '/pages/login/login'
			});
		}, 1500);
	}
	// 编辑状态
	const isEditing = reactive({
		username: false,
		company: false,
		bio: false
	})

	// 页面加载
	onLoad(() => {
		getUserProfile()
	})

	// 获取用户信息
	const getUserProfile = async () => {
		loading.value = true
		try {
			const token = uni.getStorageSync('token')
			const decoded = decodeToken(token)
			if (!decoded) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				return
			}

			const userId = decoded.userId || decoded.uid || decoded.id

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

			if (result.statusCode === 200) {
				const data = result.data.data || result.data
				userInfo.value = data

				// 初始化编辑数据
				editData.username = data.username || ''
				editData.company = data.company || ''
				editData.bio = data.bio || ''

				console.log('用户信息加载成功:', userInfo.value)
			} else {
				uni.showToast({
					title: result.data.message || '获取用户信息失败',
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

	// 切换编辑状态
	const toggleEdit = (field) => {
		isEditing[field] = !isEditing[field]
	}

	// 重置表单
	const resetForm = () => {
		editData.username = userInfo.value.username || ''
		editData.company = userInfo.value.company || ''
		editData.bio = userInfo.value.bio || ''

		// 关闭所有编辑状态
		Object.keys(isEditing).forEach(key => {
			isEditing[key] = false
		})

		uni.showToast({
			title: '已重置',
			icon: 'success'
		})
	}

	// 保存个人信息
	const saveProfile = async () => {
		saving.value = true

		try {
			const token = uni.getStorageSync('token')
			const decoded = decodeToken(token)
			if (!decoded) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				return
			}

			const userId = decoded.userId

			// 准备更新数据
			const updateData = {}
			if (editData.username !== userInfo.value.username) {
				updateData.username = editData.username
			}
			if (editData.company !== userInfo.value.company) {
				updateData.company = editData.company
			}
			if (editData.bio !== userInfo.value.bio) {
				updateData.bio = editData.bio
			}

			// 如果没有变化
			if (Object.keys(updateData).length === 0) {
				uni.showToast({
					title: '没有更改需要保存',
					icon: 'none'
				})
				return
			}

			const result = await new Promise((resolve, reject) => {
				uni.request({
					url: `http://localhost:5000/api/users/users/${userId}`,
					method: 'PUT',
					header: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					data: updateData,
					success: resolve,
					fail: reject
				})
			})

			if (result.statusCode === 200) {
				// 更新本地数据
				userInfo.value = {
					...userInfo.value,
					...updateData
				}

				// 关闭编辑状态
				Object.keys(isEditing).forEach(key => {
					isEditing[key] = false
				})

				uni.showToast({
					title: '保存成功',
					icon: 'success'
				})
			} else {
				uni.showToast({
					title: result.data.message || '保存失败',
					icon: 'none'
				})
			}
		} catch (error) {
			console.error('保存个人信息失败:', error)
			uni.showToast({
				title: '网络错误',
				icon: 'none'
			})
		} finally {
			saving.value = false
		}
	}
</script>

<style scoped>
	.logout-btn {
		margin-top: 30rpx;
		font-weight: bold;
		background-color: #aa0000;
		color: #f0f0f0;
	}

	.container {
		position: relative;
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 30rpx;
	}

	.background-gradient {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		z-index: -1;
	}

	.header {
		text-align: center;
		margin-bottom: 40rpx;
	}

	.subtitle {
		color: rgba(255, 255, 255, 0.8);
		font-size: 28rpx;
		margin-top: 10rpx;
		font-weight: 300;
	}

	.content {
		animation: fadeInUp 0.6s ease-out;
	}

	.section {
		margin-bottom: 40rpx;
	}

	.section-title {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		padding-left: 20rpx;
	}

	.section-icon {
		font-size: 36rpx;
		margin-right: 15rpx;
	}

	.section-text {
		color: white;
		font-size: 32rpx;
		font-weight: 600;
	}

	.box {
		border-radius: 20rpx;
		overflow: hidden;
	}

	.card-box {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border: 1rpx solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
		padding: 40rpx;
	}

	.profile-header {
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
		border: 4rpx solid #fff;
		box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.1);
		background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
		margin-right: 30rpx;
	}

	.user-main-info {
		flex: 1;
	}

	.username {
		display: block;
		font-size: 36rpx;
		font-weight: 700;
		color: #2d3748;
		margin-bottom: 8rpx;
	}

	.uid {
		display: block;
		font-size: 26rpx;
		color: #718096;
		background: rgba(113, 128, 150, 0.1);
		padding: 6rpx 16rpx;
		border-radius: 12rpx;
		display: inline-block;
	}

	.info-grid {
		display: flex;
		flex-direction: column;
		gap: 30rpx;
	}

	.info-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.info-item.full-width {
		flex-direction: column;
		align-items: stretch;
	}

	.info-label {
		font-size: 30rpx;
		color: #4a5568;
		font-weight: 600;
		min-width: 160rpx;
	}

	.info-value {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.edit-input,
	.edit-textarea {
		flex: 1;
		font-size: 28rpx;
		color: #2d3748;
		padding: 16rpx 20rpx;
		border: 2rpx solid #e2e8f0;
		border-radius: 12rpx;
		background: #fff;
		transition: all 0.3s ease;
	}

	.edit-textarea {
		min-height: 120rpx;
		line-height: 1.5;
	}

	.edit-input.editing,
	.edit-textarea.editing {
		border-color: #667eea;
		background: #f7fafc;
	}

	.edit-icon {
		font-size: 28rpx;
		color: #667eea;
		cursor: pointer;
		padding: 10rpx;
		border-radius: 8rpx;
		transition: all 0.3s ease;
	}

	.edit-icon:active {
		background: rgba(102, 126, 234, 0.1);
		transform: scale(0.9);
	}

	.char-count {
		font-size: 24rpx;
		color: #a0aec0;
		text-align: right;
		margin-top: 10rpx;
	}

	.action-buttons {
		display: flex;
		gap: 20rpx;
		margin-top: 40rpx;
	}

	.btn {
		flex: 1;
		padding: 24rpx;
		border-radius: 16rpx;
		font-size: 30rpx;
		font-weight: 600;
		border: none;
		transition: all 0.3s ease;
	}

	.btn-primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.btn-primary:active {
		transform: scale(0.98);
		opacity: 0.9;
	}

	.btn-primary:disabled {
		opacity: 0.6;
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.9);
		color: #667eea;
		border: 2rpx solid #667eea;
	}

	.btn-secondary:active {
		background: rgba(102, 126, 234, 0.1);
	}

	.btn-loading {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 加载状态 */
	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.loading-content {
		background: rgba(255, 255, 255, 0.95);
		padding: 60rpx;
		border-radius: 20rpx;
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

	.loading-text {
		font-size: 28rpx;
		color: #666;
	}

	/* 动画 */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30rpx);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	/* 响应式调整 */
	@media (max-width: 750rpx) {
		.container {
			padding: 20rpx;
		}

		.card-box {
			padding: 30rpx;
		}

		.profile-header {
			flex-direction: column;
			text-align: center;
		}

		.avatar {
			margin-right: 0;
			margin-bottom: 20rpx;
		}

		.info-item {
			flex-direction: column;
			align-items: stretch;
			gap: 15rpx;
		}

		.info-value {
			width: 100%;
		}

		.action-buttons {
			flex-direction: column;
		}
	}
</style>