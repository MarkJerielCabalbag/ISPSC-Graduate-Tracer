import React from "react";

interface HeadersTypes {
  title?: React.ReactNode;
  content?: React.ReactNode;
}
const Headers = ({ title, content }: HeadersTypes) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center w-full">
      {title}
      {content}
    </div>
  );
};

export default Headers;
