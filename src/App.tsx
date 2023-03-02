import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Result from "./pages/Result";

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
