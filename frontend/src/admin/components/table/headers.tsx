import React from "react";

interface HeadersTypes {
  title?: React.ReactNode;
  content?: React.ReactNode;
}
const Headers = ({ title, content }: HeadersTypes) => {
  return (
    <div className="flex justify-between items-center">
      {title}
      {content}
    </div>
  );
};

export default Headers;
