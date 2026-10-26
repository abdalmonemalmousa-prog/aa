const b = (ar, en) => ({ ar, en });
const FIRM_CARDS = {
  type: "cards", title: b("من نحن", "Who we are"), kicker: b("راشد الكيتوب للمحاماة والاستشارات القانونية", "RASHID ALKAITOOB ADVOCATES & LEGAL CONSULTANTS"), cols: 3, items: [
    { icon: "FaBuildingColumns", head: b("مكتب مرخّص منذ 2014", "Licensed since 2014"), body: b("مكتب محاماة مرخّص في دولة الإمارات، مقره شارع الشيخ زايد في دبي، يمثّل الأفراد والشركات أمام محاكم الدولة بجميع درجاتها.", "A UAE-licensed law firm on Sheikh Zayed Road, Dubai, representing individuals and companies before all court levels.") },
    { icon: "FaScaleBalanced", head: b("أكثر من 10 مجالات قانونية", "10+ practice areas"), body: b("العقاري، التجاري والشركات، التحكيم، الأحوال الشخصية والتركات، الامتثال ومكافحة غسل الأموال، الملكية الفكرية وغيرها.", "Real estate, corporate, arbitration, personal status and estates, AML compliance, IP and more.") },
    { icon: "FaGlobe", head: b("حضور إقليمي ودولي", "Regional and international reach"), body: b("حضور راسخ في دول مجلس التعاون وآسيا، مع مكتب صيني متخصص للمستثمرين.", "Established presence across the GCC and Asia, with a dedicated China desk for investors.") },
    { icon: "FaLanguage", head: b("أربع لغات عمل", "Four working languages"), body: b("العربية والإنجليزية والصينية والروسية، ليتواصل الموكل مباشرة مع مستشاره القانوني.", "Arabic, English, Chinese and Russian, so every client speaks directly with their counsel.") },
    { icon: "FaHandshake", head: b("أولوية التسوية الودية", "Amicable settlement first"), body: b("نسعى للتفاوض والوساطة قبل التقاضي حيثما أمكن، لتحقيق أفضل نتيجة بأقل كلفة ووقت.", "We pursue negotiation and mediation before litigation wherever possible, for the best outcome at the least cost.") },
    { icon: "FaUserShield", head: b("نهج يركّز على الموكل", "Client-focused approach"), body: b("تواصل واضح، تحديثات منتظمة، وحلول عملية تُصاغ وفق طبيعة كل مسألة.", "Clear communication, scheduled updates, and practical solutions designed around each matter.") },
  ],
};
const FIRM_STATS = {
  type: "stats", title: b("المكتب في أرقام", "The firm at a glance"), items: [
    { value: "2014", label: b("سنة التأسيس", "Founded"), body: b("مكتب محاماة مرخّص في دبي", "Licensed law firm in Dubai") },
    { value: "10+", label: b("مجال قانوني", "Practice areas"), body: b("تقاضٍ واستشارات وصياغة عقود", "Litigation, advisory and contracts") },
    { value: "4", label: b("لغات عمل", "Working languages"), body: b("العربية · الإنجليزية · الصينية · الروسية", "Arabic · English · Chinese · Russian") },
    { value: b("الخليج وآسيا", "GCC & Asia"), small: true, label: b("حضور إقليمي ودولي", "Regional and international presence"), body: b("مكتب صيني متخصص للمستثمرين", "Dedicated China desk for investors") },
  ],
};
const SERVICE_CARDS = {
  type: "cards", title: b("خدماتنا في حماية الأصول والتركات", "Our asset protection and estate services"), kicker: b("باقة الخدمة", "SERVICE CATALOGUE"), cols: 4, items: [
    { icon: "FaFileSignature", head: b("إعداد الوصية", "Will drafting"), body: b("صياغة وصية صحيحة قانوناً تناسب وضع الموكل وجنسيته وأصوله.", "A legally sound will tailored to the client's nationality, family and assets.") },
    { icon: "FaStamp", head: b("تسجيل الوصية", "Will registration"), body: b("التسجيل لدى الجهة المناسبة: محاكم دبي، أبوظبي، DIFC أو ADGM.", "Registration with the right authority: Dubai Courts, Abu Dhabi, DIFC or ADGM.") },
    { icon: "FaSitemap", head: b("هيكلة الإرث والأصول", "Estate and asset structuring"), body: b("ترتيب انتقال الملكية مسبقاً بما يمنع التجميد والنزاعات.", "Arranging succession in advance to prevent freezes and disputes.") },
    { icon: "FaUserShield", head: b("حماية المستثمر الأجنبي", "Foreign investor protection"), body: b("حلول تراعي الشريعة الإسلامية أو القانون الأجنبي بحسب حالة كل موكل.", "Solutions under Sharia or foreign law, according to each client's situation.") },
    { icon: "FaKey", head: b("نقل الملكية بعد الوفاة", "Ownership transfer after death"), body: b("تمثيل الورثة واستكمال إجراءات نقل العقارات والحسابات.", "Representing heirs and completing property and account transfers.") },
    { icon: "FaBuilding", head: b("تأسيس Holding / SPV", "Holding / SPV formation"), body: b("هياكل شركات قابضة مرتبطة بهيكلة الإرث لحماية الاستثمارات.", "Holding structures linked to the succession plan to protect investments.") },
    { icon: "FaHouse", head: b("وصايا العقارات والأعمال", "Property and business wills"), body: b("وصايا مخصصة للعقارات فقط أو لحصص الشركات والأعمال.", "Wills limited to real estate, or covering company shares and businesses.") },
    { icon: "FaPeopleRoof", head: b("حوكمة العائلة", "Family governance"), body: b("مكتب عائلي، مؤسسات وصناديق ائتمانية، واتفاقيات شراكة.", "Family office, foundations and trusts, and partnership agreements.") },
  ],
};
const ROUTES_ROWS = {
  type: "rows", title: b("جهات تسجيل الوصايا في الإمارات", "Where wills are registered in the UAE"), kicker: b("الإطار القانوني", "LEGAL FRAMEWORK"), items: [
    { icon: "FaLandmark", head: b("محاكم دبي", "Dubai Courts"), body: b("تسجيل وصايا غير المسلمين لدى محاكم دبي، وفق قانون الأحوال الشخصية لغير المسلمين.", "Registration of non-Muslim wills with Dubai Courts under the non-Muslim personal status rules.") },
    { icon: "FaLandmark", head: b("محاكم أبوظبي", "Abu Dhabi Courts"), body: b("تسجيل الوصايا لدى دائرة القضاء في أبوظبي لمن يفضّل هذا المسار.", "Registration with the Abu Dhabi Judicial Department for clients who prefer this route.") },
    { icon: "FaBuildingColumns", head: b("DIFC", "DIFC Wills"), body: b("سجل وصايا مركز دبي المالي العالمي لغير المسلمين، باللغة الإنجليزية، يغطي الأصول في الدولة.", "The DIFC wills registry for non-Muslims, in English, covering assets in the UAE.") },
    { icon: "FaBuildingColumns", head: b("ADGM", "ADGM Wills"), body: b("سجل وصايا سوق أبوظبي العالمي لغير المسلمين، مسار بديل بالإنجليزية.", "The ADGM wills registry for non-Muslims, an alternative English-language route.") },
    { icon: "FaScaleBalanced", head: b("الشريعة الإسلامية أو القانون الأجنبي", "Sharia or foreign law"), body: b("نحدد القانون الواجب التطبيق بحسب جنسية الموكل وديانته ورغبته.", "We determine the applicable law by the client's nationality, religion and wishes.") },
  ],
  side: { head: b("كل موكل حالة مستقلة", "Every client is a distinct case"), body: b("الجنسية، الديانة، الحالة العائلية، وموقع الأصول تحدد المسار الأنسب. لذلك نبدأ دائماً بجلسة اكتشاف لا بنوع الوصية.", "Nationality, religion, family status and where the assets sit decide the right route. That is why we always start with a discovery session, not with a will type.") },
};
const CONCIERGE_CARDS = {
  type: "cards", title: b("خدمة قانونية بمستوى Concierge", "A concierge-level legal service"), kicker: b("التجربة المميزة", "THE PREMIUM EXPERIENCE"), cols: 5, items: [
    { icon: "FaHouseUser", head: b("الاجتماع عندكم", "We come to you"), body: b("في مكتب الموكل أو منزله.", "At the client's office or home.") },
    { icon: "FaCrown", head: b("تعامل VIP", "VIP handling"), body: b("مستشار مخصص لكل موكل.", "A dedicated counsel for every client.") },
    { icon: "FaLanguage", head: b("أربع لغات", "Four languages"), body: b("العربية، الإنجليزية، الصينية، الروسية.", "Arabic, English, Chinese, Russian.") },
    { icon: "FaListCheck", head: b("تنسيق كامل", "Full coordination"), body: b("الترجمة، الشهود، التوثيق، التسجيل.", "Translation, witnesses, notarisation, registration.") },
    { icon: "FaBolt", head: b("تسجيل سريع", "Fast-track registration"), body: b("متابعة مباشرة مع الجهات الرسمية.", "Direct follow-up with the authorities.") },
  ],
};
const CONTACT = (title, subtitle) => ({ type: "contact", title, subtitle });
module.exports = { b, FIRM_CARDS, FIRM_STATS, SERVICE_CARDS, ROUTES_ROWS, CONCIERGE_CARDS, CONTACT };
