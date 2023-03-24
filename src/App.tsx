import * as React from "react";
import { ChakraProvider, theme, Box } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Background from "./assets/bg.jpg";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Result from "./pages/Result";
import useWebSocket from "react-use-websocket";

// const Home = React.lazy(() => import("./pages/Home"));
// const Lobby = React.lazy(() => import("./pages/Lobby"));
// const Game = React.lazy(() => import("./pages/Game"));
// const Result = React.lazy(() => import("./pages/Result"));

export const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    const { sendMessage, lastMessage } = useWebSocket(
        "ws://68.146.50.113:8000/ws"
    );

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Home sendMessage={sendMessage} lastMessage={lastMessage} />
            ),
        },
        {
            path: "/lobby",
            element: (
                <Lobby sendMessage={sendMessage} lastMessage={lastMessage} />
            ),
        },
        { path: "/game", element: <Game /> },
        { path: "/result", element: <Result /> },
        { path: "*", element: <h1>Not Available</h1> },
    ]);

    React.useEffect(() => {
        if (lastMessage) console.log(lastMessage.data);
    }, [lastMessage]);

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
