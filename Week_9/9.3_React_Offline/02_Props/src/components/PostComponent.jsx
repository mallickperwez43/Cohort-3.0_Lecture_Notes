import React from 'react'

const PostComponent = ({ name, account, subtitle, time, image, contentHeader, description }) => {

    const headerStyle = {
        width: 200, backgroundColor: "white", borderRadius: 10, borderColor: "gray", borderWidth: 1, display: "flex", gap: "10px"
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "20px", padding: "20px", backgroundColor: "white", borderRadius: 10, height: "150px", width: "250px" }}>
            {/* HEADER  */}
            <div style={headerStyle}>
                <img src={image} style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10
                }} />

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <b>{account}</b>
                    <div>{subtitle}</div>
                    {time && <div>
                        <div>
                            {time}
                        </div>
                    </div>}
                </div>
            </div>

            {/* CONTENT  */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <div style={{ paddingLeft: "20px", marginLeft: "30px", marginTop: "10px", marginBottom: "10px " }}>
                    <b>{contentHeader}</b>
                </div>

                <div>
                    {description}
                </div>

            </div>
        </div >
    )
}

export default PostComponent