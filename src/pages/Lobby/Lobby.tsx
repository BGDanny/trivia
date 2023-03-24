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
        state: { username, code },
    } = useLocation();
    const toast = useToast();
    const [users, setUsers] = React.useState<string[]>([username]);

    React.useEffect(() => {
        const message = (lastMessage?.data as string) || "";
        if (message.includes("User Join")) {
            setUsers((prev) => [...prev, message.match(/:(.+)/)![1]]);
        }
    }, [lastMessage, setUsers]);

    return (
        <Box textAlign={"center"}>
            <Heading>Lobby:{code}</Heading>
            <SimpleGrid columns={2} spacing={5} my={5}>
                {users?.map((user, index) => (
                    <Tag key={index} justifyContent="space-evenly" p={3}>
                        <TagLabel fontSize={40} lineHeight="tall">
                            {user}
                        </TagLabel>
                        <Badge colorScheme={"red"} fontSize="20">
                            Not Ready
                        </Badge>
                    </Tag>
                ))}
            </SimpleGrid>
            <Button
                onClick={() => {
                    sendMessage(`Ready:${username}:${code}`);
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
                w={40}
            >
                Ready
            </Button>
        </Box>
    );
};
