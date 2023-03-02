import * as React from "react";
import {
    VStack,
    Heading,
    Button,
    Box,
    Badge,
    Tag,
    TagLeftIcon,
    TagLabel,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

const Game: React.FC = () => {
    return (
        <Box>
            <Badge>1/10</Badge>
            <Tag float={"right"}>
                <TagLeftIcon as={TimeIcon} />
                <TagLabel>0:30</TagLabel>
            </Tag>
            <VStack textAlign="center" fontSize="xl">
                <Heading>What is the age of Kameshwara Sekar?</Heading>
                <Button>11</Button>
                <Button>12</Button>
                <Button>13</Button>
                <Button>14</Button>
            </VStack>
        </Box>
    );
};

export default Game;
