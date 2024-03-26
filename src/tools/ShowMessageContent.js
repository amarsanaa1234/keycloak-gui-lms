import { Col, Row } from "antd";
import React from "react";


const ShowMessageContent = ({ msgObj }) => {
  const [showDesc, setShowDesc] = React.useState(false);
  React.useEffect(() => {
  }, []);
  return (
    <Row>
      {(msgObj?.message || msgObj?.description) &&
        <Col span={24}>
          <a style={{ float: "right" }} onClick={() => {
            setShowDesc(!showDesc);
          }}>{showDesc ? 'Хаах' : 'Дэлгэрэнгүй..'}</a>
        </Col>
      }
      {showDesc &&
        <>
          {msgObj?.message && <Col span={24}>
            {msgObj.message}
          </Col>}
          {(msgObj?.message || msgObj?.description) &&
            <Col span={24} style={{height:'1rem'}}></Col>
          }
          {msgObj?.description && <Col span={24}>
            <span
              dangerouslySetInnerHTML={{ __html: msgObj.description }}
            ></span>
          </Col>}
        </>
      }
    </Row>
  );
};
export default ShowMessageContent;
