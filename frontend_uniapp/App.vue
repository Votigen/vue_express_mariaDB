<script>
	import {
		authGuard
	} from '@/utils/authGuard.js';

	export default {
		onLaunch() {
			console.log('🚀 App Launch - 检查启动状态');

			const hasShownWelcome = uni.getStorageSync('hasShownWelcome');
			console.log('🔍 是否显示过欢迎页:', hasShownWelcome);

			if (!hasShownWelcome) {
				console.log('✅ 首次启动，跳转到欢迎页');
				uni.reLaunch({
					url: '/pages/welcome/welcome'
				});
			} else {
				this.checkLoginAndRedirect();
			}

			// 🔥 新增：监听页面跳转
			this.setupRouteGuard();
		},

		methods: {
			//检查登录状态
			checkLoginAndRedirect() {
				const token = uni.getStorageSync('token');
				console.log('🔍 检查登录状态，token:', token);

				if (token) {
					console.log('✅ 用户已登录，跳转到主页');
					uni.reLaunch({
						url: '/pages/personalPage/personalPage'
					});
				} else {
					console.log('❌ 用户未登录，跳转到登录页');
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			},

			// 设置路由守卫
			setupRouteGuard() {
				// 监听页面跳转
				uni.addInterceptor('navigateTo', {
					invoke: (args) => {
						console.log('🛡️ 路由守卫拦截 navigateTo:', args.url);
						return this.beforeRouteEnter(args.url);
					}
				});

				uni.addInterceptor('redirectTo', {
					invoke: (args) => {
						console.log('🛡️ 路由守卫拦截 redirectTo:', args.url);
						return this.beforeRouteEnter(args.url);
					}
				});

				uni.addInterceptor('reLaunch', {
					invoke: (args) => {
						console.log('🛡️ 路由守卫拦截 reLaunch:', args.url);
						return this.beforeRouteEnter(args.url);
					}
				});

				uni.addInterceptor('switchTab', {
					invoke: (args) => {
						console.log('🛡️ 路由守卫拦截 switchTab:', args.url);
						return this.beforeRouteEnter(args.url);
					}
				});
			},

			// 路由进入前的检查
			beforeRouteEnter(url) {
				// 提取页面路径
				const pagePath = url.split('?')[0];
				console.log('🔍 检查页面路径:', pagePath);

				// 🔥 关键修改：完全禁用登录页相关的路由守卫
				if (pagePath.includes('/pages/login/login') ||
					pagePath.includes('/pages/register/register') ||
					pagePath.includes('/pages/welcome/welcome')) {
					console.log('✅ 公开页面，直接放行');
					return true;
				}

				// 检查是否需要登录
				if (authGuard.needAuth(pagePath)) {
					if (!authGuard.checkLogin()) {
						console.log('🚫 访问需要登录的页面但未登录:', pagePath);

						uni.showToast({
							title: '请先登录',
							icon: 'none',
							duration: 2000
						});

						setTimeout(() => {
							authGuard.redirectToLogin();
						}, 1500);

						return false; // 阻止跳转
					} else {
						console.log('✅ 已登录，允许访问:', pagePath);
					}
				}

				return true; // 允许跳转
			}
		}
	}
</script>