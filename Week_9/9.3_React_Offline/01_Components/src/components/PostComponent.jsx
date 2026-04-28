import React from 'react'

const PostComponent = () => {

    const headerStyle = {
        width: 200, backgroundColor: "white", borderRadius: 10, borderColor: "gray", borderWidth: 1, display: "flex", gap: "10px"
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "20px", padding: "20px", backgroundColor: "white", borderRadius: 10, height: "150px", width: "250px" }}>
            {/* HEADER  */}
            <div style={headerStyle}>
                <img src={"https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"} style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10
                }} />

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <b>100x Devs</b>
                    <div>23,888 followers</div>
                    <div>12m</div>
                </div>
            </div>

            {/* CONTENT  */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <div style={{ paddingLeft: "20px", marginLeft: "30px", marginTop: "10px", marginBottom: "10px " }}>
                    <b>100x Devs Hackathons</b>
                </div>

                <div>
                    What to know how to win big? Checkout how these guys won $6000 bounties
                </div>

            </div>
        </div >
    )
}

export default PostComponent
