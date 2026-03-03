import { getTranslations } from "next-intl/server";
import BookingForm from "@/components/BookingForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });
  return { title: t("heroTitle") };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/6 to-transparent"
        />
        <div className="relative max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)] mb-4">
            {t("heroEyebrow")}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-4">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl">
            {t("heroSub")}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <BookingForm />
      </section>
    </>
  );
}
