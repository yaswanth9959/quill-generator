import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Upload, Brain, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const CreateQuiz = () => {
  const [questionCount, setQuestionCount] = useState([20]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["mcq", "tf"]);
  const [topic, setTopic] = useState("");
  const [pastedText, setPastedText] = useState("");

  const questionTypes = [
    { id: "mcq", label: "Multiple Choice", description: "4 options, 1 correct" },
    { id: "tf", label: "True/False", description: "Simple true or false questions" },
    { id: "fill", label: "Fill-in-the-blank", description: "Complete the sentence" }
  ];

  const handleTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, typeId]);
    } else {
      setSelectedTypes(selectedTypes.filter(id => id !== typeId));
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Create Your <span className="text-gradient">AI Quiz</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate up to 100 questions from any content using advanced AI
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card className="card-educational border-0 animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Content Input
                </CardTitle>
                <CardDescription>
                  Choose how you want to provide content for your quiz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="topic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="topic">Topic</TabsTrigger>
                    <TabsTrigger value="text">Paste Text</TabsTrigger>
                    <TabsTrigger value="pdf">Upload PDF</TabsTrigger>
                  </TabsList>

                  <TabsContent value="topic" className="mt-6">
                    <div className="space-y-4">
                      <Label htmlFor="topic">Enter a topic or subject</Label>
                      <Input
                        id="topic"
                        placeholder="e.g., World War II, Photosynthesis, JavaScript Basics"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="text-lg"
                      />
                      <p className="text-sm text-muted-foreground">
                        AI will generate comprehensive questions based on your topic
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="mt-6">
                    <div className="space-y-4">
                      <Label htmlFor="text-content">Paste your content</Label>
                      <Textarea
                        id="text-content"
                        placeholder="Paste your text content here..."
                        value={pastedText}
                        onChange={(e) => setPastedText(e.target.value)}
                        rows={8}
                        className="resize-none"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{pastedText.length} / 50,000 characters</span>
                        <span>Questions will be generated from this text</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pdf" className="mt-6">
                    <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">Upload PDF Document</p>
                      <p className="text-muted-foreground mb-4">
                        Supports multi-page PDFs up to 50MB
                      </p>
                      <Button variant="outline" className="hover-scale">
                        Choose File
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Settings Section */}
          <div className="space-y-6">
            <Card className="card-educational border-0 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Quiz Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question Count */}
                <div className="space-y-3">
                  <Label>Number of Questions: {questionCount[0]}</Label>
                  <Slider
                    value={questionCount}
                    onValueChange={setQuestionCount}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Question Types */}
                <div className="space-y-3">
                  <Label>Question Types</Label>
                  <div className="space-y-3">
                    {questionTypes.map((type) => (
                      <div key={type.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={type.id}
                          checked={selectedTypes.includes(type.id)}
                          onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={type.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type.label}
                          </label>
                          <p className="text-xs text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="space-y-3">
                  <Label>Difficulty Level</Label>
                  <Select defaultValue="mixed">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Button asChild className="w-full btn-hero text-lg py-6" disabled={!topic && !pastedText}>
              <Link to="/preview">
                <Brain className="mr-2 h-5 w-5" />
                Generate Quiz
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;