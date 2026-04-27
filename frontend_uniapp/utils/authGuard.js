// 路由守卫工具
export const authGuard = {
	// 检查登录状态
	checkLogin() {
		const token = uni.getStorageSync('token');
		console.log('🔐 路由守卫检查 token:', !!token);
		return !!token;
	},

	// 需要登录的页面列表
	needAuthPages: [
		'/pages/personalPage/personalPage',
		'/pages/order/order',
		'/pages/supply/supply',
		'/pages/NewOrder/NewOrder',
		'/pages/NewSupply/NewSupply'
	],

	// 🔥 新增：不需要登录的白名单页面
	whiteList: [
		'/pages/login/login',
		'/pages/register/register',
		'/pages/welcome/welcome'
		// 添加其他公开页面
	],

	// 检查当前页面是否需要登录
	needAuth(pagePath) {
		// 如果在白名单中，不需要登录
		if (this.whiteList.some(path => pagePath.includes(path))) {
			return false;
		}
		// 检查是否需要登录
		return this.needAuthPages.some(path => pagePath.includes(path));
	},

	// 跳转到登录页
	redirectToLogin() {
		console.log('🚫 未登录，跳转到登录页');
		uni.reLaunch({
			url: '/pages/login/login'
		});
	}
};