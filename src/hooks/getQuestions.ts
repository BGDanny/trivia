import { useQuery } from "react-query"
import { getMultipleChoiceQuestions, GetMultipleChoiceQuestions } from "../api/getMultipleChoiceQuestions"


export const useMcQuestions = (arg: GetMultipleChoiceQuestions) => {
    return useQuery([arg.amount, arg.difficulty], () => getMultipleChoiceQuestions(arg))
}