import * as React from "react";
import { ChakraProvider, theme, Box } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Background from "./assets/bg.jpg";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Result from "./pages/Result";

// const Home = React.lazy(() => import("./pages/Home"));
// const Lobby = React.lazy(() => import("./pages/Lobby"));
// const Game = React.lazy(() => import("./pages/Game"));
// const Result = React.lazy(() => import("./pages/Result"));

const socket = new WebSocket("ws://68.146.50.113:8000/ws");

socket.addEventListener("message", (e) => console.log(e.data));

export const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    const router = createBrowserRouter([
        { path: "/", element: <Home socket={socket} /> },
        { path: "/lobby", element: <Lobby socket={socket} /> },
        { path: "/game", element: <Game /> },
        { path: "/result", element: <Result /> },
        { path: "*", element: <h1>Not Available</h1> },
    ]);

    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <Box
                    bgImage={Background}
                    height="100vh"
                    bgPos={"center"}
                    bgSize="cover"
                >
                    <RouterProvider router={router} />
                </Box>
            </ChakraProvider>
        </QueryClientProvider>
    );
};
