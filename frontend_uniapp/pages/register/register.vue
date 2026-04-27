<template>
	<view class="container">
		<view class="box">

			<Mtitle title="注册"></Mtitle>

			<view class="box2">
				<Minput title="手机号" class="input" placeholder="请输入手机号" v-model="phone"></Minput>
				<!-- 用户名 -->
				<Minput title="用户名" class="input" placeholder="请输入用户名" v-model="username"></Minput>
				<!-- 密码 -->
				<Minput title="密码" class="input" placeholder="请输入用户密码" type="password" v-model="password"></Minput>
				<!-- 确认密码 -->
				<Minput title="确认密码" class="input" placeholder="请确认用户密码" type="password" v-model="passwordConfirm">
				</Minput>
			</view>

			<!-- 登录按钮 -->
			<view class="btn" @click="handleRegister">
				<Mbutton content="注册"></Mbutton>
			</view>

		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const username = ref('')
	const password = ref('')
	const phone = ref('')
	const passwordConfirm = ref('')
	const handleRegister = async () => {
		console.log('📤 注册请求数据:', {
			phone: phone.value.trim(),
			username: username.value.trim(), // 加 trim 清洗空格
			password: password.value.trim(),
			passwordConfirm: passwordConfirm.value.trim()
		})

		// 1. 非空校验（用清洗后的值）
		const cleanPhone = phone.value.trim()
		const cleanUsername = username.value.trim()
		const cleanPassword = password.value.trim()
		const cleanPwdConfirm = passwordConfirm.value.trim()

		// 验证手机号格式（中国大陆）
		const phoneRegex = /^1[3-9]\d{9}$/
		if (!cleanPhone) {
			uni.showToast({
				title: '手机号不能为空',
				icon: 'none'
			})
			return
		}

		if (!phoneRegex.test(cleanPhone)) {
			uni.showToast({
				title: '请输入正确的手机号格式',
				icon: 'none'
			})
			return
		}

		if (!cleanUsername || !cleanPassword) {
			uni.showToast({
				title: '用户名和密码不能为空',
				icon: 'none'
			})
			return
		}

		// 可选：验证两次密码输入是否一致
		if (cleanPassword !== cleanPwdConfirm) {
			uni.showToast({
				title: '两次输入的密码不一致',
				icon: 'none'
			})
			return
		}

		try {
			// 2. 发起注册请求（注意：uni.request 返回的是包含 statusCode、data 的对象）
			const res = await uni.request({
				url: 'http://localhost:5000/api/users/register',
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
				},
				data: {
					phone: cleanPhone,
					username: cleanUsername,
					password: cleanPassword
				}
			})

			// 3. 解析响应：statusCode 是 HTTP 状态码，data 是后端返回的 JSON
			const {
				statusCode,
				data
			} = res

			// 4. 注册成功的判断：后端返回 201 + data.success === true
			if (statusCode === 201 && data.success) {
				uni.showToast({
					title: data.message || '注册成功',
					icon: 'success' // 成功用 success 图标更友好
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}, 1000)
			} else {
				// 业务失败（如用户名已存在，后端返回 409 + data.success === false）
				uni.showToast({
					title: data.message || '注册失败',
					icon: 'none'
				})
			}
		} catch (err) {
			// 只有网络错误（如跨域、服务器宕机、请求超时）才会进入这里
			console.error('注册接口网络错误:', err)
			uni.showToast({
				title: '网络错误或服务器无响应',
				icon: 'none'
			})
		}
	}
</script>
<style scoped>
	.btn {
		margin-top: 7%;
	}

	.box {
		/* padding: 30rpx; */
		/* border: solid 1px black; */
		border-radius: 30px 30px 0 0;
		height: 90%;
		width: 100%;
		bottom: 0;
		position: absolute;
		background-color: rgba(194, 194, 194, 0.7);
	}

	.box2 {
		margin-left: 10%;
		/* border: solid; */
		width: 80%;
	}

	.input {
		margin-top: 20px;
	}

	.container {
		position: relative;
		background-image: url('@/static/images/background/图片.jpg');
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		background-attachment: fixed;
		width: 100%;
		height: 100vh;
	}
</style>