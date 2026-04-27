<template>
	<view class="section">
		<view class="section-title">
			<text class="section-icon">🚀</text>
			<text class="section-text">主要功能</text>
		</view>
		<view class="box grid-box">
			<view class="grid-container">
				<navigator url="/pages/contacts/contacts" class="nav-item">
					<view class="nav-icon" style="background: linear-gradient(135deg, #ff6b6b, #ff8e8e);">
						<text>👥</text>
					</view>
					<text class="nav-text">供应商</text>
				</navigator>

				<navigator url="/pages/buy/buy" class="nav-item">
					<view class="nav-icon" style="background: linear-gradient(135deg, #4ecdc4, #44a08d);">
						<text>🛒</text>
					</view>
					<text class="nav-text">供应订单</text>
				</navigator>

				<navigator url="/pages/supply/supply" class="nav-item">
					<view class="nav-icon" style="background: linear-gradient(135deg, #45b7d1, #96c93d);">
						<text>📦</text>
					</view>
					<text class="nav-text">采购订单</text>
				</navigator>

				<navigator url="/pages/userProfile/userProfile" open-type="switchTab" class="nav-item">
					<view class="nav-icon" style="background: linear-gradient(135deg, #ffa726, #ff9800);">
						<text>📋</text>
					</view>
					<text class="nav-text">个人中心</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script setup>
	// 这个组件不需要props，只负责展示
</script>

<style scoped>
	.section {
		margin-bottom: 40rpx;
		animation: fadeInUp 0.6s ease-out 0.2s both;
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

	.grid-box {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 1rpx solid rgba(255, 255, 255, 0.2);
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
		padding: 30rpx;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40rpx 20rpx;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 20rpx;
		backdrop-filter: blur(10px);
		border: 1rpx solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.nav-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
		transition: left 0.5s;
	}

	.nav-item:active::before {
		left: 100%;
	}

	.nav-item:active {
		transform: scale(0.95);
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
	}

	.nav-icon {
		width: 100rpx;
		height: 100rpx;
		border-radius: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.2);
	}

	.nav-icon text {
		font-size: 48rpx;
	}

	.nav-text {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		text-align: center;
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

	/* 响应式调整 */
	@media (max-width: 750rpx) {
		.grid-container {
			grid-template-columns: repeat(2, 1fr);
			gap: 15rpx;
			padding: 20rpx;
		}

		.nav-item {
			padding: 30rpx 15rpx;
		}

		.nav-icon {
			width: 80rpx;
			height: 80rpx;
		}

		.nav-icon text {
			font-size: 40rpx;
		}
	}
</style>