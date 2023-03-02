interface GetMultipleChoiceQuestions {
    amount: number,
    difficulty: "easy" | "medium" | "hard"
}

export const getMultipleChoiceQuestions = async (arg: GetMultipleChoiceQuestions) => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${arg.amount}&type=multiple&difficulty=${arg.difficulty}`);
    return res.json();
}