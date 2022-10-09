import React from "react";
const Message = ({ variant , children }) => {
    return (
        <div className={variant}>
            <p>{children}</p>
        </div>
    );
};

export default Message;