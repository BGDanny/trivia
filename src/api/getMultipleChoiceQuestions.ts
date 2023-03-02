export interface GetMcQuestionsRequest {
    amount: number,
    difficulty: "easy" | "medium" | "hard"
}

export interface GetMcQuestionsResponse {
    results: [{
        category: string,
        difficulty: string,
        question: string,
        correct_answer: string,
        incorrect_answers: string[],
    }]
}

export const getMultipleChoiceQuestions = async (arg: GetMcQuestionsRequest): Promise<GetMcQuestionsResponse> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${arg.amount}&type=multiple&difficulty=${arg.difficulty}`);

    return res.json();
}