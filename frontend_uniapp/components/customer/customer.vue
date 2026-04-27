<!-- components/customer/customer.vue -->
<template>
	<navigator :url="to">
		<view class="box">
			<view class="box2">
				<!-- 头像 -->
				<image v-if="avatar" :src="avatar" class="colorLump avatar" mode="aspectFill"></image>
				<!-- 默认头像（如果没传） -->
				<view v-else class="colorLump default-avatar">
					{{ customer ? customer.slice(0, 1) : 'U' }}
				</view>

				<!-- 文本信息 -->
				<div class="info">
					<div class="customer">{{ customer }}</div>
					<div class="content">
						<!-- 显示公司（如果传了 company） -->
						<span v-if="company" class="company-tag">{{ company }}</span>
						<!-- 显示 content（bio） -->
						{{ content }}
					</div>
				</div>

				<!-- 右侧箭头图标 -->
				<view class="more-container">
					<text class="fas fa-chevron-right more"></text>
				</view>
			</view>
		</view>
	</navigator>
</template>

<script setup>
	import {
		defineProps
	} from 'vue';
	// const customer = '1111'
	const props = defineProps({
		customer: String,
		content: String,
		company: String, // 新增：公司
		avatar: String, // 新增：头像 URL
		to: {
			type: String,
			default: '' // 点击跳转的页面
		}
	});
</script>

<style scoped>
	/* 整体容器 */
	.box {
		margin-top: 10rpx;
		height: 120rpx;
		/* 稍微高一点更美观 */
		margin-left: 2%;
		width: 90%;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 0.7);
		display: flex;
		align-items: center;
		/* 水平居中 */
		padding: 0 20rpx;
	}

	/* 内部布局 */
	.box2 {
		display: flex;
		align-items: center;
		width: 100%;
		gap: 20rpx;
	}

	/* 头像样式 */
	.colorLump.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: #ccc;
	}

	/* 默认头像文字 */
	.default-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: #55557f;
		color: white;
		font-size: 32rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 文本信息区域 */
	.info {
		flex: 1;
		overflow: hidden;
		/* 防止文本溢出 */
	}

	/* 用户名 */
	.customer {
		margin-left: 0;
		font-size: 32rpx;
		font-weight: 900;
		color: #333;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* 内容区 */
	.content {
		margin: 0;
		font-size: 24rpx;
		color: #666;
		display: flex;
		align-items: center;
		gap: 10rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* 公司标签 */
	.company-tag {
		background-color: #007AFF;
		color: white;
		padding: 4rpx 12rpx;
		border-radius: 20rpx;
		font-size: 20rpx;
		font-weight: normal;
	}

	/* 右侧箭头 */
	.more-container {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 60rpx;
	}

	.more {
		font-size: 28rpx;
		color: #080808;
	}

	/* 图标字体（确保在 index.html 引入了 font-awesome） */
	.fas {
		font-family: 'Font Awesome 5 Free';
		font-weight: 900;
	}
</style>