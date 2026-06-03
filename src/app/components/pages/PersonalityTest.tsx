import { useState } from "react";
import { Target, CheckCircle } from "lucide-react";
import { Link } from "react-router";

export function PersonalityTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [mbtiType, setMbtiType] = useState("");

  const questions = [
    {
      question: "At a party, you tend to:",
      options: [
        "Interact with many people, including strangers",
        "Interact with a few, known people",
      ],
      dimension: "EI", // Extraversion vs Introversion
    },
    {
      question: "You prefer to focus on:",
      options: [
        "The basic information and facts",
        "Patterns and possibilities",
      ],
      dimension: "SN", // Sensing vs Intuition
    },
    {
      question: "When making decisions, you rely more on:",
      options: ["Logic and consistency", "Personal values and emotions"],
      dimension: "TF", // Thinking vs Feeling
    },
    {
      question: "You prefer a lifestyle that is:",
      options: ["Structured and planned", "Flexible and spontaneous"],
      dimension: "JP", // Judging vs Perceiving
    },
    {
      question: "You find it easier to:",
      options: [
        "Express yourself through actions",
        "Express yourself through words",
      ],
      dimension: "EI",
    },
    {
      question: "You are more interested in:",
      options: ["What is actual and real", "What is possible and innovative"],
      dimension: "SN",
    },
    {
      question: "You make decisions based on:",
      options: ["Objective analysis", "How it affects people"],
      dimension: "TF",
    },
    {
      question: "You prefer to:",
      options: [
        "Have matters settled and decided",
        "Keep your options open",
      ],
      dimension: "JP",
    },
  ];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate MBTI type
      calculateMBTI(newAnswers);
      setCompleted(true);
    }
  };

  const calculateMBTI = (answersList: number[]) => {
    // Simple MBTI calculation based on answers
    let ei = 0,
      sn = 0,
      tf = 0,
      jp = 0;

    answersList.forEach((answer, index) => {
      const dimension = questions[index].dimension;
      if (dimension === "EI") ei += answer === 0 ? 1 : -1;
      if (dimension === "SN") sn += answer === 0 ? 1 : -1;
      if (dimension === "TF") tf += answer === 0 ? 1 : -1;
      if (dimension === "JP") jp += answer === 0 ? 1 : -1;
    });

    const type =
      (ei >= 0 ? "E" : "I") +
      (sn >= 0 ? "S" : "N") +
      (tf >= 0 ? "T" : "F") +
      (jp >= 0 ? "J" : "P");

    setMbtiType(type);
  };

  const mbtiDescriptions: { [key: string]: { title: string; description: string } } = {
    INTJ: {
      title: "The Architect",
      description:
        "Strategic thinkers with a plan for everything. Excel in analytical and strategic roles.",
    },
    INTP: {
      title: "The Logician",
      description:
        "Innovative inventors with an unquenchable thirst for knowledge. Great for research and development.",
    },
    ENTJ: {
      title: "The Commander",
      description:
        "Bold, imaginative leaders who find a way or make one. Perfect for management and leadership.",
    },
    ENTP: {
      title: "The Debater",
      description:
        "Smart and curious thinkers who cannot resist an intellectual challenge. Ideal for consulting.",
    },
    INFJ: {
      title: "The Advocate",
      description:
        "Quiet and mystical, yet inspiring and tireless idealists. Great for counseling and HR.",
    },
    INFP: {
      title: "The Mediator",
      description:
        "Poetic, kind, and altruistic people. Excel in creative and helping professions.",
    },
    ENFJ: {
      title: "The Protagonist",
      description:
        "Charismatic and inspiring leaders. Perfect for teaching and community management.",
    },
    ENFP: {
      title: "The Campaigner",
      description:
        "Enthusiastic, creative, and sociable free spirits. Great for marketing and sales.",
    },
    ISTJ: {
      title: "The Logistician",
      description:
        "Practical and fact-minded individuals. Excel in operations and quality assurance.",
    },
    ISFJ: {
      title: "The Defender",
      description:
        "Very dedicated and warm protectors. Ideal for healthcare and customer service.",
    },
    ESTJ: {
      title: "The Executive",
      description:
        "Excellent administrators managing things and people. Perfect for project management.",
    },
    ESFJ: {
      title: "The Consul",
      description:
        "Caring, social people eager to help others. Great for event management and hospitality.",
    },
    ISTP: {
      title: "The Virtuoso",
      description:
        "Bold and practical experimenters. Excel in engineering and technical roles.",
    },
    ISFP: {
      title: "The Adventurer",
      description:
        "Flexible and charming artists. Ideal for design and creative industries.",
    },
    ESTP: {
      title: "The Entrepreneur",
      description:
        "Smart, energetic, and perceptive people. Perfect for business development and sales.",
    },
    ESFP: {
      title: "The Entertainer",
      description:
        "Spontaneous, energetic, and enthusiastic people. Great for entertainment and public relations.",
    },
  };

  if (completed) {
    const mbtiInfo = mbtiDescriptions[mbtiType] || {
      title: "Your Personality Type",
      description: "A unique combination of traits.",
    };

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-8 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-800">
                Personality Assessment Completed!
              </h2>
            </div>

            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 mb-4">
                <h3 className="text-6xl font-bold text-white">{mbtiType}</h3>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">
                {mbtiInfo.title}
              </h4>
              <p className="text-lg text-gray-600">{mbtiInfo.description}</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <h5 className="font-semibold text-gray-800 mb-2">Energy</h5>
                <p className="text-2xl font-bold text-indigo-600">
                  {mbtiType[0] === "E" ? "Extravert" : "Introvert"}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <h5 className="font-semibold text-gray-800 mb-2">Information</h5>
                <p className="text-2xl font-bold text-purple-600">
                  {mbtiType[1] === "S" ? "Sensing" : "Intuition"}
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-4 text-center">
                <h5 className="font-semibold text-gray-800 mb-2">Decisions</h5>
                <p className="text-2xl font-bold text-pink-600">
                  {mbtiType[2] === "T" ? "Thinking" : "Feeling"}
                </p>
              </div>
              <div className="bg-violet-50 rounded-lg p-4 text-center">
                <h5 className="font-semibold text-gray-800 mb-2">Lifestyle</h5>
                <p className="text-2xl font-bold text-violet-600">
                  {mbtiType[3] === "J" ? "Judging" : "Perceiving"}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 mb-8 border border-pink-100">
              <h4 className="font-semibold text-gray-800 mb-3">
                Career Alignment
              </h4>
              <p className="text-gray-600">
                Your {mbtiType} personality type will be integrated with your resume skills and
                aptitude scores to provide highly personalized career recommendations that match
                both your abilities and natural preferences.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  All assessments complete! View your AI-powered career recommendations.
                </p>
                <Link
                  to="/student/recommendations"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  View Recommendations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            MBTI Personality Assessment
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-gradient-to-r from-pink-600 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="w-8 h-8 text-pink-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              {question.question}
            </h2>
          </div>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-6 rounded-lg border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition-all"
              >
                <span className="flex items-center text-lg">
                  <span className="bg-pink-100 text-pink-600 w-10 h-10 rounded-full flex items-center justify-center mr-4 font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100">
          <h3 className="font-semibold text-gray-800 mb-2">
            About MBTI Assessment
          </h3>
          <p className="text-gray-600 text-sm">
            The Myers-Briggs Type Indicator (MBTI) assesses your preferences in four dimensions:
            how you gain energy (E/I), process information (S/N), make decisions (T/F), and
            approach the outside world (J/P). Your type helps identify careers that align with your
            natural tendencies.
          </p>
        </div>
      </div>
    </div>
  );
}
