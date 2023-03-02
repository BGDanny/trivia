import * as React from "react";
import { Tag, SimpleGrid, Box, Heading, Button } from "@chakra-ui/react";

export const Lobby: React.FC = () => {
    return (
        <Box textAlign={"center"}>
            <Heading>Lobby</Heading>
            <SimpleGrid columns={2} spacing={10}>
                <Tag>Long Tran</Tag>
                <Tag>Kameshwara Sekar</Tag>
                <Tag>Viet Long</Tag>
                <Tag>Apostolos</Tag>
            </SimpleGrid>
            <Button>Start Game</Button>
        </Box>
    );
};
