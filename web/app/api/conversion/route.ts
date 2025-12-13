import { NextRequest, NextResponse } from "next/server";
const pkg = require("yahoo-finance2");
// In some environments/versions, default export is the Class that needs instantiation.
const YahooFinance = pkg.default || pkg;
const yahooFinance = new YahooFinance();

// Cache interface to store rates temporarily (simple in-memory cache)
// In production, use Redis or similar if high traffic
interface CacheItem {
    rate: number;
    timestamp: number;
}

const CACHE_DURATION_MS = 60 * 1000; // 1 minute cache
const rateCache: Record<string, CacheItem> = {};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const amountStr = searchParams.get("amount") || "1";

    if (!from || !to) {
        return NextResponse.json(
            { error: "Missing required parameters: 'from' and 'to'" },
            { status: 400 }
        );
    }

    const amount = parseFloat(amountStr);
    if (isNaN(amount)) {
        return NextResponse.json(
            { error: "Invalid 'amount' parameter" },
            { status: 400 }
        );
    }

    const symbol = `${from.toUpperCase()}${to.toUpperCase()}=X`;

    try {
        let rate: number;
        const now = Date.now();

        // Check cache
        if (rateCache[symbol] && now - rateCache[symbol].timestamp < CACHE_DURATION_MS) {
            rate = rateCache[symbol].rate;
        } else {
            // Fetch from Yahoo Finance
            // Workaround for potential import issues in Next.js/ESM
            // const yf = (yahooFinance as any).default || yahooFinance;

            const quote = await yahooFinance.quote(symbol);

            if (!quote || !quote.regularMarketPrice) {
                // Fallback attempt: sometimes symbols are flipped or different?
                // For now, just error out appropriately
                throw new Error(`Could not fetch rate for symbol: ${symbol}. Quote data missing.`);
            }

            rate = quote.regularMarketPrice;

            // Update cache
            rateCache[symbol] = {
                rate,
                timestamp: now
            };
        }

        const convertedAmount = amount * rate;

        return NextResponse.json({
            from: from.toUpperCase(),
            to: to.toUpperCase(),
            amount,
            rate,
            convertedAmount,
            timestamp: new Date().toISOString(),
        });

    } catch (error: any) {
        console.error("Currency conversion error:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch exchange rate",
                details: error.message
            },
            { status: 500 }
        );
    }
}
