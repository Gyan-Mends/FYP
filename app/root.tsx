import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useActionData,
} from "@remix-run/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import styles from "~/style.css";



export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async () => {
  return {}; // any initial data you want to load
};

export default function App() {



  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" attribute="class">
          <NextUIProvider>
            <Outlet />
          </NextUIProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
