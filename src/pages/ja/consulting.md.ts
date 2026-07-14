import type { APIRoute } from "astro";
import {
  consultancyMarkdown,
  markdownResponse,
} from "../../data/markdown-content";

export const GET: APIRoute = () => markdownResponse(consultancyMarkdown("ja"));
