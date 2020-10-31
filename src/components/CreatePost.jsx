import React, { useState } from 'react'
import Modal from './Modal/Modal'

export const CreatePost = ({
  categories,
  activeModal,
  handleCreatePostSubmit,
  closeModal,
}) => {
  const [newPost, setNewPost] = useState({
    postBody: '',
    categories: [],
  })
  const handlePostBodyChange = (e) => {
    setNewPost({
      ...newPost,
      postBody: e.target.value,
    })
  }

  const handleCategoryClick = (e) => {
    const category = e.target.textContent

    if (newPost.categories.indexOf(category) === -1) {
      setNewPost({
        ...newPost,
        categories: [...newPost.categories, e.target.textContent],
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleCreatePostSubmit(newPost)
    setNewPost({
      postBody: '',
      categories: [],
    })
  }

  return (
    <div>
      <Modal
        show={activeModal === 'createPost'}
        closeModal={closeModal('createPost')}
      >
        <button
          onClick={closeModal('createPost')}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <form onSubmit={handleSubmit}>
          <h1>Create a post</h1>
          <div className="form-group">
            <label htmlFor="post-body">Post</label>
            <textarea
              name="postBody"
              value={newPost.postBody}
              onChange={handlePostBodyChange}
              className="form-control"
              id="post-body"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-category">Category</label>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {!newPost.categories.length
                  ? 'Select categories'
                  : newPost.categories.join(', ')}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={handleCategoryClick}
                    name="categories"
                    className="dropdown-item"
                    type="button"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button className="btn btn-secondary">Submit</button>
        </form>
      </Modal>
    </div>
  )
}
