"use client"; // because we are using browser capabilities

import { SessionProvider } from "next-auth/react";

// higher order component that wraps children, gets the current session through props
const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;

// we will use this in the layout file
