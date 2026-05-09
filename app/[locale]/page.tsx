import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <main className="container relative flex min-h-dvh flex-col items-center justify-center py-24">
      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-grid-lg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] opacity-40" />
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Step 1 · scaffold ready
      </p>
      <h1 className="font-display text-display-xl text-balance text-center">
        {t("tagline")}
      </h1>
      <p className="mt-6 max-w-xl text-center text-lg text-muted-foreground text-pretty">
        {t("subTagline")}
      </p>
    </main>
  );
}
