export const generateId = (posts) => {
  const postIds = posts.map((post) => post.id)
  return postIds.length > 0 ? Math.max(...postIds) + 1 : 1
}
