import { v4 as uuidv4 } from "uuid";

export const initQuizContent = (nbQuestions, countries) => {
  let quiz = [];
  const indexOfCountries = getCountriesForQuizIndex(nbQuestions, countries);

  const labelFlag = "À quel pays appartient ce drapeau ?",
    labelCapital = " est la capitale de ?";

  for (let country of indexOfCountries) {
    let question = {
      id: uuidv4(),
      question:
        quiz.length === 0 || quiz.length % 2 === 0
          ? `${countries[country].capital[0]}${labelCapital}`
          : labelFlag,
      flagPicture:
        quiz.length === 0 || quiz.length % 2 === 0
          ? null
          : countries[country].flags.svg,
      userAnswer: null,
      isValid: null,
    };

    const { questions, answer } = getPossibleAnswers(country, countries, quiz);
    question.possibleAnswers = questions;
    question.answer = answer;
    quiz.push(question);
  }
  return quiz;
};
const getPossibleAnswers = (countryIndex, countries, quiz) => {
  const indexOfOtherCountries = getIndexOfOtherCountries(
    countryIndex,
    countries
  );
  const possibleAnswers = {
    questions: [],
    answer: null,
  };

  for (let country of indexOfOtherCountries) {
    possibleAnswers.questions.push({
      id: uuidv4(),
      answer: countries[country].translations.fra.common,
    });
  }

  const responseId = uuidv4();
  possibleAnswers.questions.push({
    id: responseId,
    answer: countries[countryIndex].translations.fra.common,
  });
  possibleAnswers.answer = responseId;
  possibleAnswers.questions = shuffleArray(possibleAnswers.questions);

  return possibleAnswers;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const getIndexOfOtherCountries = (countryIndex, countries) => {
  const nbCountries = countries.length;
  const indexOfOtherCountries = [];

  while (indexOfOtherCountries.length < 3) {
    const randomIndex = Math.floor(Math.random() * nbCountries);
    if (
      !indexOfOtherCountries.includes(randomIndex) &&
      randomIndex !== countryIndex
    ) {
      indexOfOtherCountries.push(randomIndex);
    }
  }

  return indexOfOtherCountries;
};

const getCountriesForQuizIndex = (nbQuestions, countries) => {
  const nbCountries = countries.length;
  const indexOfCountries = [];

  while (indexOfCountries.length < nbQuestions) {
    const randomIndex = Math.floor(Math.random() * nbCountries);
    if (!indexOfCountries.includes(randomIndex)) {
      indexOfCountries.push(randomIndex);
    }
  }

  return indexOfCountries;
};
