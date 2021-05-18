import { signout } from './api-auth'

const auth = {
	authenticate(jwt, cb) {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('jwt', JSON.stringify(jwt))
		}
		cb()
	},
	isAuthenticated() {
		if (typeof window === 'undefined' || !sessionStorage.getItem('jwt')) {
			return false
		}
		return JSON.parse(sessionStorage.getItem('jwt'))
	}/* refactored. cf Hoque, pg256 */,
	clearJwt(cb) {
		if (typeof window !== 'undefined') {
			sessionStorage.removeItem('jwt')
		}
		cb()
		signout().then((data) => {
			document.cookie = 't=; expires=Thu 01 Jan 1970 00:00:00 UTC path=/;'
		})
	}
}

export default auth
