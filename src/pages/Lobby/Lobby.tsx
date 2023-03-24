import * as React from "react";
import {
    Tag,
    SimpleGrid,
    Box,
    Heading,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export const Lobby: React.FC<{ socket: WebSocket }> = ({ socket }) => {
    const {
        state: { username, code },
    } = useLocation();
    const toast = useToast();
    const [users, setUsers] = React.useState<string[]>([username]);
    socket.addEventListener("message", (e) => {
        const message = e.data as string;
        if (message.includes("User Join")) {
            console.log(1);
            setUsers((prev) => [...prev, message.match(/:(.+)/)![1]]);
        }
    });
    return (
        <Box textAlign={"center"}>
            <Heading>Lobby:{code}</Heading>
            <SimpleGrid columns={2} spacing={5}>
                {users?.map((user,index) => (
                    <Tag key={index}>{user}</Tag>
                ))}
            </SimpleGrid>
            <Button
                onClick={() => {
                    socket.send(`Ready:${username}:${code}`);
                    toast({
                        title: "You are ready",
                        description:
                            "Waiting for everyone else in the lobby to get ready",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                }}
                colorScheme="green"
            >
                Ready
            </Button>
        </Box>
    );
};
