import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getSessionUser } from "@/lib/auth0";
import { getCartItemsByUserId } from "@/lib/cart";

export async function POST(request: Request) {
  try {
   
    const user = await getSessionUser();
    if (!user || !user.sub) {
      return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401 });
    }

    const headersList = await headers();
    const origin = headersList.get("origin") || process.env.NEXT_PUBLIC_APP_URL;

    const contentType = request.headers.get("content-type") || "";
    let selectedCartItemIds: string[] = [];

    if (contentType.includes("application/json")) {
      const body = await request.json();
      selectedCartItemIds = Array.isArray(body.cartItemIds) ? body.cartItemIds : [];
    } else {

      const formData = await request.formData();
      const rawIds = formData.getAll("cartItemIds").map(String);
      selectedCartItemIds = rawIds;
    }

    if (selectedCartItemIds.length === 0) {
      return NextResponse.json(
        { error: "Ödeme için en az bir ürün seçmelisiniz." },
        { status: 400 }
      );
    }


    const userCartItems = await getCartItemsByUserId(user.sub);
    const itemsToPay = userCartItems.filter((item) =>
      selectedCartItemIds.includes(item.id)
    );

    if (itemsToPay.length === 0) {
      return NextResponse.json(
        { error: "Seçilen ürünler sepetinizde bulunamadı." },
        { status: 400 }
      );
    }


    for (const item of itemsToPay) {
      if (!item.product.stripePriceId) {
        return NextResponse.json(
          { error: `"${item.product.name}" ürünü için Stripe fiyat tanımı eksik.` },
          { status: 400 }
        );
      }
      if (item.product.stock < item.quantity) {
        return NextResponse.json(
          { error: `"${item.product.name}" için yeterli stok kalmadı.` },
          { status: 400 }
        );
      }
    }


    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: itemsToPay.map((item) => ({
        price: item.product.stripePriceId!,
        quantity: item.quantity,
      })),

      metadata: {
        userId: user.sub,
        cartItemIds: JSON.stringify(itemsToPay.map((item) => item.id)),
      },
      cancel_url: `${origin}/cart`,
      success_url: `${origin}/user/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Checkout session URL oluşturulamadı." },
        { status: 500 }
      );
    }

    if (contentType.includes("application/json")) {
      return NextResponse.json({ url: session.url });
    }

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("Stripe checkout route error:", err);
    const message = err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.";
    const statusCode =
      typeof err === "object" &&
      err !== null &&
      "statusCode" in err &&
      typeof err.statusCode === "number"
        ? err.statusCode
        : 500;

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}