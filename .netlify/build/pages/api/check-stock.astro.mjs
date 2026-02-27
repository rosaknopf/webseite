import 'stripe';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  {
    return new Response(JSON.stringify({ error: "No Stripe Secret configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
