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
    useToast,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import { SocketProps } from "../../types";

export const Game: React.FC<SocketProps> = ({ lastMessage, sendMessage }) => {
    const totalQuestions = 10;
    const {
        state: { question1, code, username },
    } = useLocation();
    const toast = useToast();
    const [currentQuestion, setQuestion] = React.useState<{
        question: string;
        answer: string;
        options: string[];
    }>(question1);
    const [questionIndex, setQuestionIndex] = React.useState(1);
    const [isButtonDisabled, setButtonDisabled] = React.useState(false);

    React.useEffect(() => {
        const message = (lastMessage?.data as string) || "";
        if (message.startsWith("Everyone Responded:")) {
            toast({
                title: "Everyone Responded",
                description: "The next question will appear in 3 seconds",
                status: "info",
                duration: 3000,
                isClosable: true,
            });
            setTimeout(() => {
                setQuestion(JSON.parse(message.match(/:(.+)/)![1]));
                setQuestionIndex((prev) => ++prev);
                setButtonDisabled(false);
            }, 3000);
        }
    }, [lastMessage, toast]);

    return (
        <Box>
            <Badge>
                {questionIndex}/{totalQuestions}
            </Badge>
            <Tag float={"right"}>
                <TagLeftIcon as={TimeIcon} />
                <TagLabel>0:30</TagLabel>
            </Tag>
            <VStack textAlign="center" fontSize="xl">
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
                            sendMessage(`Answer:${username}:${code}:${option}`);
                            setButtonDisabled(true);
                            toast({
                                title: "You have submitted the answer",
                                description: `The next question will appear once everyone submits their answer`,
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                            });
                        }}
                    >
                        {option}
                    </Button>
                ))}
            </VStack>
        </Box>
    );
};
