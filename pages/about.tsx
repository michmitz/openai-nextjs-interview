import React from "react";
import { NextPage } from "next";
import { Sidebar } from "@/components/atoms/sidebar/Sidebar";
import { appStrings } from "@/constants/appStrings";
import { signIn, useSession } from "next-auth/react";
import { SpeechBubblePrompt } from "@/components/molecules/speech_bubble_prompt/SpeechBubblePrompt";
import styles from "../styles/About.module.css";
import { RightCircleFilled } from "@ant-design/icons";

const { notSignedInText, signInButtonText } = appStrings.speechBubble;

const { about } = appStrings.header;

const SubHeader: React.FC<{ text: string }> = ({ text }) => {
  return <p className={`${styles.subHeader} purpleGradient`}>{text}</p>;
};

const About: NextPage = () => {
  const { data: session, status } = useSession();
  const pageLoading = status === "loading";

  if (session) {
    return (
      <main className="lightGlassEffect fadeIn">
        <div className="container">
          <div className="sidebar">
            <Sidebar
              headerText={about}
              isLoggedIn={true}
              user={session?.user?.email}
            />
          </div>

          <div className="rightContainer">
            <p className={styles.header}>Thank you so much for visiting!</p>

            <div className={styles.container}>
              <SubHeader text="What is this app?" />
              <div className={styles.contentBlock}>
                <p>
                  This application serves as a virtual interviewer using
                  questions fetched from chatGPTs API. AI is not perfect, and occasionally questions may be irrelevant or
                  weirdly formatted, but you can always fetch a new question.
                </p>
              </div>

              <SubHeader text="How to use:" />

              <ol className={`${styles.contentBlock} ${styles.list}`}>
                <li>Select a mode: software or job title</li>
                <li>
                  The AI will ask you a question and share an example answer.
                </li>
                <li>
                  You are welcome to write a note on how you would answer that
                  question, then click on the notes tab to view, update, or
                  delete your notes.
                </li>
              </ol>

              <SubHeader text="A few notes:" />
              <ul className={`${styles.contentBlock} ${styles.list}`}>
                <li>
                  This app was created using the OpenAI gpt-3.5-turbo language
                  model.
                </li>
                <li>Background is from Pexels.</li>
                <li>Robot icon generated by AI via Canva.com.</li>
                <li>User notes are encrypted.</li>
              </ul>

              <SubHeader text="Contact me:" />
              <div className={`${styles.contentBlock} ${styles.links}`}>
                <span className={styles.linkSpan}>
                  <RightCircleFilled />
                  <a
                    href="https://linkedin.com/in/michellestermitz"
                    className={styles.link}
                  >
                    LinkedIn
                  </a>
                </span>

                <span className={styles.linkSpan}>
                  <RightCircleFilled />
                  <a href="https://github.com/michmitz" className={styles.link}>
                    GitHub
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!session && pageLoading) {
    return <></>;
  }

  return (
    <div className="signedOut">
      <SpeechBubblePrompt
        text={notSignedInText}
        onClick={() => signIn()}
        buttonText={signInButtonText}
      />
    </div>
  );
};

export default About;
