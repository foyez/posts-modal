import { Route, Switch } from 'react-router-dom'
import { PostList } from './components/PostList'
import { SinglePost } from './components/SinglePost'

function App() {
  return (
    <Switch>
      <Route path="/posts/:id">
        <SinglePost />
      </Route>
      <Route exact path="/">
        <PostList />
      </Route>
    </Switch>
  )
}

export default App
