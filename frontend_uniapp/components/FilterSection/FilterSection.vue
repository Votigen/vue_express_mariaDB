<template>
	<view class="filter-section">
		<view class="search-box">
			<text class="search-icon">🔍</text>
			<input class="search-input" placeholder="搜索订单标题..." :value="searchKeyword" @input="handleSearchInput"
				@confirm="handleSearchConfirm" />
			<text v-if="searchKeyword" class="clear-icon" @click="handleClearSearch">✕</text>
		</view>
		<view class="filter-buttons">
			<picker @change="handleStatusChange" :value="statusFilterIndex" :range="statusFilters" range-key="label">
				<view class="filter-btn">
					<text>{{ currentStatusLabel }}</text>
					<text class="filter-arrow">▼</text>
				</view>
			</picker>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		watch
	} from 'vue'

	const props = defineProps({
		searchKeyword: {
			type: String,
			default: ''
		},
		statusFilterIndex: {
			type: Number,
			default: 0
		},
		statusFilters: {
			type: Array,
			default: () => []
		}
	})

	const emit = defineEmits(['search', 'clearSearch', 'statusChange'])

	// 计算当前状态标签
	const currentStatusLabel = computed(() => {
		return props.statusFilters[props.statusFilterIndex]?.label || '全部状态'
	})

	// 搜索输入处理
	const handleSearchInput = (e) => {
		const value = e.detail?.value || e.target?.value || ''
		emit('search', value)
	}

	// 搜索确认（回车）
	const handleSearchConfirm = () => {
		emit('search', props.searchKeyword)
	}

	// 清除搜索
	const handleClearSearch = () => {
		emit('clearSearch')
	}

	// 状态筛选变化
	const handleStatusChange = (e) => {
		const index = e.detail?.value || 0
		emit('statusChange', {
			detail: {
				value: index
			}
		})
	}
</script>

<style scoped>
	.filter-section {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		gap: 20rpx;
	}

	.search-box {
		flex: 1;
		position: relative;
		background: #f5f5f5;
		border-radius: 50rpx;
		padding: 20rpx 60rpx;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: 30rpx;
		font-size: 28rpx;
	}

	.search-input {
		flex: 1;
		font-size: 28rpx;
		border: none;
		outline: none;
		background: transparent;
	}

	.clear-icon {
		position: absolute;
		right: 30rpx;
		font-size: 28rpx;
		color: #999;
		cursor: pointer;
	}

	.filter-btn {
		background: #f5f5f5;
		padding: 20rpx 30rpx;
		border-radius: 25rpx;
		display: flex;
		align-items: center;
		gap: 10rpx;
		font-size: 28rpx;
		cursor: pointer;
	}

	.filter-arrow {
		font-size: 20rpx;
		color: #666;
	}

	@media (max-width: 750rpx) {
		.filter-section {
			flex-direction: column;
		}
	}
</style>