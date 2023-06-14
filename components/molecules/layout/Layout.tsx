import React from "react";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession();
  const [randomBackground, setRandomBackground] =
    React.useState<string>("background-1.jpg");

  const backgrounds = [...Array(7).keys()].map((i) => {
    return `background-${i + 1}.jpg`;
  });

  React.useEffect(() => {
    if (randomBackground === "background-1.jpg" && session) {
      const randomizeBackground = () => {
        const randomBgIndex = Math.floor(Math.random() * 7);
        return backgrounds[randomBgIndex];
      };
      const background = randomizeBackground();
      setRandomBackground(background);
    }

    if (randomBackground !== "background-1.jpg") {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomBackground, session]);

  return (
    <div
      style={{
        backgroundImage: `url('/${randomBackground}')`,
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        overflow: "auto",
        backgroundPosition: "center center",
      }}
      className={`centerContent ${session && 'fadeIn'}`}
    >
      {children}
    </div>
  );
};
