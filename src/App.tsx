import * as React from "react";
import {
    ChakraProvider,
    VStack,
    theme,
    Heading,
    Button,
    Input,
} from "@chakra-ui/react";

export const App = () => {
    const [code, setCode] = React.useState("");
    return (
        <ChakraProvider theme={theme}>
            <VStack textAlign="center" fontSize="xl">
                <Heading>Trivia</Heading>
                <Button>
                    {code ? "Join Lobby with Code" : "Create Lobby"}
                </Button>
                <Input
                    placeholder="Lobby Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    type="text"
                    w={"min"}
                />
            </VStack>
        </ChakraProvider>
    );
};
