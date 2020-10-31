import { useState } from 'react'
import { CreateCategory } from './components/CreateCategory'
import { CreatePost } from './components/CreatePost'
import { EditPost } from './components/EditPost'
import { generateId } from './utils'

function App() {
  const [posts, setPosts] = useState([
    // { id: 1, postBody: 'test', categories: ['test', 'paste'] },
  ])
  const [categories] = useState(['news', 'social'])
  const [activeModal, setActiveModal] = useState('')
  const [editPost, setEditPost] = useState({
    postBody: '',
    categories: [],
  })

  useState(() => {
    setPosts(
      localStorage.posts ? JSON.parse(localStorage.getItem('posts')) : [],
    )
  }, [])

  const handleCreatePost = () => {
    setActiveModal('createPost')
  }

  const handleCreateNewCat = () => {
    setActiveModal('createCategory')
  }

  const handleCreatePostSubmit = (post) => {
    const postToAdd = [...posts, { ...post, id: generateId(posts) }]

    localStorage.setItem('posts', JSON.stringify(postToAdd))
    setPosts(postToAdd)
    setActiveModal('')
  }

  const handleEditPostBodyChange = (postBody) => {
    setEditPost({ ...editPost, postBody })
  }

  const handleCreateCatSubmit = (category) => {
    setEditPost({ ...editPost, categories: [...editPost.categories, category] })

    setActiveModal('editPost')
  }

  const handleEditPost = (post) => {
    setEditPost(post)
    setActiveModal('editPost')
  }

  const handleEditPostSubmit = (e) => {
    e.preventDefault()

    const postsAfterEdit = posts.map((post) =>
      post.id === editPost.id ? editPost : post,
    )

    localStorage.setItem('posts', JSON.stringify(postsAfterEdit))
    setPosts(postsAfterEdit)
    setEditPost({ postBody: '', categories: [] })
    setActiveModal('')
  }

  const handleDeletePost = (postId) => {
    const postsAfterDelete = posts.filter((post) => post.id !== postId)

    localStorage.setItem('posts', JSON.stringify(postsAfterDelete))
    setPosts(postsAfterDelete)
  }

  const closeModal = (modalName) => () => {
    setActiveModal(modalName === 'createCategory' ? 'editPost' : '')
  }

  return (
    <div className="m-5">
      <CreatePost
        activeModal={activeModal}
        categories={categories}
        handleCreatePostSubmit={handleCreatePostSubmit}
        closeModal={closeModal}
      />

      <EditPost
        post={editPost}
        activeModal={activeModal}
        handleCreateNewCat={handleCreateNewCat}
        handleEditPostBodyChange={handleEditPostBodyChange}
        handleEditPostSubmit={handleEditPostSubmit}
        closeModal={closeModal}
      />

      <CreateCategory
        activeModal={activeModal}
        handleCreateCatSubmit={handleCreateCatSubmit}
        closeModal={closeModal}
      />

      <div className="container">
        <button
          className="btn btn-primary btn-lg mb-3 d-block mx-auto"
          onClick={handleCreatePost}
        >
          Add Post
        </button>

        <div className="row">
          {!posts.length ? (
            <p className="lead text-center">No post found.</p>
          ) : (
            posts.map((post, i) => (
              <div key={i} className="card mb-3 offset-md-2 col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{post.postBody}</h5>
                  {post.categories.map((cat) => (
                    <span
                      className="mr-1 p-1"
                      key={cat}
                      style={{ border: '1px solid #ccc' }}
                    >
                      {cat}
                    </span>
                  ))}

                  <div className="mt-2">
                    <button
                      className="btn btn-secondary mr-2"
                      onClick={() => handleEditPost(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
