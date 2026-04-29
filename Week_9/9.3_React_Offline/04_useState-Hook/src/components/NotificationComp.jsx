import React, { useState } from 'react'

const NotificationComp = () => {
    const [notificationCount, setNotificationCount] = useState(0)

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setNotificationCount(notificationCount + 1)}>
                Increment Notification
            </button>
            <span style={{ fontSize: "25px" }}>{notificationCount}</span>
        </div>
    )
}

export default NotificationComp
