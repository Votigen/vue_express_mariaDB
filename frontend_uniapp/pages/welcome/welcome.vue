<template>
	<view class="container">
		<text class="welcome-text">Welcome to MT Supply Chain Management</text>
		<Mbutton content='开始旅程' class="btn" @click="handleStart"></Mbutton>
	</view>
</template>

<script>
	export default {
		methods: {
			handleStart() {
				console.log('🚀 开始旅程按钮点击');

				// 1. 设置已显示过欢迎页
				try {
					uni.setStorageSync('hasShownWelcome', true);
					console.log('✅ 已设置 hasShownWelcome');
				} catch (e) {
					console.error('存储失败:', e);
				}

				// 2. 检查登录状态
				const token = uni.getStorageSync('token');
				console.log('🔍 检查登录状态，token:', token);

				if (token) {
					// 已登录，跳转到主页
					console.log('✅ 用户已登录，跳转到主页');
					uni.switchTab({
						url: '/pages/personalPage/personalPage' // 或者你的首页路径
					});
				} else {
					// 未登录，跳转到登录页
					console.log('❌ 用户未登录，跳转到登录页');
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		background-image: url('@/static/background/OIP-C.webp');
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		background-attachment: fixed;
		width: 100%;
		height: 100vh;
	}

	.btn {
		margin-top: 80%;
	}

	.welcome-text {
		color: rgba(0, 0, 0, 0.8);
		font-size: 42px;
		margin: 30px 0;
		font-weight: 900;
		font-family: 'Noto Serif SC', serif;
		position: relative;
		top: 100px;
		left: 10px
	}
</style>