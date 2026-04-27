<template>
	<view class="container">
		<div class="box">
			<!-- 标题 -->
			<Mtitle title="供应商"></Mtitle>

			<!-- 联系人列表 -->
			<view class="box2">
				<view class="scrollContent">
					<scroll-view scroll-y="true" class="scrollView">
						<!-- 使用 v-for 动态渲染 -->
						<customer v-for="contact in contacts" :key="contact.uid" :customer="contact.username"
							:content="contact.bio || '暂无签名'" :avatar="contact.avatar_url" :company="contact.company">
						</customer>
					</scroll-view>
				</view>
			</view>

			<!-- 底部按钮组 -->
			<view class="buttonLump">
				<newBar title="添加供应商" to="/pages/NewContact/NewContact"></newBar>
			</view>
		</div>
	</view>
</template>

<!-- src/pages/contacts/contacts.vue -->
<script setup>
	import {
		onMounted,
		ref
	} from 'vue'

	// 1. 定义联系人列表
	const contacts = ref([])

	// 2. 获取联系人数据
	const getContacts = async () => {
		try {
			const token = uni.getStorageSync('token') // uni-app 获取本地存储

			if (!token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				return
			}

			// 发起请求
			const res = await uni.request({
				url: 'http://localhost:5000/api/contacts/contacts',
				method: 'GET',
				header: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			})

			// 成功响应
			if (res.statusCode === 200) {
				console.log('获取到的联系人数据:', res.data.data);
				contacts.value = res.data.data // 把返回的联系人列表赋值
			} else {
				uni.showToast({
					title: '获取失败',
					icon: 'none'
				})
			}
		} catch (error) {
			console.error('获取联系人失败:', error)
			uni.showToast({
				title: '网络错误',
				icon: 'none'
			})
		}
	}

	// 3. 页面加载时获取数据
	onMounted(() => {
		getContacts()
	})
</script>

<style scoped>
	.box {
		/* border: solid; */
		padding: 10rpx;
		height: 90%;
	}

	.box2 {
		/* border: solid red; */
		height: 75%;
	}

	.buttonLump {
		/* border: solid 2px greenyellow; */
		margin-top: 10%;
	}

	.scrollView {
		/* border: solid; */
		height: 80%;
		/* padding: 10rpx; */
	}

	.scrollContent {
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
	}

	.container {
		position: relative;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		width: 100%;
		height: 100vh;
	}
</style>