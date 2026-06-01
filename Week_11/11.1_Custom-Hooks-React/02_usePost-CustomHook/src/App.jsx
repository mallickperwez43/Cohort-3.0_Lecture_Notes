import React from 'react'
import './App.css'
import usePost from './hooks/usePost'

function App() {
  const { post } = usePost();
  return (
    <div style={{ color: "purple", fontSize: "40px" }}>
      {post.title}
      <br />
      {post.body}
    </div>
  )
}

export default App
