const {
    GoogleGenerativeAI,
    HarmCategory, // Imported but not used in this specific snippet, as in the image
    HarmBlockThreshold, // Imported but not used in this specific snippet, as in the image
  } = require("@google/generative-ai");
  require("dotenv").config(); // For loading environment variables from a .env file
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // Get API key from environment variables
  const genAI = new GoogleGenerativeAI(apiKey); // Initialize the Generative AI client
  
  // Specify the model. Note: 'gemini-2.0-flash-exp' might be an experimental or
  // internal model name from the image. Using 'gemini-1.5-flash' is a more
  // commonly available and stable alternative for similar performance.
  // For strict replication of the image, 'gemini-2.0-flash-exp' is used.
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1, // Controls randomness of the output. Higher values are more random.
    topP: 0.95, // Nucleus sampling: filters tokens by cumulative probability.
    topK: 40, // Top-K sampling: filters tokens by picking the top K most likely tokens.
    maxOutputTokens: 8192, // Maximum number of tokens to generate in the response.
    responseMimeType: "text/plain", // Specifies the desired MIME type of the response.
  };
  

    // Start a chat session with predefined history.
    // The history replicates the conversation shown in the image,
    // completing the JSON for the model's previous response to make it valid.
    export const AIDesignIdea = model.startChat({
      generationConfig, // Apply the defined generation configuration
      history: [
        {
          role: "user",
          // Using the full prompt from the previous example for a coherent conversation,
          // as the image shows a truncated version.
          parts: [
            {
              text: `Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name: Indian Spice with description: Indian Restaurant and referring to prompt: A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              // The JSON from the image was incomplete, so it's completed here
              // to form a valid JSON object.
              text: `\`\`\`json
  {
    "prompt": "A vibrant modern mascot logo for 'Indian Spice', an Indian restaurant. The logo features a friendly, animated Indian chef character with a playful expression. The chef is dressed in a classic chef's uniform with a distinctive turban as an accessory. In one hand, they hold a small bowl overflowing with colorful Indian spices, representing the brand. Small decorative touches like stylized spice motifs and subtle Indian patterns enhance the design. The background is a bold, circular design with subtle accents to highlight the chef. Below the character, the brand name 'Indian Spice' is displayed in bold, stylized lettering with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character, appealing to an Indian restaurant audience.",
    "ideas": [
      "Spicy Chef Character",
      "Turbaned Spice Mascot",
      "Curry Pot Friend",
      "Chili Charm Mascot",
      "Masala Bowl Smile"
    ]
  }
  \`\`\``,
            },
          ],
        },
      ],
    });
  
    // Send a new message to the chat session.
    // Replace "INSERT_INPUT_HERE" with your actual prompt for the next turn.
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text()); // Log the model's response text
  
