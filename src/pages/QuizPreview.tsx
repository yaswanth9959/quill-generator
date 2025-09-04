import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Edit3, Check, Download, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Mock generated questions
const mockQuestions = [
  {
    id: 1,
    type: "mcq",
    question: "What is the primary function of photosynthesis in plants?",
    options: [
      "To absorb water from soil",
      "To convert sunlight into chemical energy",
      "To release oxygen into atmosphere",
      "To grow taller and stronger"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "Photosynthesis converts light energy into chemical energy (glucose) that plants use for growth and metabolism."
  },
  {
    id: 2,
    type: "tf",
    question: "Chlorophyll is the green pigment responsible for capturing light energy in photosynthesis.",
    correctAnswer: true,
    difficulty: "easy",
    explanation: "Chlorophyll is indeed the primary pigment that absorbs light energy, giving plants their green color."
  },
  {
    id: 3,
    type: "fill",
    question: "The chemical equation for photosynthesis is: 6CO₂ + 6H₂O + light energy → _____ + 6O₂",
    correctAnswer: "C₆H₁₂O₆ (glucose)",
    difficulty: "hard",
    explanation: "The products of photosynthesis are glucose (C₆H₁₂O₆) and oxygen (O₂)."
  }
];

const QuizPreview = () => {
  const [questions, setQuestions] = useState(mockQuestions);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [quizTitle, setQuizTitle] = useState("Photosynthesis Quiz");

  const handleEdit = (id: number) => {
    setEditingId(editingId === id ? null : id);
  };

  const handleSave = (id: number) => {
    setEditingId(null);
    // In a real app, this would save to backend
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-success text-success-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "hard": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "mcq": return "Multiple Choice";
      case "tf": return "True/False";
      case "fill": return "Fill in the Blank";
      default: return type;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/create">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Create
              </Link>
            </Button>
            <Input
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="text-3xl font-bold border-0 p-0 h-auto bg-transparent text-foreground"
            />
            <p className="text-muted-foreground mt-2">
              {questions.length} questions generated • Ready for review
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline" className="hover-scale">
            <Save className="mr-2 h-4 w-4" />
            Save Quiz
          </Button>
          <Button variant="outline" className="hover-scale">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="hover-scale">
            <Download className="mr-2 h-4 w-4" />
            Export Word
          </Button>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={question.id} className="question-card animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {index + 1}
                    </span>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        {getTypeLabel(question.type)}
                      </Badge>
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editingId === question.id ? handleSave(question.id) : handleEdit(question.id)}
                    className="hover-scale"
                  >
                    {editingId === question.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Edit3 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Question Text */}
                <div>
                  {editingId === question.id ? (
                    <Textarea
                      defaultValue={question.question}
                      className="font-medium text-lg resize-none"
                      rows={2}
                    />
                  ) : (
                    <h3 className="text-lg font-medium leading-relaxed">
                      {question.question}
                    </h3>
                  )}
                </div>

                {/* Options for MCQ */}
                {question.type === "mcq" && question.options && (
                  <div className="grid gap-3">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                          optionIndex === question.correctAnswer
                            ? "border-success bg-success/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        {editingId === question.id ? (
                          <Input defaultValue={option} className="border-0 p-0 h-auto bg-transparent" />
                        ) : (
                          <span className={optionIndex === question.correctAnswer ? "font-medium text-success" : ""}>
                            {option}
                          </span>
                        )}
                        {optionIndex === question.correctAnswer && (
                          <Check className="h-4 w-4 text-success ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* True/False Answer */}
                {question.type === "tf" && (
                  <div className="flex gap-4">
                    <div className={`flex items-center gap-2 p-3 rounded-lg border ${
                      question.correctAnswer === true ? "border-success bg-success/10" : "border-border"
                    }`}>
                      <span className="font-medium">True</span>
                      {question.correctAnswer === true && <Check className="h-4 w-4 text-success" />}
                    </div>
                    <div className={`flex items-center gap-2 p-3 rounded-lg border ${
                      question.correctAnswer === false ? "border-success bg-success/10" : "border-border"
                    }`}>
                      <span className="font-medium">False</span>
                      {question.correctAnswer === false && <Check className="h-4 w-4 text-success" />}
                    </div>
                  </div>
                )}

                {/* Fill in the Blank Answer */}
                {question.type === "fill" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg border border-success bg-success/10">
                    <span className="text-sm text-muted-foreground">Correct Answer:</span>
                    <span className="font-medium text-success">{question.correctAnswer}</span>
                    <Check className="h-4 w-4 text-success ml-auto" />
                  </div>
                )}

                {/* Explanation */}
                <Separator />
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Explanation: </span>
                  {editingId === question.id ? (
                    <Textarea
                      defaultValue={question.explanation}
                      className="mt-2 text-sm resize-none"
                      rows={2}
                    />
                  ) : (
                    question.explanation
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-center gap-4 mt-12 pt-8 border-t">
          <Button asChild variant="outline" size="lg" className="hover-scale">
            <Link to="/create">
              Generate More Questions
            </Link>
          </Button>
          <Button size="lg" className="btn-hero">
            <Save className="mr-2 h-4 w-4" />
            Save Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;