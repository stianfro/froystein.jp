import type { APIRoute } from "astro";
import {
  markdownResponse,
  projectsMarkdown,
} from "../../data/markdown-content";

export const GET: APIRoute = () => markdownResponse(projectsMarkdown("en"));
