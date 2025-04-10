serve(async (req) => {
    const { cardTokenId, payerEmail } = await req.json();
  
    const subscriptionData = {
      preapproval_plan_id: "2c938084945f74940194611efd3f00d5", // Reutiliza el ID del plan
      payer_email: payerEmail,
      card_token_id: cardTokenId,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        start_date: new Date().toISOString(),
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://tuapp.com/confirmacion",
      status: "authorized",
    };
  
    const response = await fetch("https://api.mercadopago.com/preapproval", {
      method: "POST",
      headers: {
        Authorization: `Bearer APP_USR-6876617183039315-022615-cf74f0dfcfa0c6171a3b8bda73be6187-1614842695`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionData),
    });
  
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Error al crear la suscripción" }), { status: 400 });
    }
  
    const subscription = await response.json();
    return new Response(JSON.stringify(subscription), { status: 200 });
  });
  