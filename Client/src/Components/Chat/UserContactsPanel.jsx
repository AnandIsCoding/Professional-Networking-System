import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UserContactsPanel({setActive,activeConversationId,item}) {
  
  const [friend, setFriend] = useState([])
  const user = useSelector(state => state?.user?.user)
  useEffect(()=>{
    let value = item.members.filter((i) => i._id !== user?._id)
    setFriend(value[0])
  },[])
  return (
    <div onClick={()=>setActive(item?._id,friend)} key={item?._id} className={`flex flex-col sm:flex-row sm:gap-2 border-b-1 border-l-0 border-r-0 border-zinc-300 hover:bg-blue-50 p-2 cursor-pointer ${activeConversationId === friend._id ? 'bg-blue-50' : ''} `}>
      {/* user's profile picture */}
      <img
        src={friend?.profilePic}
        alt="user's_profile_image"
        className="h-14 w-14 rounded-full"
      />
      {/* user's name and occupation etc */}
      <div className="flex flex-col sm:pt-1 ">
        <h1>{friend?.fullName}</h1>
        <p className="text-gray-600 text-sm">{friend?.headline}</p>
      </div>
    </div>
  );
}

export default UserContactsPanel;
