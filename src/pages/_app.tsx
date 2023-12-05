import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { use, useEffect } from "react";
import { io } from "socket.io-client";
import {
  BID_ENPOINT,
  LISTEN_FOR_BID_ERROR_EVENT,
  LISTEN_FOR_DECREMENT_BID_EVENT,
  LISTEN_FOR_EXCEPTION_EVENT,
} from "./api/endpoints";
import { WsProvider } from "@/contexts/wsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WsProvider>
      <Component {...pageProps} />
    </WsProvider>
  );
}
