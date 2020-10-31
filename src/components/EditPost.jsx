import React from 'react'
import Modal from './Modal/Modal'

export const EditPost = ({
  post,
  activeModal,
  handleEditPostSubmit,
  handleCreateNewCat,
  handleEditPostBodyChange,
  closeModal,
}) => {
  return (
    <div>
      <Modal
        show={activeModal === 'editPost'}
        closeModal={closeModal('editPost')}
      >
        <button
          onClick={closeModal('editPost')}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <form onSubmit={handleEditPostSubmit}>
          <h1>Edit post</h1>
          <div className="form-group">
            <label htmlFor="edit-post-body">Post</label>
            <textarea
              onChange={(e) => handleEditPostBodyChange(e.target.value)}
              value={post.postBody}
              className="form-control"
              id="edit-post-body"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-category">Category</label>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenu"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {post.categories.join(', ')}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                <button
                  onClick={handleCreateNewCat}
                  className="dropdown-item"
                  type="button"
                >
                  Create New Category
                </button>
                {post.categories.map((cat) => (
                  <button key={cat} className="dropdown-item" type="button">
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
