import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/en.json";

/*
  Test helper: render a component tree that uses next-intl (useTranslations /
  locale-aware Link) inside a provider seeded with the English catalog. Use in
  place of RTL's `render` for any component wired to messages.
*/
export function renderWithIntl(ui: ReactElement, locale = "en") {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}
