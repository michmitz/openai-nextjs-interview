import { RaisedButton } from "@/components/atoms/button/RaisedButton";
import { InterviewMode } from "@/components/atoms/sidebar/Sidebar";
import { SubjectField } from "@/components/atoms/subject_field/SubjectField";
import React from "react";
import { QuestionNotesSection } from "../question_notes_section/QuestionNotesSection";
import { ThinkingRobot } from "../thinking_robot/ThinkingRobot";
import { SpeechBubblePrompt } from "../speech_bubble_prompt/SpeechBubblePrompt";
import { appStrings } from "@/constants/appStrings";

interface ContentContainerProps {
  readonly mode: InterviewMode;
  readonly noteResponse: string;
  readonly setNoteResponse: (v: string) => void;
  readonly completion: string;
  readonly setCompletion: (v: string) => void;
  readonly softwareQuestionType?: string;
  readonly techQuestionSubject?: string;
  readonly onTechQuestionSubjectChange: (v: string) => void;
}

const { questionPromptText, questionPromptButtonText } =
  appStrings.speechBubble;
const { getNewQuestion } = appStrings;
const { askQuestionPrompt } = appStrings.aiPrompts;
const { jobTitleFieldLabel, jobTitleFieldPlaceholder } =
  appStrings.mode.jobTitle;

export const ContentContainer: React.FC<ContentContainerProps> = ({
  mode,
  noteResponse,
  setNoteResponse,
  completion,
  setCompletion,
  softwareQuestionType,
  techQuestionSubject,
  onTechQuestionSubjectChange,
}) => {
  const techSubjectQuestions =
    mode === "software" && softwareQuestionType === "technical (subject)";
  const generalTechQuestions =
    mode === "software" && softwareQuestionType === "technical (general)";
  const softSkillsQuestions =
    mode === "software" && softwareQuestionType === "soft skills";
  const [questionLoading, setQuestionLoading] = React.useState<boolean>(false);
  const [jobTitle, setJobTitle] = React.useState<string>("");

  const generatePrompt = (
    mode: InterviewMode,
    softwareQuestionType: string | undefined
  ): string => {
    const softwareMode = mode === "software";

    if (softwareMode) {
      if (softwareQuestionType === "technical (general)") {
        return "Pretend you are interviewing me for a software engineer position. Ask me one question, then give me an example answer. Label the question and answer. Ask me only technical questions.";
      } else if (softwareQuestionType === "soft skills") {
        return "Pretend you are interviewing me for a software engineer position. Ask me one question, then give me an example answer. Label the question and answer. Ask me only soft skills questions.";
      } else if (
        softwareQuestionType === "technical (subject)" &&
        techQuestionSubject
      ) {
        return `Pretend you are interviewing me for a software engineer position. Ask me one question, then give me an example answer. Label the question and answer. The interview subject is ${techQuestionSubject}`;
      } else {
        return askQuestionPrompt;
      }
    } else {
      return `Pretend you are interviewing me for a ${jobTitle} position. Ask me one question, then give me an example answer. Label the question and answer.`;
    }
  };

  const handleClick = async (e: any) => {
    const prompt = generatePrompt(mode, softwareQuestionType);
    setCompletion("");
    setNoteResponse("");
    setQuestionLoading(true);

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "user", content: prompt, maxTokens: 200 }),
    });

    const data = await response.json();

    if (data) {
      setCompletion(data.response.content);
    }
    setQuestionLoading(false);
  };

  const onJobTitleChange = (value: string) => {
    setJobTitle(value);
  };

  return (
    <div>
      {!completion ? (
        <div className="flexCenter">
          {mode === "job-title" ? (
            <SubjectField
              onChange={onJobTitleChange}
              label={jobTitleFieldLabel}
              placeholder={jobTitleFieldPlaceholder}
              onClick={handleClick}
              buttonText={questionPromptButtonText}
              buttonDisabled={questionLoading}
            />
          ) : techSubjectQuestions ? (
            <SubjectField
              onChange={onTechQuestionSubjectChange}
              label="Enter a technology"
              placeholder="ex. JavaScript"
              onClick={handleClick}
              buttonText={questionPromptButtonText}
              buttonDisabled={questionLoading}
            />
          ) : !questionLoading ? (
            <SpeechBubblePrompt
              text={
                softSkillsQuestions
                  ? "Ready to be asked about your soft skills?"
                  : generalTechQuestions
                  ? "Ready for some technical questions?"
                  : "Let's do some software interview questions!"
              }
              onClick={handleClick}
              disableButton={questionLoading}
              buttonText={questionPromptButtonText}
            />
          ) : (
            <ThinkingRobot />
          )}
        </div>
      ) : (
        <div className="flexCenter">
          <QuestionNotesSection
            aiResponse={completion}
            noteResponse={noteResponse}
            setNoteResponse={setNoteResponse}
          />
          <div className="questionButton">
            <RaisedButton
              onClick={handleClick}
              text={getNewQuestion}
              height="35px"
              width="200px"
              disabled={questionLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};
