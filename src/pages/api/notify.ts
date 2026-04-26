import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  await resend.emails.send({
    from: 'Dilr <hello@dilr.app>',
    to: email,
    subject: 'Köszi az érdeklődést 🙌 – Dilr',
    html: `
      <p>Szia!</p>
      <p>Köszi, hogy érdeklődsz a Dilr iránt 🙌</p>
      <p>A Dilr egy app, ahol a legjobb ajánlatokat találod egy helyen.</p>
      <p>Hamarosan indulunk 🚀</p>
      <p>– Dilr</p>
    `,
  });

  return new Response(JSON.stringify({ ok: true }));
};