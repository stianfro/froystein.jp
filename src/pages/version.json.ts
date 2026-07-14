import packageMetadata from "../../package.json";

export const prerender = true;

export function GET() {
  return new Response(
    JSON.stringify({
      version: packageMetadata.version,
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );
}
