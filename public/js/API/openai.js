const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// une fonction pour générer un texte à partir d'un prompt
const generateText = async (prompt) => {
    try {
        const response = await openai.complete({
            engine: "davinci",
            prompt,
            maxTokens: 100,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ["\n", " Human:", " AI:"],
        });

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].text;
        } else {
            console.error("Aucun texte généré");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API OpenAI :", error);
        return null;
    }
};

// Exemple d'utilisation de la fonction
(async () => {
    const prompt = "Décrivez les avantages et les inconvénients du travail à distance.";
    const text = await generateText(prompt);
    if (text) {
        console.log("Texte généré :", text);
    } else {
        console.log("Aucun texte généré");
    }
})();


// une fonction pour générer un texte à partir d'un prompt et d'un contexte
const generateTextWithContext = async (prompt, context) => {
    try {
        const response = await openai.search({
            engine: "davinci",
            documents: [context],
            query: prompt,
            maxRerank: 10,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ["\n", " Human:", " AI:"],
        });

        if (response.data && response.data.data && response.data.data.length > 0) {
            return response.data.data[0].document;
        } else {
            console.error("Aucun document trouvé");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API OpenAI :", error);
        return null;
    }
};

// Exemple d'utilisation de la fonction
(async () => {
    const prompt = "Quels sont les avantages du travail à distance ?";
    const context = "Les avantages du travail à distance incluent une plus grande flexibilité, des économies sur les coûts de déplacement et un meilleur équilibre entre vie professionnelle et vie privée.";
    const text = await generateTextWithContext(prompt, context);
    if (text) {
        console.log("Texte généré :", text);
    } else {
        console.log("Aucun texte généré");
    }
})();


// une fonction qui genere a partir d'un prompt une image
const generateImage = async (prompt) => {
    try {
        const response = await openai.complete({
            engine: "davinci",
            prompt,
            maxTokens: 100,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ["\n", " Human:", " AI:"],
        });

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].text;
        } else {
            console.error("Aucun texte généré");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API OpenAI :", error);
        return null;
    }
}

// Exemple d'utilisation de la fonction
(async () => {
    const prompt = "Décrivez une image de chat.";
    const text = await generateImage(prompt);
    if (text) {
        console.log("Texte généré :", text);
    } else {
        console.log("Aucun texte généré");
    }
})();


