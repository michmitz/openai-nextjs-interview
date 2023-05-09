import React from 'react'
import styles from './ThinkingRobot.module.css'
import Image from "next/image";

export const ThinkingRobot: React.FC = () => {
  return (
    <div className={styles.container}>
      <Image
        src={"/robot.png"}
        width={65}
        height={65}
        alt="robot"
        className={`${styles.icon} ${styles.bounce}`}
      />
      <p className={styles.text}>Thinking</p>
    </div>
  )
}