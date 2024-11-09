import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type {
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";

import "./tailwind.css";
import SW from "./LogicComp/SW";
import { root_meta } from "./meta/root-meta";
import { general_meta } from "./components/GeneralMeta";
import GeneralErrorBoundary from "./components/GeneralErrorLayout";

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon2.ico", type: "image/x-icon" },
];

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const origin = url.origin;

  const meta = root_meta(origin);

  return { origin, meta };
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html translate="no" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon2.ico" type="image/x-icon" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-900">
        {children}

        <div id="confirm-and-alert"></div>
        <div id="log-in-out"></div>
        <ScrollRestoration />
        <Scripts />

        {process.env.NODE_ENV === "production" && <SW />}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
export const ErrorBoundary = GeneralErrorBoundary

export const meta = general_meta;
