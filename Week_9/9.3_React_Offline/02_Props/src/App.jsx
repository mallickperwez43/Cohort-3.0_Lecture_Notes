import './App.css'
import PostComponent from './components/PostComponent'

function App() {

  return (
    <div>
      <div style={{ backgroundColor: "#dfe6e9", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
        <PostComponent
          name={"Harkirat"}
          account={"100x Devs"}
          subtitle={"20 followers"}
          time={"12m"}
          image={"https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"}
          contentHeader={"100x Devs Hackathons"}
          description={"What to know how to win big? Checkout how these guys won $6000 bounties"}
        />
        <PostComponent
          name={"Raman"}
          account={"Teams"}
          subtitle={"Promotional"}
          image={"https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"}
          contentHeader={"Learn from the best source"}
          description={"Learning from the right source creates an impact on how long you run along the line"}
        />
      </div>
    </div>
  )
}

export default App
