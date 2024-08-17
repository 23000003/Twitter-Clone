import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/app.css'
import UserContext from './contexts/UserContext.jsx'
import Router from './Route'
import PostContext from './contexts/PostContext.jsx'
import WhoToFollowContext from './contexts/WhoToFollowContext.jsx'
import ProfileContext from './contexts/ProfileContext.jsx'
import ApiAlertContext from './contexts/ApiAlertContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ApiAlertContext>
        <ProfileContext>
          <WhoToFollowContext>
            <PostContext>
              <UserContext>
                <Router/>
              </UserContext>
            </PostContext>
          </WhoToFollowContext>
        </ProfileContext>
      </ApiAlertContext>
  </React.StrictMode>,
)

