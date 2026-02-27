import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    // Return early if no stripe secret is available. E.g. in local dev without .env
    const stripeSecret = import.meta.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
        return new Response(JSON.stringify({ error: "No Stripe Secret configured" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const url = new URL(request.url);
    const stripeLinkUrl = url.searchParams.get('url');

    if (!stripeLinkUrl) {
        return new Response(JSON.stringify({ error: "Missing url parameter" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const stripe = new Stripe(stripeSecret, {
            apiVersion: '2025-02-24.acacia', // Latest Stripe API Version
        });

        // 1. Extract the Payment Link ID from the URL (e.g. from https://buy.stripe.com/123456789 -> 123456789)
        const linkParts = stripeLinkUrl.split('/');
        let paymentLinkId = linkParts[linkParts.length - 1];

        // Strip out query params if any are on the URL
        if (paymentLinkId.includes('?')) {
            paymentLinkId = paymentLinkId.split('?')[0];
        }

        if (!paymentLinkId) {
            return new Response(JSON.stringify({ error: "Invalid Stripe URL format" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2. We don't know if the ID is definitely a prefix `plink_` or the raw string.
        // But the search API can find it via the url property!
        const paymentLinks = await stripe.paymentLinks.list({
            limit: 100, // Reasonable cap
        });

        // Find the matching link. Stripe URLs are generally 'https://buy.stripe.com/' + ID or 'test' + ID
        const matchedLink = paymentLinks.data.find(link => link.url === stripeLinkUrl);

        if (!matchedLink) {
            return new Response(JSON.stringify({ error: "Payment Link not found on Stripe account", active: false }), {
                status: 404, // Not found, probably means don't sell it
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 3. Return the status!
        return new Response(JSON.stringify({
            id: matchedLink.id,
            active: matchedLink.active
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                // Add a small cache to prevent slamming the Stripe API on highly concurrent visits
                'Cache-Control': 'public, max-age=15, s-maxage=15'
            }
        });

    } catch (error) {
        console.error("Stripe Stock Check Failed: ", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
