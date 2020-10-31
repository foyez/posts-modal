import { useEffect, useState } from 'react'
import { CreateCategory } from './CreateCategory'
import { CreatePost } from './CreatePost'
import { EditPost } from './EditPost'
import { generateId } from '../utils'
import { Post } from './Post'

export const PostList = () => {
  const [posts, setPosts] = useState([])
  const [categories] = useState(['news', 'social'])
  const [activeModal, setActiveModal] = useState('')
  const [editPost, setEditPost] = useState({
    postBody: '',
    categories: [],
  })

  useEffect(() => {
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
    const postToAdd = [{ ...post, id: generateId(posts) }, ...posts]

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
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                handleEditPost={handleEditPost}
                handleDeletePost={handleDeletePost}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
