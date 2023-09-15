import Comment from './Comment'

const CommentList = ({ comments }) => {
	return (
		<div>
			{comments.map(commentId => (
				<Comment key={commentId} commentId={commentId} />
			))}
		</div>
	)
}

export default CommentList
