export interface NotificationUser {

 _id:string;
 name:string;
 photo:string;

}


export interface Notification {

 _id:string;

 actor:NotificationUser;

 recipient:NotificationUser;

 type:
 | "like_post"
 | "comment_post";

 entityType:string;

 entityId:string;

 isRead:boolean;

 createdAt:string;

}