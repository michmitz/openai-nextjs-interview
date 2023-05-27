import React from "react";
import styles from "./SpeechBubblePrompt.module.css";
import Image from "next/image";
import { NeumorphicButton } from "@/components/atoms/button/NeumorphicButton";

export interface SpeechBubblePromptProps {
  readonly text: string;
  readonly onClick?: (val: any | null) => void;
  readonly disableButton?: boolean;
  readonly buttonText?: string;
}

export const SpeechBubblePrompt: React.FC<SpeechBubblePromptProps> = ({
  text,
  onClick,
  disableButton,
  buttonText,
}) => {
  return (
    <div className={styles.container}>
      <Image
        src={"/robot.png"}
        width={65}
        height={65}
        alt="robot"
        className={styles.icon}
        priority
      />
      <div className={`${styles.speechBubble} lightGlassEffect purpleGradient`}>
        {text}
        {onClick && (
          <div className={styles.button}>
            <NeumorphicButton
              onClick={onClick}
              text={buttonText}
              height="35px"
              width="170px"
              disabled={disableButton}
            />
          </div>
        )}
      </div>
    </div>
  );
};
