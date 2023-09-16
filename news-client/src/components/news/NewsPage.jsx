import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'antd/es/typography/Link'
import { useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'

import Loader from '../ui/loader/Loader'

import NewsService from '../../service/news.service'
import { date } from '../../utils/getDate'
import CommentList from '../comments/CommentsList'
import Error from '../error/Error'
import styles from '../newslist/News.module.scss'

const NewsPage = () => {
	const { id } = useParams()
	const history = useHistory()
	const { data, isError, isLoading, refetch } = useQuery(['newsItem', id], () =>
		NewsService.get(id)
	)

	if (isLoading) {
		return <Loader />
	}
	if (isError) {
		return <Error status='404' title='Page not found' extra={true} />
	}

	const navigateBack = () => {
		history.push('/news')
	}

	return (
		<div className={styles.wrapper}>
			<h1>{data.title}</h1>
			<Link
				href={data.url}
				target='_blank'
				rel='noopener noreferrer'
				style={{ fontSize: '24px' }}
			>
				Go to source
			</Link>
			<p>Author: {data.by}</p>
			<p>Created: {date(data.time)}</p>
			<p>Comments: {data.kids ? data.kids.length : 0}</p>
			<Button onClick={navigateBack} icon={<ArrowLeftOutlined />}>
				Back to news list
			</Button>
			{data.kids && (
				<Button onClick={() => refetch()} style={{ marginRight: 10 }}>
					Update comments
				</Button>
			)}

			{data.kids && <CommentList comments={data.kids} />}
		</div>
	)
}

export default NewsPage
