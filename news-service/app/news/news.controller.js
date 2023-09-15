import axios from 'axios'
import asyncHandler from 'express-async-handler'

export const getAllNews = asyncHandler(async (req, res) => {
	const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json'

	try {
		const response = await axios.get(topStoriesUrl)
		const topStoryIds = response.data

		const top100StoryIds = topStoryIds.slice(0, 100)
		const stories = await Promise.all(
			top100StoryIds.map(async storyId => {
				const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
				const storyResponse = await axios.get(storyUrl)
				return storyResponse.data
			})
		)
		stories.sort((a, b) => b.time - a.time)
		res.json(stories)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

export const getNews = asyncHandler(async (req, res) => {
	const newsId = +req.params.id
	console.log(newsId)
	if (isNaN(newsId)) {
		console.log('aw')
		throw new Error('incorrect id by news')
	}
	const newsUrl = `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`

	try {
		const newsResponse = await axios.get(newsUrl)
		const newsData = newsResponse.data

		res.json(newsData)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})
