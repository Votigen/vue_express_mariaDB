<template>
	<view class="input_box">
		<view class="title">
			{{ title }}
		</view>
		<view>
			<input :type="type" class="inputBox" :class="{ 'inputBox--focus': isFocused }" :value="modelValue"
				@input="handleInput" @focus="handleFocus" @blur="handleBlur" :placeholder="placeholder" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const props = defineProps({
		type: {
			type: String,
			default: 'text'
		},
		title: String,
		placeholder: {
			type: String,
			default: "请输入内容"
		},
		modelValue: {
			type: String,
			default: ''
		}
	})

	const emit = defineEmits(['update:modelValue'])
	const isFocused = ref(false);

	// 处理输入事件
	const handleInput = (e) => {
		const value = e.detail?.value || e.target?.value || ''
		emit('update:modelValue', value)
	}

	// 处理聚焦事件
	const handleFocus = () => {
		console.log('输入框获得焦点');
		isFocused.value = true;
	}

	// 处理失去焦点事件
	const handleBlur = () => {
		console.log('输入框失去焦点');
		isFocused.value = false;
	}
</script>

<style scoped>
	.input_box {
		/* border: solid 1px black; */
	}

	.inputBox::placeholder {
		color: rgba(0, 0, 0, 0.6);
	}

	.inputBox {
		background-color: rgba(232, 240, 254, 1);
		border-radius: 30rpx;
		height: 100rpx;
		font-size: 32rpx;
		padding: 0 50rpx;
		color: #333;
		border: 2rpx solid transparent;
		transition: all 0.3s ease;
		width: 100%;
		box-sizing: border-box;
	}

	.inputBox--focus {
		border-color: #007AFF !important;
		background-color: rgba(232, 240, 254, 0.8) !important;
		box-shadow: 0 0 10rpx rgba(0, 122, 255, 0.3) !important;
	}

	.title {
		color: rgba(63, 63, 63, 1.0);
		font-size: 24px;
		font-weight: 900;
		font-family: 'Noto Serif SC', serif;
		margin-bottom: 15rpx;
	}
</style>