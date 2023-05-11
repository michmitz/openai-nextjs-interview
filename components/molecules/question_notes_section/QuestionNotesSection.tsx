import React from "react";
import { AnswerField } from "@/components/atoms/answer_field/AnswerField";
import { NeumorphicButton } from "@/components/atoms/button/NeumorphicButton";
import { QuestionCard } from "@/components/atoms/question_card/QuestionCard";
import styles from './QuestionNotesSection.module.css'

export interface QuestionNotesSectionProps {
  readonly aiResponse: string;
  readonly noteResponse: string;
  readonly setNoteResponse: (message: string) => void;
}

export const QuestionNotesSection: React.FC<QuestionNotesSectionProps> = ({
  aiResponse,
  noteResponse,
  setNoteResponse,
}) => {
  const [answerInput, setAnswerInput] = React.useState<string>("");
  const [noteSaving, setNoteSaving] = React.useState<boolean>(false);
  const [showAnswerField, setShowAnswerField] = React.useState<boolean>(false);
  const [showNotesButton, setShowNotesButton] = React.useState<boolean>(true);

  const handleSubmitNote = async () => {
    setNoteSaving(true);
    const data = {
      question: aiResponse.split("Answer:")[0],
      advice: aiResponse.split("Answer")[1],
      note: answerInput,
    };

    const response = await fetch("/api/note/create_note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      setNoteSaving(false);
      setNoteResponse("Note successfully created");
      setShowAnswerField(false);
    } else {
      setNoteResponse("Note failed");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: "column"}}>
      <QuestionCard response={aiResponse} />
      {showNotesButton && (
        <div className={styles.writeNoteButton}>
          <NeumorphicButton
            onClick={() => {
              setShowAnswerField(true);
              setShowNotesButton(false);
            }}
            text="Write Note"
            height="32px"
            width="100px"
          />
          </div>
      )}
      {showAnswerField && (
        <AnswerField
          onChange={(e) => setAnswerInput(e)}
          onSubmit={handleSubmitNote}
          loading={noteSaving}
          disableButton={noteSaving || !answerInput}
        />
      )}
    </div>
  );
};
