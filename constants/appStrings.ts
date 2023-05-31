export const appStrings = {
  aiPrompts: {
    askQuestionPrompt:
      "Pretend you are interviewing me for a software engineer position. Ask me one question, then give me an example answer. Label question and answer.",
    getSubjectsPrompt:
      "Generate an array of software engineer interview subjects, including frontend and backend technologies",
  },
  speechBubble: {
    questionPromptText:
      "Welcome! I'm a virtual interviewer. Click the button below to get started!",
    questionPromptButtonText: "Ask Me a Question",
    notSignedInText: "Welcome! I'm a virtual interviewer. Click here to sign in.",
    signInButtonText: "Sign In",
  },
  mode: {
    jobTitle: {
      jobTitleFieldLabel: "Enter your own job field or title:",
      jobTitleFieldPlaceholder: "ex. Retail",
      subjectSubmitButton: "Submit",
    },
    software: {
      technicalQuestionFieldLabel: "Enter a technology",
      technicalQuestionFieldPlaceholder: "ex. JavaScript",
    },
    changeSubjectText: "Change Subject",
  },
  getNewQuestion: "Get New Question",
  thinking: "Thinking",
  header: {
    welcome: "Welcome! I'm a virtual interviewer.",
    notesLink: "View Notes",
    modeLabel: "Mode",
    softwareQuestionTypeLabel: "Question Type",
    notesPage: "Notes",
    returnHome: "Return to Interview",
    about: "About",
  },
  notesPage: {
    noteHeader: "Note",
    updateButton: "Update",
    deleteButton: "Delete",
  },
  aboutPage: {
    header: "Thanks for visiting!",
    whatIsAppHeader: "What is this app?",
    whatIsAppText:
      "This application serves as a virtual interviewer using questions fetched from the chatGPT API. AI is not perfect, and occasionally questions may be irrelevant or weirdly formatted. Sometimes the AI will ramble in its response despite having a token cap.",
    howToUseBlock: {
      howToUse: "How to Use:",
      stepOne:
        'Select a mode. Software mode will ask technical, soft skills, specific tech questions, or all three (select "any" from dropdown). Job title mode will allow you to put a specific job in, and the AI will ask questions pertaining to this job or field.',
      stepTwo: " The AI will ask you a question and share an example answer.",
      stepThree:
        "You are welcome to write a note on how you would answer that question, then click on the notes tab to view, update, or delete your notes.",
    },
    notesBlock: {
      notes: "A few notes:",
      noteOne:
        "This app was created using the OpenAI gpt-3.5-turbo language model",
      noteTwo: "Backgrounds are sourced from Pexels.com",
      noteThree: "Robot icon generated by AI via Canva.com",
      noteFour: "Your notes are encrypted and are only accessible by you.",
    },
    contactBlock: {
      contact: "Contact Me:",
      linkedIn: "LinkedIn",
      github: "GitHub",
    },
  },
  answerField: "Write your notes here...",
  answerSubmitButton: "Save Note",
  showAdviceText: "Show Advice?",
};
