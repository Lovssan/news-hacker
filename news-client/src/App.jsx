import { FloatButton, Layout } from 'antd'
import {
	BrowserRouter,
	Redirect,
	Route,
	Switch
} from 'react-router-dom/cjs/react-router-dom'

import Error from './components/error/Error'
import Footer from './components/footer/Footer'
import NewsPage from './components/news/NewsPage'
import NewsList from './components/newslist/NewsList'

const { Header, Content } = Layout
const App = () => {
	return (
		<BrowserRouter>
			<div className='app-container'>
				<Header className='app-header'>
					<h1>Hacker News</h1>
				</Header>
				<Content>
					<Switch>
						<Route path='/news' exact component={NewsList} />

						<Route path='/news/:id' exact component={NewsPage} />
						<Route path='*'>
							<Error status='404' title='Page not found' extra={true} />
						</Route>
						<Redirect from='/' to='/news' />
					</Switch>
				</Content>
				<FloatButton.BackTop />
				<Footer />
			</div>
		</BrowserRouter>
	)
}

export default App
