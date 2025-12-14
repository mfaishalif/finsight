import { NextRequest } from "next/server";

// Hardcoded secret key for prototype
// In production, use process.env.API_SECRET_KEY
const API_SECRET_KEY = process.env.API_SECRET_KEY || "finsight-secret-123";
const INTERNAL_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export function validateRequest(request: NextRequest): { isValid: boolean; error?: string; status?: number } {
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const apiKey = request.headers.get("x-api-key");
    const authHeader = request.headers.get("authorization"); // Support Bearer too

    // 1. Internal Access Check
    // Check if Origin or Referer matches our internal URL
    if (origin && origin.startsWith(INTERNAL_URL)) {
        return { isValid: true };
    }
    if (referer && referer.startsWith(INTERNAL_URL)) {
        return { isValid: true };
    }

    // 2. External Access Check (API Key)
    // Support both x-api-key header AND Authorization: Bearer <key>
    let providedKey = apiKey;

    if (!providedKey && authHeader && authHeader.startsWith("Bearer ")) {
        providedKey = authHeader.split(" ")[1];
    }

    if (providedKey === API_SECRET_KEY) {
        return { isValid: true };
    }

    // Failed
    return {
        isValid: false,
        error: "Unauthorized: Invalid or missing API Key.",
        status: 401
    };
}
