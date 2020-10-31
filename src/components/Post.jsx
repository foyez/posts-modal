import React from 'react'
import { Link } from 'react-router-dom'

export const Post = ({ post, handleEditPost, handleDeletePost }) => (
  <div className="card mb-3 offset-md-2 col-md-8">
    <div className="card-body">
      <Link
        style={{ textDecoration: 'none', color: 'inherit' }}
        to={`/posts/${post.id}`}
      >
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
      </Link>

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
)
