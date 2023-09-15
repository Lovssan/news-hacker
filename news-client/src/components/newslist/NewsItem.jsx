import { HistoryOutlined, LikeOutlined } from '@ant-design/icons'
import { List } from 'antd'
import Link from 'antd/es/typography/Link'

import IconText from '../ui/icontext/IconText'

import { date } from '../../utils/getDate'
import styles from './News.module.scss'

const NewsItem = ({ title, score, author, publishedDate, id, onClick }) => (
	<List.Item
		onClick={onClick}
		key={id}
		className={styles.item}
		actions={[
			<IconText
				icon={<LikeOutlined />}
				text={score}
				key='list-vertical-star-o'
			/>,
			<IconText
				icon={<HistoryOutlined />}
				text={date(publishedDate)}
				key='list-vertical-like-o'
			/>
		]}
	>
		<List.Item.Meta
			title={
				<Link>
					<span className={styles.title}>{title}</span>
				</Link>
			}
			className={styles.meta}
			description={
				<div className={styles.info}>
					<span>Author: {author}</span>
				</div>
			}
		/>
	</List.Item>
)
export default NewsItem
