import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const Lobby = React.lazy(() => import("./pages/Lobby"));
const Game = React.lazy(() => import("./pages/Game"));
const Result = React.lazy(() => import("./pages/Result"));

export const App = () => {
    const router = createBrowserRouter([
        { path: "/", element: <Home /> },
        { path: "/lobby", element: <Lobby /> },
        { path: "/game", element: <Game /> },
        { path: "/result", element: <Result /> },
    ]);
    return (
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    );
};
