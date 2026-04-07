import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePasswprd from './UpdatePasswprd'
import DeleteAccount from './DeleteAccount'

const Setting = () => {
  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10 ">
      <h1 className="mb-14 text-4xl font-bold text-black font-serif text-center sm:text-left">
        Edit Profile
      </h1>
      <ChangeProfilePicture />
      <EditProfile/>
      <UpdatePasswprd/>
      <DeleteAccount/>
    </div>
  )
}

export default Setting

