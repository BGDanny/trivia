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
    useToast,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketProps } from "../../types";
import Countdown from "react-countdown";

export const Game: React.FC<SocketProps> = ({ lastMessage, sendMessage }) => {
    const navi = useNavigate();
    const totalQuestions = 10;
    const {
        state: { initialQuestion, code, username },
    } = useLocation();
    const toast = useToast();
    const [currentQuestion, setQuestion] = React.useState<{
        question: string;
        answer: string;
        options: string[];
    }>(initialQuestion);
    const [questionIndex, setQuestionIndex] = React.useState(
        +initialQuestion.round || 1
    );
    const [isButtonDisabled, setButtonDisabled] = React.useState(false);
    const timeLeft = React.useRef<number>(+initialQuestion.time || 30);

    React.useEffect(() => {
        const message = (lastMessage?.data as string) || "";
        if (message.startsWith("Everyone Responded:")) {
            timeLeft.current = 30;
            const leaderboard: Array<{ username: string; points: string }> =
                JSON.parse(message.match(/:(.+)/)![1]).leaderboard;
            toast({
                title: (
                    <>
                        The next question will appear in{" "}
                        <Countdown
                            date={Date.now() + 5000}
                            renderer={({ seconds }) => <span>{seconds}</span>}
                        />
                    </>
                ),
                description: (
                    <TableContainer>
                        <Table colorScheme={"whiteAlpha"}>
                            <TableCaption placement="top" fontSize={"large"}>
                                Current Scoreboard
                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Username</Th>
                                    <Th>Score</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {leaderboard
                                    .sort((a, b) => +b.points - +a.points)
                                    .map((user, index) => (
                                        <Tr key={index}>
                                            <Td>{user.username}</Td>
                                            <Td>{user.points}</Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                ),
                status: "info",
                duration: 5000,
                isClosable: true,
                variant: "subtle",
                position: "top-left",
            });
            setTimeout(() => {
                setQuestion(JSON.parse(message.match(/:(.+)/)![1]));
                setQuestionIndex((prev) => ++prev);
                setButtonDisabled(false);
            }, 5000);
        } else if (message.startsWith("Game Over:")) {
            setTimeout(() => {
                navi("/result", {
                    state: JSON.parse(message.match(/:(.+)/)![1]),
                });
            }, 3000);
        }
    }, [lastMessage, toast, navi]);

    return (
        <Box>
            <Badge>
                {questionIndex}/{totalQuestions}
            </Badge>
            <Tag float={"right"}>
                <TagLeftIcon as={TimeIcon} />
                <TagLabel>
                    <Countdown
                        date={Date.now() + timeLeft.current * 1000}
                        onComplete={() => {
                            setButtonDisabled(true);
                            sendMessage(`Answer:${username}:${code}:No Answer`);
                            toast({
                                title: "You failed to answer within the time limit",
                                description: `The correct answer is ${currentQuestion.answer}`,
                                status: "error",
                                duration: 3000,
                                isClosable: true,
                            });
                        }}
                        key={questionIndex}
                        renderer={({ formatted }) => {
                            if (isButtonDisabled) {
                                return <span>00:00</span>;
                            } else {
                                return (
                                    <span>
                                        {formatted.minutes}:{formatted.seconds}
                                    </span>
                                );
                            }
                        }}
                    />
                </TagLabel>
            </Tag>
            <VStack textAlign="center">
                <Heading>{currentQuestion.question}</Heading>
                {currentQuestion.options.map((option, index) => (
                    <Button
                        key={index}
                        isDisabled={isButtonDisabled}
                        w={300}
                        overflowWrap="break-word"
                        whiteSpace={"normal"}
                        colorScheme={
                            isButtonDisabled
                                ? option === currentQuestion.answer
                                    ? "green"
                                    : "red"
                                : "blue"
                        }
                        h="auto"
                        py={5}
                        onClick={() => {
                            setButtonDisabled(true);
                            sendMessage(`Answer:${username}:${code}:${option}`);
                            if (currentQuestion.answer === option) {
                                toast({
                                    title: "You selected the correct option :)",
                                    description: `The answer is indeed ${currentQuestion.answer}`,
                                    status: "success",
                                    duration: 3000,
                                    isClosable: true,
                                });
                            } else {
                                toast({
                                    title: "You answered incorrectly :(",
                                    description: `The correct answer is ${currentQuestion.answer} but you chose ${option}`,
                                    status: "error",
                                    duration: 3000,
                                    isClosable: true,
                                });
                            }
                        }}
                    >
                        {option}
                    </Button>
                ))}
            </VStack>
        </Box>
    );
};
