<template>
	<view class="container">
		<view class="box">
			<Mtitle title="登录"></Mtitle>
			<view class="box2">
				<!-- 用户名 -->
				<Minput title="手机号" class="input" placeholder="请输入手机号" v-model="phone"></Minput>
				<!-- 密码 -->
				<Minput title="密码" class="input" placeholder="请输入用户密码" type="password" v-model="password"></Minput>
			</view>
			<!-- 登录按钮 -->
			<view class="btn" @click="handleLogin">
				<Mbutton content="登录"></Mbutton>
				<navigator url="/pages/register/register">
					<view class="nav-btn">
						<text> 还没有账号?立即注册</text>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const phone = ref('')
	const password = ref('')

	const handleLogin = async () => {
		console.log('📤 登录请求数据:', {
			phone: phone.value,
			password: password.value
		})

		if (!phone.value || !password.value) {
			uni.showToast({
				title: '请输入用户名和密码',
				icon: 'none'
			})
			return
		}

		try {
			const res = await uni.request({
				url: 'http://localhost:5000/api/login/login',
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
				},
				data: {
					phone: phone.value,
					password: password.value
				}
			})

			const {
				statusCode,
				data
			} = res
			if (statusCode === 200 && data.token) {
				uni.setStorageSync('token', data.token)
				uni.showToast({
					title: '登录成功',
					icon: 'success'
				})
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/personalPage/personalPage'
					})
				}, 1000)
			} else {
				uni.showToast({
					title: data.message || '登录失败',
					icon: 'none'
				})
			}
		} catch (err) {
			console.error('Login error:', err)
			uni.showToast({
				title: '网络错误或服务器无响应',
				icon: 'none'
			})
		}
	}
</script>
<style scoped>
	.btn {
		margin-top: 10%;
		/* border: solid; */
	}

	.nav-btn {
		margin-left: 30%;
	}

	.box {
		/* padding: 30rpx; */
		/* border: solid 1px black; */
		border-radius: 30px 30px 0 0;
		height: 70%;
		width: 100%;
		bottom: 0;
		position: absolute;
		background-color: rgba(194, 194, 194, 0.7);
	}

	.box2 {
		margin-top: 7%;
		margin-left: 10%;
		/* border: solid; */
		width: 80%;
	}

	.input {
		margin-top: 10px;
	}

	.container {
		position: relative;
		background-image: url('@/static/background/OIP-C.webp');
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		background-attachment: fixed;
		width: 100%;
		height: 100vh;
	}
</style>