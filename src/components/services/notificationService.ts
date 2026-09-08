import axios from "axios";

const baseUrl = "https://route-posts.routemisr.com";


export const getNotifications = async (
  token: string,
  page = 1,
  limit = 10
) => {

  const response = await axios.get(
    `${baseUrl}/notifications?page=${page}&limit=${limit}`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );


  return response.data.data.notifications;
};



export const getUnreadCount = async (
  token:string
)=>{

 const response = await axios.get(
   `${baseUrl}/notifications/unread-count`,
   {
    headers:{
      Authorization:`Bearer ${token}`
    }
   }
 );


 return response.data.data.unreadCount;

};



export const markNotificationRead = async (
 notificationId:string,
 token:string
)=>{

 return axios.patch(
   `${baseUrl}/notifications/${notificationId}/read`,
   {},
   {
    headers:{
      Authorization:`Bearer ${token}`
    }
   }
 );

};



export const markAllNotificationsRead = async (
 token:string
)=>{

 return axios.patch(
   `${baseUrl}/notifications/read-all`,
   {},
   {
    headers:{
      Authorization:`Bearer ${token}`
    }
   }
 );

};