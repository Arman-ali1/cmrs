import React from 'react'
import Header from '../home/header/Header'
import Sidebar from '../home/Sidebar/Sidebar'
import UserChatBox from './UserChatBox'

function userChat() {
  return (
    <div>
      <Header />
      <Sidebar />
      <UserChatBox />
    </div>
  )
}

export default userChat
