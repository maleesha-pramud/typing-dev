/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// console.log('API', apiKey)
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const phraseGenerator = async (phrase_length, subject, difficulty_level) => {
    const prompt = `
        subject = ${subject},
        phrase_length = ${phrase_length},
        difficulty_level = ${difficulty_level},

        Generate an array of phrases. Each phrase should have exactly ${phrase_length} characters. The phrases should be highly relevant to the subject "${subject}" and must include terms, jargon, or phrases commonly used by a {subject}. The difficulty level should be ${difficulty_level}. 
        Follow these rules:
        - Each phrase **must be a single line** (no line breaks or newlines).
        - For the subject "{subject}", ensure that the generated content includes words or numbers specific to their daily tasks.
        - If the difficulty is "easy", the output should include simple and frequently used terms or concepts.
        - If the difficulty is "normal", use moderately complex terms and ideas common to the subject.
        - If the difficulty is "hard", the output should be more advanced, using technical or specialized terms related to the subject.
        Ensure that the total character count of each phrase is exactly {phrase_length}, including spaces and punctuation.
        Return like this "phrase1,phrase2,phrase3".
    `;


    const result = await model.generateContent(prompt);
    // console.log(result.response.text());

    return result.response.text().replace(/\n/g, '').trim().split(',');
}

export default phraseGenerator;