import React from "react";
import { GetServerSideProps, NextPage } from "next";
import styles from "../styles/Home.module.css";
import prisma from "@/lib/prisma";
import { Header } from "@/components/atoms/header/Header";
import { appStrings } from "@/constants/appStrings";
import { getSession, signIn, useSession } from "next-auth/react";
import { AnswerField } from "@/components/atoms/answer_field/AnswerField";

type Note = {
  readonly id: string;
  readonly question: string;
  readonly advice: string;
  readonly authorId: string;
  readonly note: string;
};

type UpdatedNote = {
  id: string;
  updatedNote: string;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { notes: [] } };
  }

  const notes = await prisma.note.findMany({
    where: {
      author: { email: session?.user?.email },
    },
  });

  return {
    props: { notes },
  };
};

interface NotesProps {
  readonly notes: ReadonlyArray<Note>;
}

const { notesPage } = appStrings.header;

const Notes: NextPage<NotesProps> = ({ notes }) => {
  // const [noteSaving, setNoteSaving] = React.useState<boolean>(false);
  // const [showAnswerField, setShowAnswerField] = React.useState<boolean>(true);
  const { data: session } = useSession();
  const [notesToEdit, setNotesToEdit] = React.useState<ReadonlyArray<string>>([
    "",
  ]);
  const [notesWithUpdatedAnswers, setNotesWithUpdatedAnswers] = React.useState<
    UpdatedNote[] | []
  >([]);
  const [noteResponse, setNoteResponse] = React.useState<string>("");

  const handleShowEditNote = (noteId: string) => {
    setNotesToEdit([...notesToEdit, noteId]);
  };

  const handleSetAnswerInputs = (note: UpdatedNote) => {
    const updatedNoteIndex = notesWithUpdatedAnswers.findIndex(e => e.id === note.id);
    const notesCopy = [...notesWithUpdatedAnswers]

    if (notesWithUpdatedAnswers.length === 0) {
      setNotesWithUpdatedAnswers([note]);
    }

    if (updatedNoteIndex === -1) {
      setNotesWithUpdatedAnswers([...notesCopy, note]);
    } else { 
      setNotesWithUpdatedAnswers([...notesCopy.splice(updatedNoteIndex, 1, note)]); }
  };

  const handleSubmitNote = async (id: string) => {
    const updatedNote = notesWithUpdatedAnswers.find((x) => x.id === id);
    // console.log('updated note', updatedNote)
    // setNoteSaving(true);

    const data = {
      note: updatedNote?.updatedNote,
    };

    const response = await fetch(`/api/note/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      setNoteResponse("Note successfully updated");
      // setShowAnswerField(false);
    } else {
      setNoteResponse("Note update failed");
    }
  };

  if (!session) {
    return (
      <div>
        Not authorized to view this page
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }
  return (
    <div className={styles.main}>
      <Header headerText={notesPage} />
      Notes Page
      {notes.map((note) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 400,
              marginBottom: 20,
            }}
            key={note.id}
          >
            <div
              style={{ padding: 10, backgroundColor: "pink", color: "white" }}
            >
              {note.question}
            </div>
            <div
              style={{ padding: 10, backgroundColor: "gray", color: "white" }}
            >
              Your Note: {note.note}
            </div>
            <div>
              {/* Hide after click */}
              <button onClick={() => handleShowEditNote(note.id)} key={note.id}>
                Update Note?
              </button>
            </div>

            {notesToEdit.includes(note.id) ? (
              <AnswerField
                onChange={(e) => {
                  handleSetAnswerInputs({
                    id: note.id,
                    updatedNote: e,
                  } as UpdatedNote)}
                }
                onSubmit={() => handleSubmitNote(note.id)}
              />
            ) : (
              <></>
            )}
          </div>
        );
      })}
      {/* Temporary success note */}
      {noteResponse && (
        <div
          style={{
            width: 200,
            height: 50,
            backgroundColor: "gray",
            color: "black",
            marginTop: 10,
            padding: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{noteResponse}</p>
        </div>
      )}
    </div>
  );
};

export default Notes;
