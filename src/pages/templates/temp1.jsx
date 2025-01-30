import React from "react";

const HtmlPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <iframe
        src="/temp1.html"
        title="HTML Page"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default HtmlPage;
