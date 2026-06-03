import { useState } from "react";
import { Brain, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router";

export function AptitudeTest() {
  const [currentSection, setCurrentSection] = useState<
    "intro" | "lrdi" | "qa" | "varc" | "results"
  >("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ lrdi: 0, qa: 0, varc: 0 });

  // Mock questions for each section
  const sections = {
    lrdi: {
      name: "Logical Reasoning & Data Interpretation",
      questions: [
        {
          question:
            "If A is taller than B, and B is taller than C, who is the shortest?",
          options: ["A", "B", "C", "Cannot be determined"],
          correct: 2,
        },
        {
          question:
            "In a sequence: 2, 6, 12, 20, 30, what is the next number?",
          options: ["40", "42", "44", "46"],
          correct: 1,
        },
        {
          question:
            "A dataset shows sales: Jan (100), Feb (150), Mar (120). What's the average?",
          options: ["120", "123.33", "130", "125"],
          correct: 1,
        },
      ],
    },
    qa: {
      name: "Quantitative Aptitude",
      questions: [
        {
          question: "What is 15% of 200?",
          options: ["25", "30", "35", "40"],
          correct: 1,
        },
        {
          question: "If x + 5 = 12, what is x?",
          options: ["5", "6", "7", "8"],
          correct: 2,
        },
        {
          question: "What is the area of a rectangle with length 8 and width 5?",
          options: ["30", "35", "40", "45"],
          correct: 2,
        },
      ],
    },
    varc: {
      name: "Verbal Ability & Reading Comprehension",
      questions: [
        {
          question: 'What is a synonym for "ubiquitous"?',
          options: ["Rare", "Everywhere", "Ancient", "Modern"],
          correct: 1,
        },
        {
          question: "Identify the correct sentence:",
          options: [
            "She don't like apples",
            "She doesn't likes apples",
            "She doesn't like apples",
            "She not like apples",
          ],
          correct: 2,
        },
        {
          question: 'What does "ephemeral" mean?',
          options: ["Lasting", "Temporary", "Strong", "Weak"],
          correct: 1,
        },
      ],
    },
  };

  const handleStartTest = (section: "lrdi" | "qa" | "varc") => {
    setCurrentSection(section);
    setCurrentQuestion(0);
  };

  const handleAnswer = (selectedOption: number) => {
    const section = currentSection as "lrdi" | "qa" | "varc";
    const currentQ = sections[section].questions[currentQuestion];
    
    if (selectedOption === currentQ.correct) {
      setScores((prev) => ({ ...prev, [section]: prev[section] + 1 }));
    }

    if (currentQuestion < sections[section].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Move to next section or results
      if (section === "lrdi") {
        setCurrentSection("qa");
        setCurrentQuestion(0);
      } else if (section === "qa") {
        setCurrentSection("varc");
        setCurrentQuestion(0);
      } else {
        setCurrentSection("results");
      }
    }
  };

  if (currentSection === "intro") {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Aptitude Assessment
            </h1>
            <p className="text-gray-600">
              Complete three sections to evaluate your cognitive abilities
            </p>
          </div>

          <div className="space-y-6">
            {/* LRDI Section */}
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Logical Reasoning & Data Interpretation
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Test your logical thinking and data analysis skills
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Brain className="w-4 h-4 mr-1" />3 Questions
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />5 minutes
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleStartTest("lrdi")}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start LRDI
                </button>
              </div>
            </div>

            {/* QA Section */}
            <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Quantitative Aptitude
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Assess your mathematical and numerical reasoning abilities
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Brain className="w-4 h-4 mr-1" />3 Questions
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />5 minutes
                    </span>
                  </div>
                </div>
                <button
                  disabled
                  className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg cursor-not-allowed"
                >
                  Start QA
                </button>
              </div>
            </div>

            {/* VARC Section */}
            <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Verbal Ability & Reading Comprehension
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Evaluate your language skills and comprehension
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Brain className="w-4 h-4 mr-1" />3 Questions
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />5 minutes
                    </span>
                  </div>
                </div>
                <button
                  disabled
                  className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg cursor-not-allowed"
                >
                  Start VARC
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="font-semibold text-gray-800 mb-3">
              Instructions
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Complete all three sections sequentially</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Each section contains multiple-choice questions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Your scores will be used for career recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === "results") {
    const totalQuestions = 9;
    const totalScore = scores.lrdi + scores.qa + scores.varc;
    const percentage = Math.round((totalScore / totalQuestions) * 100);

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-8 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-800">
                Aptitude Test Completed!
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Overall Score</h3>
                <p className="text-5xl font-bold">
                  {totalScore}/{totalQuestions}
                </p>
                <p className="text-indigo-100 mt-2">{percentage}% Correct</p>
              </div>

              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">LRDI</span>
                    <span className="text-indigo-600 font-bold">
                      {scores.lrdi}/3
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(scores.lrdi / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">QA</span>
                    <span className="text-purple-600 font-bold">
                      {scores.qa}/3
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(scores.qa / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-pink-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">VARC</span>
                    <span className="text-pink-600 font-bold">
                      {scores.varc}/3
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-pink-600 h-2 rounded-full"
                      style={{ width: `${(scores.varc / 3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Next, complete your personality assessment to get personalized recommendations.
                </p>
                <Link
                  to="/student/personality"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  Next: Personality Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question view
  const section = currentSection as "lrdi" | "qa" | "varc";
  const question = sections[section].questions[currentQuestion];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {sections[section].name}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Question {currentQuestion + 1} of {sections[section].questions.length}
            </p>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Time remaining: 4:32</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all"
              style={{
                width: `${
                  ((currentQuestion + 1) / sections[section].questions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all"
              >
                <span className="flex items-center">
                  <span className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-semibold text-gray-700">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
