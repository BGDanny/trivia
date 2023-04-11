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
    Text,
    Spinner,
    Center,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketProps } from "../../types";
import useWebSocket from "react-use-websocket";

export const Game: React.FC<SocketProps> = (props) => {

    const [wsUrl, setWsUrl] = React.useState("ws://68.146.50.113:6609/ws/client");

    const {
        sendMessage,
        lastMessage
    } = useWebSocket(wsUrl, {
        onError: () => setWsUrl("ws://68.146.50.113:6610/ws/client"),
        retryOnError: true,
        shouldReconnect: () => true,
    });

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
        const message = (props.lastMessage?.data as string) || "";
        if (message.startsWith("Everyone Responded:")) {
            timeLeft.current = 30;
            const leaderboard: Array<{ username: string; points: string }> =
                JSON.parse(message.match(/:(.+)/)![1]).leaderboard;
            toast({
                title: (
                    <>
                        The next question is loading
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
    }, [props.lastMessage, toast, navi]);

    const [second, setSecondCountDown] = React.useState(35);

    const [firstTime, setFirstTime] = React.useState(true);

    React.useEffect(() => {
        const message = (lastMessage?.data as string) ?? "";
        console.log(message);
        if (message.startsWith("Time:")) {
            const second = parseInt(message.substring("Time:".length));
            if (second <= 30)
                setSecondCountDown(second);
        }

        if (firstTime) {
            setFirstTime(false);
            console.log("Sending Client Join message");
            sendMessage(`Client Join:${code}:${username}`);
        }
    }, [lastMessage]);

    React.useEffect(() => {
        if (second === 0) {
            setButtonDisabled(true);
            props.sendMessage(`Answer:${username}:${code}:No Answer`);
            toast({
                title: "You failed to answer within the time limit",
                description: `The correct answer is ${currentQuestion.answer}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [second]);

    /**
     * Make sure that you don't show the question when the backend processing in buffer time
     */
    if (second > 30)
        return <Center>
            <Spinner />
        </Center>

    return (
        <Box>
            <Badge>
                {questionIndex}/{totalQuestions}
            </Badge>
            <Tag float={"right"}>
                <TagLeftIcon as={TimeIcon} />
                <TagLabel>
                    <Text>{second}</Text>
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
                            props.sendMessage(`Answer:${username}:${code}:${option}`);
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
