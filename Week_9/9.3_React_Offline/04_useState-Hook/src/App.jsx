import { useState } from 'react';
import './App.css'
import NotificationComp from './components/NotificationComp'
import PostComponent from './components/PostComponent'

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = () => {
    setPosts([...posts, {
      name: "harkirat",
      subtitle: "10000 followers",
      time: "2m ago",
      image: "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
      description: "What to know how to win big? Check out how these folks won $6000 in bounties."
    }])
  }

  return (
    <div>
      {/* <div>
        <NotificationComp />
        <NotificationComp />
        <NotificationComp />
      </div> */}

      <div style={{ backgroundColor: "#dfe6e9", height: "100vh" }}>
        <button onClick={addPost}>Add Post</button>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
          {posts.map(post => <PostComponent
            name={post.name}
            subtitle={post.subtitle}
            time={post.title}
            image={post.image}
            description={post.description}
          />)}
        </div>
      </div>

    </div >
  )
}

export default App
