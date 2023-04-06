import { lazy } from "react";
import GlobalLayout from "./pages/_layout";

const SignInPage = lazy(() => import("./pages/SignIn"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const HomePage = lazy(() => import("./pages/Home"));

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/signup", element: <SignUpPage /> },
    ],
  },
];
