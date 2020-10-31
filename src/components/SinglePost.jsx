import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const SinglePost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  useEffect(() => {
    const posts = localStorage.posts
      ? JSON.parse(localStorage.getItem('posts'))
      : []

    setPost(posts.find((post) => post.id === parseInt(id)))
  }, [id])

  return !post ? (
    <div>Loading...</div>
  ) : (
    <div className="m-5">
      <h1>{post.postBody}</h1>
      {post.categories.map((cat) => (
        <span
          className="mr-1 p-1"
          key={cat}
          style={{ border: '1px solid #ccc' }}
        >
          {cat}
        </span>
      ))}
    </div>
  )
}
