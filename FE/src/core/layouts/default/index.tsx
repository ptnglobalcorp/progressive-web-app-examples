import React from "react";

function DefaultLayout({ children }: any) {
  return <>{children.body && children.body}</>;
}

export default DefaultLayout;
