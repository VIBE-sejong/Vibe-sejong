import { SignJWT, jwtVerify } from "jose";
import type { MemberRole, TeamName } from "@/types/db";
import { SESSION_MAX_AGE_SECONDS } from "./constants";

export interface SessionClaims {
  sub: string; // member id
  studentId: string;
  name: string;
  team: TeamName;
  role: MemberRole;
}

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing SESSION_SECRET env var");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(claims: SessionClaims): Promise<string> {
  return new SignJWT({ ...claims })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<SessionClaims | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      typeof payload.sub !== "string" ||
      typeof payload.studentId !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.team !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }
    return {
      sub: payload.sub,
      studentId: payload.studentId,
      name: payload.name,
      team: payload.team as TeamName,
      role: payload.role as MemberRole,
    };
  } catch {
    return null;
  }
}
