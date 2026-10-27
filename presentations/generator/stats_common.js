// Statistics slides shared by decks 1–5, taken from the statistics deck (deck6) so every number has one source of truth.
const deck6 = require("./deck6");
const { b } = require("./common");
const S = deck6.slides;
const find = (type, enTitle) => {
  const s = S.find((x) => x.type === type && ((x.title && x.title.en === enTitle) || (x.value && x.value.en === enTitle)));
  if (!s) throw new Error("stats slide not found: " + enTitle);
  return s;
};
const clone = (o, patch = {}) => ({ ...JSON.parse(JSON.stringify(o)), ...patch });
const KICK = b("الأرقام", "THE NUMBERS", "ЦИФРЫ");
const SRC_SHORT = b(
  "المصادر: محاكم مركز دبي المالي العالمي، دائرة القضاء في أبوظبي، محاكم دبي، استطلاع YouGov (سبتمبر 2026)، Khaleej Times / Gulf News. التفاصيل في عرض «الوصايا والميراث في الإمارات: ما تقوله الأرقام».",
  "Sources: DIFC Courts, Abu Dhabi Judicial Department, Dubai Courts, YouGov survey (Sept 2026), Khaleej Times / Gulf News. Full references in the deck 'Wills and Inheritance in the UAE: What the Numbers Say'.",
  "Источники: DIFC Courts, Судебный департамент Абу-Даби, суды Дубая, опрос YouGov (сент. 2026), Khaleej Times / Gulf News. Полные ссылки в презентации «Завещания и наследство в ОАЭ: что говорят цифры»."
);

const SUMMARY = clone(find("figures", "The story in four numbers"), { kicker: KICK, title: b("الواقع بأربعة أرقام", "The reality in four numbers", "Реальность в четырёх цифрах"), source: SRC_SHORT });
const SURVEYS = clone(find("figures", "Who has no will: what the surveys say"), { kicker: KICK });
const DIFC_YEARLY = clone(find("chart", "DIFC: annual registrations are accelerating"), { kicker: KICK });
const SETTLEMENT = clone(find("chart", "Dubai has cut estate settlement time from 81 days to 13.8"), { kicker: KICK });
const FAMILY = clone(find("figures", "Gulf family businesses in numbers"), { kicker: KICK });
const SURVIVAL = clone(find("chart", "Three in ten family businesses reach the second generation"), { kicker: KICK });
const PROBLEMS = clone(find("rows", "The problems that actually occur"), { kicker: KICK });
const COMPARE = clone(find("compare", "With and without a registered will: practitioner estimates"), { kicker: KICK });
const LIMITS = clone(find("compare", "What is documented and what does not exist"), { kicker: KICK });
const HERO = clone(find("hero", "Under 1%"));
const SOURCES = clone(find("sources", "Sources"));

module.exports = {
  // Internal: the evidence the strategy rests on, with the data limits made explicit
  deck1: [SUMMARY, SURVEYS, DIFC_YEARLY, SETTLEMENT, FAMILY, LIMITS],
  // Brokerage owners: three slides, the market in numbers
  deck2: [SUMMARY, DIFC_YEARLY, FAMILY],
  // Partner guide: the full evidence block, sources at the end
  deck3: [SURVEYS, DIFC_YEARLY, SETTLEMENT, COMPARE, FAMILY],
  deck3Sources: [SOURCES],
  // Client walkthrough: why it matters, in numbers
  deck4: [SURVEYS, HERO, SETTLEMENT, PROBLEMS],
  // Seminar: the numbers section, sources before the close
  deck5: [SUMMARY, SURVEYS, DIFC_YEARLY, SETTLEMENT, FAMILY, SURVIVAL],
  deck5Sources: [SOURCES],
};
