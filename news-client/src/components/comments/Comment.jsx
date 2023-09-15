import { Comment as AntComment } from '@ant-design/compatible'
import { Button } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'

import DecodeText from '../ui/decode-text/DecodeText'
import Loader from '../ui/loader/Loader'

import NewsService from '../../service/news.service'
import { date } from '../../utils/getDate'

const Comment = ({ commentId }) => {
	const [showComments, setShowComments] = useState(false)

	const { data, isLoading } = useQuery(['comment', commentId], () =>
		NewsService.get(commentId)
	)

	if (isLoading) {
		return <Loader />
	}

	return (
		<AntComment
			author={data.by}
			content={data.text ? <DecodeText text={data.text} /> : 'Comment deleted'}
			datetime={date(data.time)}
			actions={
				data.kids
					? [
							<Button
								key={data.id}
								type='link'
								onClick={() => {
									setShowComments(!showComments)
								}}
							>
								{showComments
									? 'hide comments'
									: `show ${data.kids.length} comments`}
							</Button>
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ]
					: []
			}
		>
			{data.kids && showComments && (
				<div>
					{data.kids.map(kidId => (
						<Comment key={kidId} commentId={kidId} />
					))}
				</div>
			)}
		</AntComment>
	)
}

export default Comment
