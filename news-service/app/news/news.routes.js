import express from 'express'

import { getAllNews, getNews } from './news.controller.js'

const router = express.Router()

router.route('/').get(getAllNews)
router.route('/:id').get(getNews)

export default router
