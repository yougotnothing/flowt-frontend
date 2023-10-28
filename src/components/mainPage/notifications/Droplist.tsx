import React, { useEffect, useState, Fragment } from "react";

import { Droplist, DroplistItem, IDroplist, NoticeIcon, Notices, NoticeTitle } from "./Notifications.styled";
import noticesData from "../../../json/notice.json";
import { notificationsStore as notices } from "../../../stores/toNotifications";
import { userAvatarStore } from "../../../stores/toChangeAvatar";
import { api } from "../../../api/axiosConfig";
import { INotice } from "../../../types/props";

export const Droplist_: React.FC<IDroplist> = ({ $isOpen: prop }) => {
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
      <Droplist $isOpen={isOpen}>
        <DroplistItem onClick={() => {
          setChosenNotice(chosenNotice);
        }}>Mark as read</DroplistItem>
        <DroplistItem onClick={() => handleDeleteNotice()}>Delete</DroplistItem>
      </Droplist>
    </>
  )
}