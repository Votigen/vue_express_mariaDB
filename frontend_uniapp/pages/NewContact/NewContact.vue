<template>
	<view class="container">
		<view class="box">
			<!-- 页面标题 -->
			<Mtitle title="添加供应商"></Mtitle>

			<!-- 搜索用户 -->
			<Minput title="搜索用户" class="input" placeholder="请输入用户名搜索" v-model="searchKeyword"></Minput>

			<!-- 用户列表 -->
			<view class="user-list" v-if="allUsers.length > 0">
				<view class="result-title">所有用户 ({{ filteredUsers.length }})</view>
				<view class="user-item" v-for="user in filteredUsers" :key="user.uid" @click="selectUser(user)">
					<view class="user-avatar">
						<text class="avatar-placeholder">{{ user.username.charAt(0).toUpperCase() }}</text>
					</view>
					<view class="user-info">
						<view class="name-row">
							<text class="username">{{ user.username }}</text>
							<text class="role-badge" v-if="user.role">{{ user.role }}</text>
						</view>
						<text class="company" v-if="user.company">{{ user.company }}</text>
						<text class="bio" v-if="user.bio">{{ user.bio }}</text>
					</view>
					<text class="add-btn" v-if="!isContact(user.uid)">添加</text>
					<text class="added-btn" v-else>已添加</text>
				</view>
			</view>

			<!-- 加载状态 -->
			<view class="loading" v-if="isLoading">
				<text>加载中...</text>
			</view>

			<!-- 空状态 -->
			<view class="empty-state" v-else-if="!isLoading && allUsers.length === 0">
				<text class="empty-text">暂无用户数据</text>
			</view>

			<!-- 筛选提示 -->
			<view class="filter-info" v-if="searchKeyword && filteredUsers.length === 0">
				<text class="empty-text">未找到匹配的用户</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue';

	// 响应式数据
	const searchKeyword = ref('');
	const allUsers = ref([]);
	const myContacts = ref([]);
	const isLoading = ref(false);

	// 过滤用户列表
	const filteredUsers = computed(() => {
		if (!searchKeyword.value) {
			return allUsers.value;
		}
		const keyword = searchKeyword.value.toLowerCase();
		return allUsers.value.filter(user =>
			user.username.toLowerCase().includes(keyword) ||
			(user.email && user.email.toLowerCase().includes(keyword)) ||
			(user.company && user.company.toLowerCase().includes(keyword)) ||
			(user.bio && user.bio.toLowerCase().includes(keyword))
		);
	});

	// 检查是否已经是联系人
	const isContact = (uid) => {
		return myContacts.value.some(contact => contact.uid === uid);
	};

	// 选择用户
	const selectUser = async (user) => {
		// 如果是自己，提示不能添加
		const currentUser = uni.getStorageSync('userInfo');
		if (currentUser && currentUser.uid === user.uid) {
			uni.showToast({
				title: '不能添加自己为供应商',
				icon: 'none'
			});
			return;
		}

		// 如果已经是联系人，提示
		if (isContact(user.uid)) {
			uni.showToast({
				title: '该用户已是您的供应商',
				icon: 'none'
			});
			return;
		}

		try {
			uni.showLoading({
				title: '添加中...',
				mask: true
			});

			const token = uni.getStorageSync('token');
			const result = await new Promise((resolve, reject) => {
				uni.request({
					url: 'http://localhost:5000/api/contacts/contacts',
					method: 'POST',
					data: {
						contact_id: user.uid
					},
					header: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					success: resolve,
					fail: reject
				});
			});

			uni.hideLoading();

			if (result.statusCode === 201) {
				uni.showToast({
					title: '添加供应商成功',
					icon: 'success',
					duration: 2000
				});

				// 刷新联系人列表
				loadMyContacts();

			} else {
				let errorMessage = result.data.message || '添加失败';
				throw new Error(errorMessage);
			}

		} catch (error) {
			console.error('添加供应商失败:', error);
			uni.showToast({
				title: error.message || '添加失败，请重试',
				icon: 'none',
				duration: 3000
			});
		}
	};

	// 加载所有用户
	const loadAllUsers = async () => {
		isLoading.value = true;
		try {
			const token = uni.getStorageSync('token');
			const result = await new Promise((resolve, reject) => {
				uni.request({
					url: 'http://localhost:5000/api/users/users2',
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
				allUsers.value = result.data.data || [];
			}
		} catch (error) {
			console.error('加载用户列表失败:', error);
			uni.showToast({
				title: '加载用户失败',
				icon: 'none'
			});
		} finally {
			isLoading.value = false;
		}
	};

	// 加载我的联系人
	const loadMyContacts = async () => {
		try {
			const token = uni.getStorageSync('token');
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
				myContacts.value = result.data.data || [];
			}
		} catch (error) {
			console.error('加载联系人失败:', error);
		}
	};

	// 页面加载
	onMounted(() => {
		const token = uni.getStorageSync('token');
		if (!token) {
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
			setTimeout(() => uni.navigateTo({
				url: '/pages/login/login'
			}), 1500);
			return;
		}

		loadAllUsers();
		loadMyContacts();
	});
</script>

<style scoped>
	.container {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 30rpx;
		min-height: 100vh;
	}

	.box {
		padding: 40rpx;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 20rpx;
	}

	.input {
		margin-bottom: 30rpx;
		width: 85%;
	}

	.user-list {
		margin-top: 20rpx;
	}

	.result-title {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
		font-weight: bold;
	}

	.user-item {
		display: flex;
		align-items: center;
		padding: 25rpx;
		background: white;
		border-radius: 12rpx;
		margin-bottom: 15rpx;
		border: 1rpx solid #e9ecef;
	}

	.user-item:active {
		background: #f8f9fa;
	}

	.user-avatar {
		margin-right: 20rpx;
	}

	.avatar-placeholder {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background: #667eea;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: bold;
	}

	.user-info {
		flex: 1;
	}

	.name-row {
		display: flex;
		align-items: center;
		margin-bottom: 5rpx;
	}

	.username {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-right: 15rpx;
	}

	.role-badge {
		background: #e9ecef;
		color: #666;
		padding: 4rpx 12rpx;
		border-radius: 12rpx;
		font-size: 22rpx;
	}

	.company {
		display: block;
		font-size: 26rpx;
		color: #666;
		margin-bottom: 3rpx;
	}

	.bio {
		display: block;
		font-size: 24rpx;
		color: #999;
	}

	.add-btn {
		background: #667eea;
		color: white;
		padding: 12rpx 24rpx;
		border-radius: 20rpx;
		font-size: 26rpx;
	}

	.added-btn {
		background: #28a745;
		color: white;
		padding: 12rpx 24rpx;
		border-radius: 20rpx;
		font-size: 26rpx;
	}

	.loading,
	.empty-state,
	.filter-info {
		text-align: center;
		padding: 60rpx;
		color: #666;
		font-size: 28rpx;
	}

	@media (max-width: 750rpx) {
		.box {
			width: 95%;
			padding: 30rpx;
		}
	}
</style>