import type { APIRoute } from "astro";
import {
  internationalMarkdown,
  markdownResponse,
} from "../../data/markdown-content";

export const GET: APIRoute = () =>
  markdownResponse(internationalMarkdown("ja"));
