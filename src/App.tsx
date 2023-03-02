import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

const Home = React.lazy(() => import("./pages/Home"));
const Lobby = React.lazy(() => import("./pages/Lobby"));
const Game = React.lazy(() => import("./pages/Game"));
const Result = React.lazy(() => import("./pages/Result"));

export const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    const router = createBrowserRouter([
        { path: "/", element: <Home /> },
        { path: "/lobby", element: <Lobby /> },
        { path: "/game", element: <Game /> },
        { path: "/result", element: <Result /> },
        { path: "*", element: <h1>Not Available</h1> },
    ]);
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <RouterProvider router={router} />
            </ChakraProvider>
        </QueryClientProvider>
    );
};
