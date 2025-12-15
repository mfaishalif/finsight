import { NextRequest, NextResponse } from "next/server";
const pkg = require("yahoo-finance2");
const YahooFinance = pkg.default || pkg;
const yahooFinance = new YahooFinance();

// URL of the Python ML backend (FastAPI)
const ML_BACKEND_URL = process.env.ML_API_URL || "https://mfaishalif-finsight-prediction-api.hf.space";

import { validateRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
    // Auth Check
    const auth = validateRequest(request);
    if (!auth.isValid) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get("symbol") || "USDIDR=X";
    const mode = searchParams.get("mode") || "daily";

    try {
        // Try requesting the real ML backend
        const res = await fetch(`${ML_BACKEND_URL}/predict/${mode}?symbol=${symbol}`);
        if (res.ok) {
            const data = await res.json();
            return NextResponse.json(data);
        }
    } catch (e) {
        console.warn("ML Backend unavailable, returning mock prediction.");
    }

    // Fallback: Generate mock prediction logic
    // Get current price first
    let baseline = 16500;
    try {
        const quote = await yahooFinance.quote(symbol);
        if (quote && quote.regularMarketPrice) baseline = quote.regularMarketPrice;
    } catch (e) { }

    const mockData = [];
    const now = new Date();

    // Predict next 7 days
    for (let i = 1; i <= 7; i++) {
        const futureDate = new Date(now);
        futureDate.setDate(now.getDate() + i);

        // Slight random trend upward/downward
        const noise = (Math.random() - 0.45) * 0.01; // slight bias
        baseline = baseline * (1 + noise);

        // Basic format matching Python backend likely output (pure values or objects)
        // The python code returns 'results', typically a list of values or objects.
        // We'll return documented format if available, or just a helpful structure
        mockData.push({
            date: futureDate.toISOString().split('T')[0],
            price: baseline,
            confidence: "High (Mock)"
        });
    }

    return NextResponse.json({
        symbol,
        mode,
        data: mockData,
        source: "simulation (ml backend unavailable)"
    });
}
