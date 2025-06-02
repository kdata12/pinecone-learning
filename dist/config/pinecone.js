"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.INDEX_NAME = exports.INDICES = exports.pinecone = void 0;
const pinecone_1 = require("@pinecone-database/pinecone");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pinecone = new pinecone_1.Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});
var INDICES;
(function (INDICES) {
    INDICES["JOB_POSTINGS"] = "job-postings";
})(INDICES || (exports.INDICES = INDICES = {}));
exports.INDEX_NAME = 'learning-index';
