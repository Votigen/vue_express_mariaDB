<template>
	<view class="section">
		<view class="section-title">
			<text class="section-icon">👤</text>
			<text class="section-text">个人信息</text>
		</view>
		<view class="box">
			<!-- 加载中 -->
			<view v-if="loading" class="loading-container">
				<view class="loading-spinner"></view>
				<text class="loading-text">加载中...</text>
			</view>
			<!-- 加载完成，显示卡片 -->
			<personalCard v-else :name="userInfo.username" :uid="userInfo.uid"
				:content="userInfo.brief || '这个人很懒，什么都没有写～'" class="user-card">
			</personalCard>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		userInfo: {
			type: Object,
			default: () => ({})
		},
		loading: {
			type: Boolean,
			default: true
		}
	})
</script>

<style scoped>
	.section {
		margin-bottom: 40rpx;
		animation: fadeInUp 0.6s ease-out;
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



	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 60rpx 0;
	}

	.loading-spinner {
		width: 60rpx;
		height: 60rpx;
		border: 4rpx solid #f3f3f3;
		border-top: 4rpx solid #667eea;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 20rpx;
	}

	.loading-text {
		color: #666;
		font-size: 28rpx;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

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
</style>