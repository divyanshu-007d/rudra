import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const PostContext = createContext()

export const usePost = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePost must be used within a PostProvider')
  }
  return context
}

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/posts')
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (postData) => {
    try {
      const response = await axios.post('/api/posts', postData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setPosts(prev => [response.data, ...prev])
      return response.data
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  const likePost = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/like`)
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, likes: response.data.likes, isLiked: response.data.isLiked } : post
      ))
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const addComment = async (postId, comment) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/comment`, { comment })
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, comments: [...post.comments, response.data] } : post
      ))
      return response.data
    } catch (error) {
      console.error('Error adding comment:', error)
      throw error
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const value = {
    posts,
    loading,
    fetchPosts,
    createPost,
    likePost,
    addComment
  }

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  )
}
