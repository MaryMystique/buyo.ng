const perks = [
  {
    emoji: "🚚",
    title: "Fast Delivery",
    description: "Get your orders delivered quickly across Nigeria",
  },
  {
    emoji: "🔒",
    title: "Secure Payments",
    description: "Pay safely with Paystack — cards, bank transfer & USSD",
  },
  {
    emoji: "↩️",
    title: "Easy Returns",
    description: "Not satisfied? Return within 7 days, no questions asked",
  },
  {
    emoji: "💬",
    title: "24/7 Support",
    description: "Our team is always here to help you shop better",
  },
];

export default function WhyBuyo() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Why Shop on Buyo.ng?
        </h2>
        <p className="text-gray-500 mt-2">We make shopping easy, safe and enjoyable</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {perks.map((perk) => (
          <div
            key={perk.title}
            className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">{perk.emoji}</div>
            <h3 className="font-bold text-gray-800 mb-2">{perk.title}</h3>
            <p className="text-gray-500 text-sm">{perk.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}