import { Button, Result } from 'antd'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const Error = ({ status = '', title = '', subTitle = '', extra = false }) => {
	const history = useHistory()
	return (
		<Result
			status={status}
			title={title}
			subTitle={subTitle}
			extra={
				extra && (
					<Button type='primary' onClick={() => history.push(`/news`)}>
						Back Home
					</Button>
				)
			}
		/>
	)
}
export default Error
