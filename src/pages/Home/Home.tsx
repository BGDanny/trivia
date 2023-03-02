import * as React from "react";
import { VStack, Heading, Button, Input } from "@chakra-ui/react";

export const Home: React.FC = () => {
    const [code, setCode] = React.useState("");
    return (
        <VStack textAlign="center" fontSize="xl">
            <Heading>Trivia</Heading>
            <Button>{code ? "Join Lobby with Code" : "Create Lobby"}</Button>
            <Input
                placeholder="Lobby Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                w={"min"}
            />
        </VStack>
    );
};
