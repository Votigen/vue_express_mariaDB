<template>
	<view class="personal-card">
		<view class="card-content">
			<!-- 左侧头像 -->
			<image class="avatar" src='@/static/images/avatar/1.png' mode="aspectFill" />

			<!-- 中间信息区域 -->
			<view class="info-section">
				<view class="name-line">
					<text class="name">{{ name }}</text>
				</view>
				<text class="content">{{ content }}</text>
			</view>

			<!-- 右侧装饰 -->
			<view class="decorator" :style="{ background: color }"></view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue';

	const props = defineProps({
		name: {
			type: String,
			default: '未知用户'
		},
		uid: {
			type: [String, Number],
			default: '---'
		},
		content: {
			type: String,
			default: '暂无简介'
		},
		color: {
			type: String,
			default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
		}
	})
</script>

<style lang="scss" scoped>
	.personal-card {
		width: 100%;
		margin: 16rpx 0;
	}

	.card-content {
		display: flex;
		align-items: center;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 24rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
		border: 1rpx solid #f1f3f4;
		position: relative;
		overflow: hidden;
		height: 140rpx;
		transition: all 0.2s ease;
	}

	.card-content:active {
		background: #fafbfc;
		transform: scale(0.98);
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 16rpx;
		border: 2rpx solid #fff;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		flex-shrink: 0;
		margin-right: 24rpx;
	}

	.info-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
	}

	.name-line {
		display: flex;
		align-items: center;
		margin-bottom: 12rpx;
	}

	.name {
		font-size: 32rpx;
		font-weight: 600;
		color: #1a1a1a;
		line-height: 1;
		margin-right: 16rpx;
	}

	.uid {
		font-size: 22rpx;
		color: #666;
		background: #f5f5f5;
		padding: 4rpx 12rpx;
		border-radius: 8rpx;
		font-weight: 500;
		line-height: 1;
	}

	.content {
		font-size: 26rpx;
		color: #666;
		line-height: 1.4;
		/* 文本溢出处理 */
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
	}

	.decorator {
		position: absolute;
		top: 0;
		right: 0;
		width: 8rpx;
		height: 100%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	/* 紧凑模式 - 更小高度 */
	.personal-card.compact .card-content {
		height: 120rpx;
		padding: 20rpx 24rpx;
	}

	.personal-card.compact .avatar {
		width: 70rpx;
		height: 70rpx;
	}

	.personal-card.compact .name {
		font-size: 30rpx;
	}

	.personal-card.compact .content {
		font-size: 24rpx;
		-webkit-line-clamp: 1;
	}

	/* 超紧凑模式 - 最小高度 */
	.personal-card.super-compact .card-content {
		height: 100rpx;
		padding: 16rpx 24rpx;
	}

	.personal-card.super-compact .avatar {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}

	.personal-card.super-compact .name {
		font-size: 28rpx;
	}

	.personal-card.super-compact .uid {
		font-size: 20rpx;
		padding: 2rpx 8rpx;
	}

	.personal-card.super-compact .content {
		font-size: 22rpx;
		-webkit-line-clamp: 1;
	}

	/* 响应式调整 */
	@media (max-width: 750rpx) {
		.card-content {
			padding: 20rpx;
		}

		.avatar {
			width: 70rpx;
			height: 70rpx;
			margin-right: 20rpx;
		}
	}
</style>