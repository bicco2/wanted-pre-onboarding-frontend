import { lazy } from "react";
import GlobalLayout from "./pages/_layout";

const SignInPage = lazy(() => import("./pages/signin"));
const SignUpPage = lazy(() => import("./pages/signup"));
const HomePage = lazy(() => import("./pages/home"));
const TodoPage = lazy(() => import("./pages/todo"));

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/todo", element: <TodoPage /> },
    ],
  },
];
