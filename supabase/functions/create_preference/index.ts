// supabase/functions/create_preference.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const accessToken =  "APP_USR-6876617183039315-022615-cf74f0dfcfa0c6171a3b8bda73be6187-1614842695";

  if (!accessToken) {
    return new Response("Access token is missing", { status: 400 });
  }

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Authorization": `Bearer APP_USR-6876617183039315-022615-cf74f0dfcfa0c6171a3b8bda73be6187-1614842695`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          title: "Pago único",
          unit_price: 10, // Precio fijo del producto
          quantity: 1,
        },
      ],
    }),
  });

  const preferenceData = await response.json();

  if (response.ok) {
    return new Response(JSON.stringify(preferenceData), { status: 200 });
  }

  return new Response(JSON.stringify(preferenceData), { status: 500 });
});
