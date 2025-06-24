import './Notifications.css'

enum notificationType {
    Like,
    Comment,
    Following
}

const Notifications = () => {

    const notifications = [
        {user: "Robert", type: notificationType.Like},
        {user: "Adam", type: notificationType.Comment},
        {user: "Małgosia", type: notificationType.Following}
    ]

    const createNotifiactionText = (user: String, type: notificationType) => {
        switch (type) {
            case notificationType.Like: {
                return "User " + user + " just liked your post!";
            }
            case notificationType.Comment: {
                return "User " + user + " just commented your post!";
            }
            case notificationType.Following: {
                return "User " + user + " just followed you!"
            }                
        }
    }
    

  return (
    <div>
        <div className='title'>Notifications</div>
        <div className="notificationsWrapper">
            {notifications.map(notification => (
                <div className='notification'>{createNotifiactionText(notification.user, notification.type)}</div>
            ))
            }
        </div>
    </div>
  )
}

export default Notifications