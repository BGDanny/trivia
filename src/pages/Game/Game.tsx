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
    Center,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { useMcQuestions } from "../../hooks/useMcQuestions";
import PageLoader from "../../components/PageLoader";
import { AnswerStatus } from "./AnswerStatus";

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
    const questionAmount = 10;

    const { data } = useMcQuestions({
        amount: questionAmount,
        difficulty: "easy",
    });

    let [questionIndex, setQuestionIndex] = React.useState(0);

    const [alertTrigger, setAlertTrigger] = React.useState(false);

    let [userAnswer, setUserAnswer] = React.useState<string | undefined>(undefined);

    let [score, setScore] = React.useState(0);

    React.useEffect(() => {
        if (alertTrigger) {
            let timeout = setTimeout(() => {
                setAlertTrigger(false);
                setUserAnswer(undefined);
                setQuestionIndex(++questionIndex);
            }, 1000);
            return () => clearTimeout(timeout);
        }
        return;
    }, [alertTrigger]);

    if (data) {
        if (questionIndex > questionAmount - 1)
            return (<Center>
                <VStack>
                    <Heading>You finished this trivia! </Heading>
                    <Heading as="h4">Your score is {score} / {questionAmount}</Heading>
                </VStack>
            </Center>)

        const trivia = data.results[questionIndex];
        const results = trivia.incorrect_answers.concat(trivia.correct_answer);

        return (
            <Box>
                <Badge>{questionIndex + 1}/{questionAmount}</Badge>
                <Tag float={"right"}>
                    <TagLeftIcon as={TimeIcon} />
                    <TagLabel>0:30</TagLabel>
                </Tag>
                <VStack textAlign="center" fontSize="xl">
                    // Response from trivia may contains special HTML character that needs to be decoded
                    <Heading>{htmlDecode(data.results[questionIndex].question)}</Heading>
                    {results.map(ans => <Button
                        colorScheme={userAnswer === undefined ? 'blue' : ans === trivia.correct_answer ? 'green' : 'red'}
                        disabled={userAnswer !== undefined}
                        key={ans}
                        onClick={() => {
                            if (userAnswer === undefined) {
                                setAlertTrigger(true);
                                setUserAnswer(ans);
                                if (ans === trivia.correct_answer)
                                    setScore(++score);
                            }
                        }}
                    >
                        {ans}
                    </Button>)}
                </VStack>
                {alertTrigger && userAnswer !== undefined && <AnswerStatus correctAnswer={trivia.correct_answer} userAnswer={userAnswer} />}
            </Box >
        );
    }
    return <PageLoader />;
};
