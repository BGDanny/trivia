import * as React from "react";
import {
    Tag,
    SimpleGrid,
    Box,
    Heading,
    Button,
    useToast,
    TagLabel,
    Badge,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { SocketProps } from "../../types";

export const Lobby: React.FC<SocketProps> = ({ lastMessage, sendMessage }) => {
    const {
        state: { usernames, code },
    } = useLocation();
    const toast = useToast();
    const [users, setUsers] = React.useState<
        Array<{ username: string; isReady: boolean }>
    >(usernames.map((username: string) => ({ username, isReady: false })));
    const [isLoading, setLoading] = React.useState(false);
    const [isDisabled, setDisabled] = React.useState(false);
    const currentUser = React.useRef(usernames[usernames.length - 1]);

    React.useEffect(() => {
        const message = (lastMessage?.data as string) || "";
        if (message.includes("User Join")) {
            setUsers((prev) => [
                ...prev,
                { username: message.match(/:(.+)/)![1], isReady: false },
            ]);
        } else if (message.includes("Ready Success")) {
            const username = message.match(/:(.+)/)![1];
            if (username === currentUser.current) {
                setLoading(false);
                setDisabled(true);
                toast({
                    title: "You are ready",
                    description:
                        "Waiting for everyone else in the lobby to get ready",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
            setUsers((prev) =>
                prev.map((user) => {
                    if (user.username === username) {
                        return { ...user, isReady: true };
                    } else {
                        return user;
                    }
                })
            );
        }
    }, [lastMessage, setUsers, toast]);

    return (
        <Box textAlign={"center"}>
            <Heading>Lobby - {code}</Heading>
            <SimpleGrid columns={2} spacing={5} my={5}>
                {users?.map((user, index) => (
                    <Tag key={index} justifyContent="space-evenly" p={3}>
                        <TagLabel fontSize={40} lineHeight="tall">
                            {user.username}
                        </TagLabel>
                        <Badge
                            colorScheme={user.isReady ? "green" : "red"}
                            fontSize="20"
                        >
                            {user.isReady ? "Ready" : "Not Ready"}
                        </Badge>
                    </Tag>
                ))}
            </SimpleGrid>
            <Button
                isLoading={isLoading}
                isDisabled={isDisabled}
                onClick={() => {
                    setLoading(true);
                    sendMessage(`Ready:${currentUser.current}:${code}`);
                }}
                colorScheme="green"
                w={40}
            >
                Ready
            </Button>
        </Box>
    );
};
