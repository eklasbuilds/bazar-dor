export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
      <div>
        <p className="text-sm font-semibold tracking-wide text-terra">আজকের বাজার আপডেট</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl">
          নিত্যপণ্যের দাম, এক নজরে বাজার দর
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
          চাল, ডাল, তেল, সবজি, মাছ ও মসলার আজকের দাম দেখুন। কোন বাজারে দাম বেড়েছে, কোথায় কমেছে—সিদ্ধান্ত নিন পরিষ্কার তথ্য দেখে।
        </p>
        <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md mt-6">
          সব পণ্য দেখুন
        </a>
      </div>
      <div className="hero-board" aria-hidden>
        <div className="hero-stall">
          <span>🍚</span>
          <span>🧅</span>
          <span>🐟</span>
          <span>🥚</span>
        </div>
        <div className="hero-note">
          <p className="text-sm text-muted">কারওয়ান বাজার</p>
          <p className="text-2xl font-bold text-ink">আজকের হাট</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, সিলেট ও ময়মনসিংহের বাজার দর একসাথে।
          </p>
        </div>
      </div>
    </section>
  );
}
