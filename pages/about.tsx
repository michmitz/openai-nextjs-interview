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
const { header, whatIsAppHeader, whatIsAppText } = appStrings.aboutPage;
const { howToUse, stepOne, stepTwo, stepThree } =
  appStrings.aboutPage.howToUseBlock;
const { notes, noteOne, noteTwo, noteThree, noteFour } =
  appStrings.aboutPage.notesBlock;
const { contact, linkedIn, github } = appStrings.aboutPage.contactBlock;

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
            <p className={styles.header}>{header}</p>

            <div className={styles.container}>
              <SubHeader text={whatIsAppHeader} />
              <div className={styles.contentBlock}>
                <p>{whatIsAppText}</p>
              </div>

              <SubHeader text={howToUse} />

              <ol className={`${styles.contentBlock} ${styles.list}`}>
                <li>{stepOne}</li>
                <li>{stepTwo}</li>
                <li>{stepThree}</li>
              </ol>

              <SubHeader text={notes} />
              <ul className={`${styles.contentBlock} ${styles.list}`}>
                <li>{noteOne}</li>
                <li>{noteTwo}</li>
                <li>{noteThree}</li>
                <li>{noteFour}</li>
              </ul>

              <SubHeader text={contact} />
              <div className={`${styles.contentBlock} ${styles.links}`}>
                <span className={styles.linkSpan}>
                  <RightCircleFilled />
                  <a
                    href="https://linkedin.com/in/michellestermitz"
                    className={styles.link}
                  >
                    {linkedIn}
                  </a>
                </span>

                <span className={styles.linkSpan}>
                  <RightCircleFilled />
                  <a href="https://github.com/michmitz" className={styles.link}>
                    {github}
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
