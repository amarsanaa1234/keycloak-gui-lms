import { message, notification } from "antd";
import React from "react";
import contextLogin from "../components/contextLogin";
import ShowMessageContent from "./ShowMessageContent";


const ShowMessage = ({ exceptionType, exceptionCode, render }) => {
  const { systemExceptionMessages } = React.useContext(contextLogin);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (msgObj) => {
    api[msgObj.type]({
      message: msgObj.title,
      description: <ShowMessageContent msgObj={msgObj}/>,
      placement: 'top'
    });
  };

  React.useEffect(() => {
    let tmpObj;
    let tmpCode;
    let tmpMsg = null;
    const tmpCOdes = exceptionCode?.split(" ");
    if (tmpCOdes.length > 0) {
      tmpCode = tmpCOdes[0];
      tmpMsg = exceptionCode.substring(tmpCode.length, exceptionCode.length);
    } else {
      tmpCode = exceptionCode.trim();
    }
    if (tmpCode && systemExceptionMessages && systemExceptionMessages[tmpCode]) {
      tmpObj = { ...systemExceptionMessages[tmpCode], message: tmpMsg };
    } else {
      tmpObj = { title: exceptionCode, message: '' };
    }
    openNotification({...tmpObj, type : exceptionType === "error" ? "error" : "warning"})
    // if (exceptionType === "error")
    //   message.error(<ShowMessageContent msgObj={tmpObj} />, 10);
    // else
    //   message.warning(<ShowMessageContent msgObj={tmpObj} />, 10);
  }, [render]);
  return (
    <>{contextHolder}</>
  );
};
export default ShowMessage;
