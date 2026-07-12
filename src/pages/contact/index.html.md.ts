import type { APIRoute } from "astro";
import { contactMarkdown, markdownResponse } from "../../data/markdown-content";

export const GET: APIRoute = () => markdownResponse(contactMarkdown("en"));
