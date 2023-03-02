import { Alert, AlertIcon } from "@chakra-ui/react"

export interface Answer {
    userAnswer: string,
    correctAnswer: string,
}

export const AnswerStatus = ({ userAnswer, correctAnswer }: Answer) => {
    let alertStatus: "error" | "success" = "error";
    let alertMsg = "Wrong!";
    if (userAnswer === correctAnswer) {
        alertMsg = "Correct!";
        alertStatus = "success";
    }
    return <Alert
        status={alertStatus}
        position="fixed"
        bottom={20}
        left={{ base: 0, md: 2 }}
    >
        <AlertIcon />
        {alertMsg}
    </Alert>
}