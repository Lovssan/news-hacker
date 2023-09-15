import { $axios } from '../api'

class NewsService {
	async getAllNews() {
		const { data } = await $axios.get(`/news`)
		return data
	}

	async get(id) {
		const { data } = await $axios.get(`/news/${id}`)
		return data
	}
}

export default new NewsService()
