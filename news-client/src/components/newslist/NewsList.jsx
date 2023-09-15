import { Button, List } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

import Loader from '../ui/loader/Loader'

import NewsService from '../../service/news.service'
import Error from '../error/Error'
import styles from './News.module.scss'
import NewsItem from './NewsItem'

const NewsList = () => {
	const [loadButton, setLoadButton] = useState(false)
	const [pageCount, setPageCount] = useState(1)
	const history = useHistory()
	const {
		data: newsList,
		isLoading,
		refetch,
		isError
	} = useQuery(['news list'], () => NewsService.getAllNews(), {
		refetchInterval: 60000,
		onSuccess: () => setLoadButton(false)
	})

	if (isLoading) return <Loader />
	if (isError) return <Error status='500' title='500' />

	return (
		<div className={styles.wrapper}>
			<Button
				loading={loadButton}
				style={{ margin: '10px 0 0' }}
				onClick={() => {
					setLoadButton(true)
					setPageCount(1)
					refetch()
				}}
			>
				Refresh news
			</Button>
			<List
				className={styles.newslist}
				pagination={{
					showSizeChanger: false,
					align: 'center',
					position: 'both',
					pageSize: 20,
					current: pageCount,
					onChange: page => {
						setPageCount(page)
					}
				}}
				itemLayout='vertical'
				dataSource={newsList}
				renderItem={news => (
					<NewsItem
						author={news.by}
						title={news.title}
						score={news.score}
						publishedDate={news.time}
						id={news.id}
						onClick={() => {
							history.push(`/news/${news.id}`)
						}}
					/>
				)}
			/>
		</div>
	)
}
export default NewsList
