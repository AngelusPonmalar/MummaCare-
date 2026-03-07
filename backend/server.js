import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "anthropic/claude-sonnet-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI Pregnancy Health Assistant.

Rules:
- Only answer pregnancy related questions.
- Provide safe advice about nutrition, food, exercise, and baby health.
- Suggest healthy foods for pregnant women.
- If user asks vulgar, sexual, abusive, or unrelated questions, respond:
  "I can only help with pregnancy health and nutrition questions."
- Never provide unsafe medical advice.
            `
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      reply: response.data.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("AI Error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});