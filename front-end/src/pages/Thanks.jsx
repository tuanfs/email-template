import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/thanks.css";

function Thanks() {
  const [object, setObject] = useState({});
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ticketName = searchParams.get("ticketName");
    const requester = searchParams.get("requester");
    const result = searchParams.get("result");
    setObject({
      ticketName,
      requester,
      result
    });
  }, [location.search]);

  return (
    <div className="content">
      <div className="wrapper-1">
        {object.result === "success" && (
          <div className="wrapper-2">
            <h1>Thank {object.requester} !</h1>
            <p>Thanks for subscribing to our news letter. </p>
            <p>Your tikcet name: {object.ticketName}</p>
            <button className="go-home">go home</button>
          </div>
        )}
        {object.result === "expired" && (
          <div className="wrapper-2">
            <h1 style={{ color: "red", fontSize: "3em" }}>
              Đóng ticket thất bại !
            </h1>
            <p>Token đã hết hạn</p>
            <button className="go-home">go home</button>
          </div>
        )}
        {object.result === "notfound" && (
          <div className="wrapper-2">
            <h1 style={{ color: "red", fontSize: "3em" }}>
              Đóng ticket thất bại !
            </h1>
            <p>Không tìm thấy ticket</p>
            <button className="go-home">go home</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Thanks;
