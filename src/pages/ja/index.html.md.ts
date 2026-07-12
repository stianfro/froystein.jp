import type { APIRoute } from "astro";
import { homeMarkdown, markdownResponse } from "../../data/markdown-content";

export const GET: APIRoute = () => markdownResponse(homeMarkdown("ja"));
