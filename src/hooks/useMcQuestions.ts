import { useQuery } from "react-query"
import { getMultipleChoiceQuestions, GetMcQuestionsRequest } from "../api/getMultipleChoiceQuestions"

export const useMcQuestions = (arg: GetMcQuestionsRequest) => {
    return useQuery([arg.amount, arg.difficulty], () => getMultipleChoiceQuestions(arg))
}