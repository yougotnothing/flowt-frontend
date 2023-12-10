import React, { useState, Fragment } from "react";

import { Droplist as DROPLIST, DroplistItem, IDroplist, NoticeIcon, Notices, NoticeTitle } from "./Notifications.styled";
import { notificationsStore as notices } from "../../../stores/toNotifications.mobx";
import { userAvatarStore } from "../../../stores/toChangeAvatar.mobx";
import { api } from "../../../api/axiosConfig";

export const Droplist: React.FC<IDroplist> = ({ $isOpen: prop }) => {
  const [isOpen, setIsOpen] = useState(prop);
  const [chosenNotice, setChosenNotice] = useState<number | null>(null);

  const handleDeleteNotice = async () => {
    try {
      if(chosenNotice) {
        const response = await api.delete(`/notifications/${chosenNotice}`);
        if(response) {
          await notices.getInfo();
        }
      }else{
        console.log('something went wrong');
      }
    }catch(error: any) {
      console.error(error);
    }
  }

  return (
    <>
      {notices.container.map((notice, index) => (
        <Fragment key={index}>
          <Notices onClick={() => {
            setIsOpen(!isOpen);
            setChosenNotice(notice.id);
          }}>
            <NoticeIcon style={{backgroundImage: `url(${userAvatarStore.avatar})`}} />
            <NoticeTitle>{notice.message}</NoticeTitle>
          </Notices>
        </Fragment>
      ))}
      <DROPLIST $isOpen={isOpen}>
        <DroplistItem onClick={() => {
          setChosenNotice(chosenNotice);
        }}>Mark as read</DroplistItem>
        <DroplistItem onClick={() => handleDeleteNotice()}>Delete</DroplistItem>
      </DROPLIST>
    </>
  )
}