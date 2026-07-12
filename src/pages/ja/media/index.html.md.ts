import type { APIRoute } from "astro";
import {
  markdownResponse,
  mediaMarkdown,
} from "../../../data/markdown-content";

export const GET: APIRoute = () => markdownResponse(mediaMarkdown("ja"));
