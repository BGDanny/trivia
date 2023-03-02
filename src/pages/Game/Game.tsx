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
import { useMcQuestions } from "../../hooks/useMcQuestions";
import PageLoader from "../../components/PageLoader";

const htmlDecode = (input: string) => {
    var e = document.createElement('textarea');
    e.innerHTML = input;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

export const Game: React.FC = () => {
    const { data } = useMcQuestions({
        amount: 10,
        difficulty: "easy",
    });
    if (data)
        return (
            <Box>
                <Badge>1/10</Badge>
                <Tag float={"right"}>
                    <TagLeftIcon as={TimeIcon} />
                    <TagLabel>0:30</TagLabel>
                </Tag>
                <VStack textAlign="center" fontSize="xl">
                    // Response from trivia may contains special HTML character that needs to be decoded
                    <Heading>{htmlDecode(data.results[0].question)}</Heading>
                    <Button>11</Button>
                    <Button>12</Button>
                    <Button>13</Button>
                    <Button>14</Button>
                </VStack>
            </Box>
        );

    return <PageLoader />;
};
