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

// The folloing code shuffle answers using Fisher and Yates' algorithm
// Refer https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
// for more detail
const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const Game: React.FC = () => {
    const { data } = useMcQuestions({
        amount: 10,
        difficulty: "easy",
    });

    const [questionIndex, setQuestionIndex] = React.useState(0);

    if (data) {
        const trivia = data.results[questionIndex];
        const results = trivia.incorrect_answers.concat(trivia.correct_answer);
        shuffleArray(results);
        return (
            <Box>
                <Badge>{questionIndex + 1}/10</Badge>
                <Tag float={"right"}>
                    <TagLeftIcon as={TimeIcon} />
                    <TagLabel>0:30</TagLabel>
                </Tag>
                <VStack textAlign="center" fontSize="xl">
                    // Response from trivia may contains special HTML character that needs to be decoded
                    <Heading>{htmlDecode(data.results[questionIndex].question)}</Heading>
                    {results.map(ans => <Button>{ans}</Button>)}
                </VStack>
            </Box>
        );
    }


    return <PageLoader />;
};
