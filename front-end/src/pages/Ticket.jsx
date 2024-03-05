import React, { useState } from "react";
import "../css/thanks.css";
import axios from "axios";

function Thanks() {
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <div className="content">
      <div className="wrapper-1">
        <div className="wrapper-2">
          <button
            className="go-home"
            onClick={(e) => {
              e.preventDefault();
              axios
                .post(
                  "http://localhost:3001/send-email?ticketId=03d58600-c7d5-11ed-b7f7-41ba9afcc920&ticketName=Ticket-01"
                )
                .then((response) => {
                  if (response.status === 200) {
                    setIsSuccess(true);
                  }
                });
            }}
          >
            Đã xử lý
          </button>
          {isSuccess && <p style={{ color: "green" }}>Thành công</p>}
        </div>
        <div className="footer-like"></div>
      </div>
    </div>
  );
}

export default Thanks;
