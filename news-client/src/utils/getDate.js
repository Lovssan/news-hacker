import { formatDistanceToNow } from 'date-fns'

export const date = date => {
	return formatDistanceToNow(new Date(date * 1000), { addSuffix: true })
}
