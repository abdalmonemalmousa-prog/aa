const { b, FIRM_STATS, CONTACT } = require("./common");
const STATS = require("./stats_common");
module.exports = {
  file: "02_Brokerage_Owners_Executive_Brief",
  title: b("شراكة الحماية القانونية للمستثمرين", "Legal Protection Partnership for Investors"),
  slides: [
    { type: "cover", sectionStart: b("العرض", "The offer"), title: b("شراكة الحماية القانونية للمستثمرين", "Legal Protection Partnership for Investors"), subtitle: b("عرض موجز لأصحاب شركات الوساطة العقارية", "An executive brief for owners of real estate brokerages"), meta: b("راشد الكيتوب للمحاماة والاستشارات القانونية · دبي", "Rashid Alkaitoob Advocates & Legal Consultants · Dubai") },
    { type: "split", title: b("لماذا نجتمع اليوم", "Why we are meeting today"), kicker: b("الافتتاح", "OPENING"), icon: "FaShieldHalved",
      panel: { head: b("لسنا هنا لبيع خدمة قانونية تقليدية", "We are not here to sell a traditional legal service"), body: b("نبني معكم خدمة حماية متكاملة للمستثمر العقاري، تصبح جزءاً من قيمة ما تقدمونه لعملائكم.", "We are building with you an integrated protection service for the property investor, one that becomes part of the value you deliver.") },
      bullets: [
        { head: b("المشكلة", "The problem"), body: b("أغلب المستثمرين الأجانب يشترون عقارات بملايين الدراهم بدون أي وصية أو هيكلة قانونية.", "Most foreign investors buy property worth millions of dirhams with no will and no legal structure.") },
        { head: b("ما قد يحدث عند أي طارئ", "What can happen in an emergency"), body: b("تجميد الحسابات، تعطيل نقل الملكية، نزاعات عائلية، ومشاكل تتعلق بالأطفال والورثة.", "Frozen accounts, blocked ownership transfers, family disputes, and problems for children and heirs.") },
        { head: b("الحل", "The solution"), body: b("شريك قانوني متخصص يتولى الجانب القانوني كاملاً، بينما تحتفظون أنتم بالعلاقة مع العميل.", "A specialist legal partner handles the entire legal side while you keep the client relationship.") },
      ] },
    FIRM_STATS,
    ...STATS.deck2,
    { type: "cards", title: b("ما الذي يحصل عليه عميلكم", "What your client receives"), kicker: b("الخدمة", "THE SERVICE"), cols: 4, items: [
      { icon: "FaFileSignature", head: b("وصية صحيحة ومسجلة", "A valid, registered will"), body: b("متوافقة مع محاكم دبي أو أبوظبي أو DIFC أو ADGM بحسب حالته.", "Compatible with Dubai Courts, Abu Dhabi, DIFC or ADGM, as the case requires.") },
      { icon: "FaHouse", head: b("حماية العقارات والحسابات", "Protected property and accounts"), body: b("ترتيب مسبق يمنع التجميد ويحدد مسار انتقال الملكية.", "Arrangements that prevent freezes and fix the succession path.") },
      { icon: "FaChildren", head: b("حماية العائلة والأطفال", "Protected family and children"), body: b("تعيين الأوصياء وتحديد الورثة داخل الدولة وخارجها.", "Appointed guardians and defined heirs inside and outside the UAE.") },
      { icon: "FaSitemap", head: b("هيكلة للشركات والأصول", "Corporate and asset structuring"), body: b("Holding أو SPV أو مؤسسة بحسب حجم الاستثمار.", "Holding, SPV or foundation according to the size of the investment.") },
    ] },
    { type: "cards", title: b("ما الذي تكسبه شركتكم", "What your company gains"), kicker: b("القيمة للشريك", "VALUE FOR THE PARTNER"), cols: 4, items: [
      { num: "1", head: b("ثقة العميل", "Client trust"), body: b("يشعر العميل أن وسيطه يهتم بحمايته وليس بالبيع فقط.", "The client sees a broker who cares about protection, not only the sale.") },
      { num: "2", head: b("زيادة نسبة الإغلاق", "Higher closing rate"), body: b("المستثمر الأجنبي يرتاح أكثر عندما يعرف أن هناك حماية قانونية وحلولاً للإرث.", "Foreign investors relax when they know legal protection and inheritance solutions exist.") },
      { num: "3", head: b("خدمة VIP إضافية", "An additional VIP service"), body: b("تقدّمون أنفسكم كمستشار استثمار متكامل (Full Investment Advisor).", "You position yourselves as a full investment advisor.") },
      { num: "4", head: b("دخل إضافي", "Extra income"), body: b("هيكل إحالة واضح ومنظم يحوّل الخدمة إلى مصدر دخل منتظم.", "A clear, organised referral structure that turns the service into recurring income.") },
    ] },
    { type: "steps", title: b("العملية بسيطة جداً", "The process is very simple"), kicker: b("Easy Process", "EASY PROCESS"), items: [
      { head: b("أنتم تعرّفون العميل بالخدمة", "You introduce the service"), body: b("جملة واحدة في التوقيت الصحيح، ورسالة تعريف موحّدة.", "One sentence at the right moment, plus a standard introduction message.") },
      { head: b("نحن نتولى كل الجانب القانوني", "We handle the whole legal side"), body: b("الاستشارة، تقييم المخاطر، الصياغة، الترجمة، التوثيق، التسجيل.", "Consultation, risk assessment, drafting, translation, notarisation, registration.") },
      { head: b("فريقنا يتابع العميل بالكامل", "Our team manages the client end to end"), body: b("تواصل أولي خلال يوم عمل، وتحديثات منتظمة لكم وله.", "First contact within one business day, with regular updates to you and the client.") },
      { head: b("أنتم تبقون بالصورة بدون أي مسؤولية قانونية", "You stay informed with zero legal liability"), body: b("تقرير شهري، وتسوية العمولة وفق الاتفاقية.", "A monthly report, and commission settled under the agreement.") },
    ] },
    { type: "compare", title: b("دوركم ودورنا", "Your role and ours"), kicker: b("توزيع الأدوار", "DIVISION OF ROLES"), cols: [
      { head: b("شركة الوساطة", "The brokerage"), items: [b("تعرّف العميل بالخدمة وتحوّله إلينا", "Introduces the service and refers the client"), b("تقدّمها كقيمة مضافة ضمن عرضها", "Presents it as a value-add within its offer"), b("لا تقدّم أي استشارة قانونية ولا تضمن نتائج", "Gives no legal advice and guarantees no outcomes"), b("تحصل على رسوم الإحالة", "Receives the referral fee")] },
      { head: b("مكتب راشد الكيتوب", "Rashid Alkaitoob Advocates"), highlight: true, items: [b("الاستشارة القانونية وإعداد الوصية", "Legal consultation and will drafting"), b("التسجيل والمتابعة مع الجهات الرسمية", "Registration and follow-up with the authorities"), b("حماية الوسيط من أي مسؤولية قانونية", "Shields the broker from any legal liability"), b("خدمة بمستوى Concierge بأربع لغات", "Concierge-level service in four languages")] },
    ] },
    { type: "rows", title: b("نجهّزكم للانطلاق فوراً", "We get you started immediately"), kicker: b("ما نقدّمه لفريقكم", "WHAT WE PROVIDE YOUR TEAM"), items: [
      { icon: "FaChalkboardUser", head: b("ندوة مجانية لفريق المبيعات", "A free seminar for your sales team"), body: b("بعنوان «كيف تحمي المستثمر الأجنبي في الإمارات».", "Titled “How to Protect Foreign Investors in the UAE”.") },
      { icon: "FaComments", head: b("استشارة أولية مجانية لعملائكم", "A free first consultation for your clients"), body: b("لشرح الخيارات المناسبة لكل عميل.", "To explain the options suited to each client.") },
      { icon: "FaFolderOpen", head: b("مواد تسويقية جاهزة", "Ready marketing materials"), body: b("كتيّب، نص واتساب، أسئلة شائعة، وعرض تقديمي.", "Brochure, WhatsApp text, FAQ and a presentation.") },
      { icon: "FaCrown", head: b("خدمة Concierge لعملائكم المميزين", "Concierge service for your top clients"), body: b("اجتماع في مكتب العميل أو منزله، تعامل VIP، تسجيل سريع.", "Meetings at the client's office or home, VIP handling, fast-track registration.") },
    ], side: { head: b("التوقيت الأفضل", "Best timing"), body: b("بعد الحجز، أثناء توقيع عقد البيع (SPA)، بعد التملك، أو أثناء الحديث عن الاستثمار طويل الأجل.", "After booking, during the SPA signing, after handover, or when discussing long-term investment.") } },
    { type: "rows", title: b("الاتفاقية باختصار", "The agreement in brief"), kicker: b("الهيكل القانوني", "LEGAL STRUCTURE"), items: [
      { icon: "FaArrowRightArrowLeft", head: b("آلية تحويل العملاء", "Client referral mechanism"), body: b("رسالة تعريف موحّدة وتواصل منا خلال يوم عمل.", "A standard introduction and contact from us within one business day.") },
      { icon: "FaPercent", head: b("نسبة العمولة وآلية الدفع", "Commission rate and payment"), body: b("نسبة ثابتة أو مبلغ لكل عميل، تُسوّى شهرياً.", "A fixed percentage or amount per client, settled monthly.") },
      { icon: "FaLock", head: b("السرية وحماية البيانات", "Confidentiality and data protection"), body: b("اتفاقية عدم إفشاء وحماية كاملة لبيانات عملائكم.", "An NDA and full protection of your clients' data.") },
      { icon: "FaUserShield", head: b("لا مسؤولية قانونية عليكم", "No legal liability on you"), body: b("أنتم لا تقدمون استشارات قانونية؛ نحن نتحمل المسؤولية المهنية كاملة.", "You give no legal advice; we carry the full professional responsibility.") },
      { icon: "FaBan", head: b("عدم التجاوز", "Non-circumvention"), body: b("حماية علاقتكم بعملائكم طوال مدة الشراكة.", "Your client relationships are protected throughout the partnership.") },
    ] },
    { type: "quote", text: b("لا نبيع «وصية». نساعدكم على حماية عملائكم، ورفع قيمة خدماتكم، وزيادة ثقة المستثمر بكم.", "We do not sell a “will”. We help you protect your clients, raise the value of your services, and increase investor confidence in you."), who: b("راشد الكيتوب للمحاماة والاستشارات القانونية", "Rashid Alkaitoob Advocates & Legal Consultants") },
    CONTACT(b("الخطوة التالية", "Next step"), b("اجتماع قصير لتوقيع اتفاقية التعاون وتحديد موعد ندوة فريق المبيعات", "A short meeting to sign the cooperation agreement and schedule your sales team seminar")),
  ],
};
