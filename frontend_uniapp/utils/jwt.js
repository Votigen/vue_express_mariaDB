// utils/auth.js
export function decodeToken(token) {
	try {
		const payload = token.split('.')[1]
		if (!payload) return null
		const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
		return JSON.parse(decoded)
	} catch (error) {
		console.error('JWT 解码失败:', error)
		return null
	}
}