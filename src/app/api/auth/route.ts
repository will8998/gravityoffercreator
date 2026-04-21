import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { homedir } from "os";

interface AuthData {
  type: string;
  refresh: string;
  access: string;
  expires: number;
}

interface AuthFile {
  anthropic?: AuthData;
  [key: string]: AuthData | undefined;
}

const AUTH_FILE_PATH = join(
  homedir(),
  ".local",
  "share",
  "opencode",
  "auth.json"
);

export async function GET() {
  try {
    const raw = await readFile(AUTH_FILE_PATH, "utf-8");
    const auth: AuthFile = JSON.parse(raw);

    if (!auth.anthropic) {
      return NextResponse.json(
        { error: "No Anthropic auth found in OpenCode" },
        { status: 404 }
      );
    }

    const { access, expires } = auth.anthropic;
    const isExpired = expires && Date.now() > expires;

    return NextResponse.json({
      available: true,
      accessToken: access,
      expired: isExpired,
    });
  } catch {
    return NextResponse.json(
      { error: "OpenCode auth.json not found. Make sure OpenCode is installed and logged in." },
      { status: 404 }
    );
  }
}
