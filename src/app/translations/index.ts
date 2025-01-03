const translations = {
  en: {
    title: "MboaAI Chat Assistant",
    welcomeMessage: "Hello! I'm MboaAI, your virtual assistant. How can I help you today?",
    searchPlaceholder: "Type your message here...",
    loading: "AI is typing...",
    errorMessage: "Error: Unable to connect to the AI service. Please try again.",
    sendButton: "Send",
  },
  fr: {
    title: "Assistant Chat MboaAI",
    welcomeMessage: "Bonjour ! Je suis MboaAI, votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",

    searchPlaceholder: "Tapez votre message ici...",
    loading: "L'IA est en train d'écrire...",
    errorMessage: "Erreur : Impossible de se connecter au service d'IA. Veuillez réessayer.",
    sendButton: "Envoyer",
  },
};

export default translations;
export type TranslationKeys = keyof typeof translations; // "en" | "fr"
export type TranslationValues = (typeof translations)[TranslationKeys]; // Structure of `translations.en` or `translations.fr`
