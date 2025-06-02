"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmbedding = exports.openAI = void 0;
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.openAI = new openai_1.OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});
const generateEmbedding = async (text) => {
    const response = await exports.openAI.embeddings.create({
        model: 'text-embedding-3-small',
        input: text
    });
    return response.data[0].embedding;
};
exports.generateEmbedding = generateEmbedding;
