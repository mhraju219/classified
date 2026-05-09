import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

import en from "../messages/en.json";
import ar from "../messages/ar.json";
import bn from "../messages/bn.json";
import ur from "../messages/ur.json";
import hi from "../messages/hi.json";
import ru from "../messages/ru.json";
import fa from "../messages/fa.json";
import es from "../messages/es.json";

const messagesMap = { en, ar, bn, ur, hi, ru, fa, es } as const satisfies Record
  Locale,
  typeof en
>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale: Locale =
    requested && (routing.locales as readonly string[]).includes(requested)
      ? (requested as Locale)
      : routing.defaultLocale;

  return {
    locale,
    messages: messagesMap[locale],
    timeZone: "Asia/Riyadh",
    now: new Date(),
  };
});
