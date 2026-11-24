#!/usr/bin/env python3
"""RK Advocates social templates v2: built on the live website identity (rk-advocates.com)."""
import os, json
OUT = os.path.dirname(os.path.abspath(__file__))
SCR = "/tmp/claude-0/-home-user-aa/854bfd34-308d-503c-a9f1-6738acee5aec/scratchpad"
os.makedirs(f"{OUT}/brand", exist_ok=True); os.makedirs(f"{OUT}/preview", exist_ok=True); os.makedirs(f"{OUT}/fonts", exist_ok=True)

# brand assets (logo, skyline, founder photo) and fonts are bundled in brand/ and fonts/
fonts_css = open(f"{OUT}/fonts/fonts.css", encoding="utf8").read().replace("url(", "url(fonts/")

CSS = """
:root{--bg:#0B0C10;--bg2:#14151B;--ink:#131313;--ivory:#F7F3EA;--ivory2:#F8F5F0;--sand:#D6CBB6;--champ:#D4AF37;--gold:#85683A;--gold-l:#B49A6D;--gold-d:#6F5528;--fg:#CBC5BA;--fg-strong:#F7F3EA;--muted:#948D80}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:%(w)spx;height:%(h)spx;overflow:hidden;direction:rtl;font-family:'Noto Naskh Arabic','IBM Plex Sans Arabic',serif;background:#000}
.card{position:relative;width:%(w)spx;height:%(h)spx;overflow:hidden}
.dark{background:radial-gradient(120%% 80%% at 85%% 0%%,#1A1B22 0%%,var(--bg) 60%%);color:var(--fg)}
.light{background:linear-gradient(180deg,var(--ivory2) 0%%,var(--ivory) 100%%);color:var(--ink)}
.sky{position:absolute;inset:0;background:url(brand/skyline.jpg) center/cover no-repeat;opacity:.34;filter:saturate(.75)}
.sky:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,12,16,.25) 0%%,rgba(11,12,16,.75) 55%%,rgba(11,12,16,.98) 100%%)}
.frame:before{content:"";position:absolute;inset:30px;border:1px solid rgba(212,175,55,.55);pointer-events:none}
.frame:after{content:"";position:absolute;inset:38px;border:1px solid rgba(212,175,55,.18);pointer-events:none}
.light.frame:before{border-color:rgba(133,104,58,.55)} .light.frame:after{border-color:rgba(133,104,58,.18)}
.logo{position:absolute;top:64px;right:72px;height:78px;width:auto}
.logo.sm{height:62px}
.en{font-family:'Cormorant Garamond',serif;letter-spacing:4px;text-transform:uppercase;direction:ltr}
.lbl{display:inline-flex;align-items:center;gap:14px;font-family:'IBM Plex Sans Arabic',sans-serif;font-weight:500;font-size:22px;color:var(--champ);letter-spacing:.5px}
.lbl:before{content:"◆";font-size:14px;color:var(--champ)}
.light .lbl,.light .lbl:before{color:var(--gold)}
h1{font-family:'Amiri',serif;font-weight:700;line-height:1.35;color:var(--fg-strong)}
.light h1{color:var(--ink)}
.hair{height:1px;background:linear-gradient(90deg,var(--champ),rgba(212,175,55,0));width:220px}
.light .hair{background:linear-gradient(90deg,var(--gold),rgba(133,104,58,0))}
.pts{list-style:none}
.pts li{position:relative;padding-right:44px;margin-bottom:24px;font-size:31px;line-height:1.55;color:var(--fg)}
.pts li:before{content:"◆";position:absolute;right:0;top:4px;font-size:16px;color:var(--champ)}
.light .pts li{color:#2A2A2A} .light .pts li:before{color:var(--gold)}
.ref{font-family:'IBM Plex Sans Arabic',sans-serif;font-size:22px;color:var(--gold-l);line-height:1.6}
.light .ref{color:var(--gold)}
.foot{position:absolute;bottom:52px;right:72px;left:72px;display:flex;justify-content:space-between;align-items:center;padding-top:20px;border-top:1px solid rgba(212,175,55,.35);font-family:'IBM Plex Sans Arabic',sans-serif;font-size:18px;color:var(--muted)}
.light .foot{border-top-color:rgba(133,104,58,.35);color:#8F887C}
.foot .site{font-family:'Inter',sans-serif;letter-spacing:2px;font-size:16px;color:var(--gold-l);direction:ltr}
.light .foot .site{color:var(--gold)}
.btn{display:inline-block;font-family:'IBM Plex Sans Arabic',sans-serif;font-weight:600;font-size:24px;color:var(--ink);background:linear-gradient(135deg,#E6C766,var(--champ) 50%%,#B8962E);padding:16px 36px;border-radius:4px}
.btn.ghost{background:none;color:var(--champ);border:1px solid var(--champ)}
.light .btn.ghost{color:var(--gold);border-color:var(--gold)}
.photo{position:absolute;overflow:hidden;border:1px solid rgba(212,175,55,.6)}
.photo img{width:100%%;height:100%%;object-fit:cover;object-position:top;display:block}
.photo:after{content:"";position:absolute;inset:14px;border:1px solid rgba(212,175,55,.5);pointer-events:none}
.ph{position:absolute;border:1px dashed rgba(212,175,55,.6);display:flex;align-items:center;justify-content:center;text-align:center;color:var(--gold-l);font-family:'IBM Plex Sans Arabic',sans-serif;font-size:20px;line-height:1.6;background:rgba(255,255,255,.03)}
.light .ph{border-color:rgba(133,104,58,.6);color:var(--gold);background:rgba(133,104,58,.04)}
.num{font-family:'Cormorant Garamond',serif;font-weight:600;color:var(--champ);line-height:1;direction:ltr}
.light .num{color:var(--gold)}
.box{background:rgba(247,243,234,.04);border:1px solid rgba(212,175,55,.28);border-radius:4px}
.light .box{background:#fff;border:1px solid var(--sand)}
.disc{font-size:16px}
"""

def page(w, h, body):
    return f"""<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>{fonts_css}{CSS % dict(w=w, h=h)}</style></head><body>{body}</body></html>"""

LOGO = '<img class="logo" src="brand/logo.png" alt="Rashid Alkaitoob Advocates">'
FOOT_IG = '<div class="foot"><span class="site">RK-ADVOCATES.COM</span><span class="disc">محتوى توعوي عام ولا يُعدّ استشارة قانونية</span></div>'
FOOT_LI = '<div class="foot"><span class="site">RK-ADVOCATES.COM</span><span>راشد الكيتوب للمحاماة والاستشارات القانونية</span></div>'
FOOT_X = '<div class="foot"><span class="site">RK-ADVOCATES.COM</span><span>د. راشد سلطان الكيتوب · المؤسس</span></div>'
T = {}

# ═══════════════ INSTAGRAM 1080×1350 ═══════════════
T["instagram_01_law_in_a_minute"] = (1080, 1350, page(1080, 1350, f"""
<div class="card dark frame">
  <div class="sky" style="opacity:.16"></div>
  {LOGO}
  <div style="position:absolute;top:220px;right:90px;left:90px">
    <span class="lbl" data-field="series">قانون في دقيقة</span>
    <h1 data-field="headline" style="font-size:74px;margin:30px 0 26px">عقد العمل محدد المدة<br>أصبح هو الأصل</h1>
    <div class="hair" style="margin-bottom:28px"></div>
    <p class="ref" data-field="reference" style="margin-bottom:54px">المرسوم بقانون اتحادي رقم (33) لسنة 2021<br>في شأن تنظيم علاقات العمل</p>
    <ul class="pts" data-field="points">
      <li>لا عقود غير محددة المدة بعد نفاذ القانون.</li>
      <li>فترة التجربة لا تتجاوز ستة أشهر بأي حال.</li>
      <li>الإخطار بإنهاء العقد بين 30 و90 يوماً.</li>
    </ul>
  </div>
  <div style="position:absolute;top:1010px;right:90px;left:90px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(212,175,55,.25);padding-top:34px">
    <span data-field="cta" style="font-size:25px;color:var(--fg);line-height:1.5">احفظ المنشور وشاركه<br>مع من يحتاجه</span>
    <span class="btn" style="font-size:21px;padding:14px 30px">طلب استشارة قانونية</span>
  </div>
  {FOOT_IG}
</div>"""))

T["instagram_02_carousel_cover"] = (1080, 1350, page(1080, 1350, f"""
<div class="card light frame">
  {LOGO}
  <div style="position:absolute;top:250px;right:90px;left:90px">
    <span class="lbl" data-field="series">احمِ نفسك · سلسلة</span>
    <div class="num" data-field="number" style="font-size:330px;margin:0 0 -40px">5</div>
    <h1 data-field="headline" style="font-size:72px">أخطاء تكلّفك الكثير<br>قبل توقيع عقد الإيجار</h1>
    <div class="hair" style="margin:36px 0 26px"></div>
    <p data-field="sub" style="font-family:'IBM Plex Sans Arabic';font-size:26px;color:#6A6A6A">اسحب لليسار لتعرف كيف تتجنّبها</p>
  </div>
  <div style="position:absolute;bottom:160px;right:90px;display:flex;gap:12px;align-items:center;direction:ltr">
    <span style="width:36px;height:2px;background:var(--gold)"></span><span style="width:10px;height:2px;background:var(--sand)"></span><span style="width:10px;height:2px;background:var(--sand)"></span><span style="width:10px;height:2px;background:var(--sand)"></span><span style="width:10px;height:2px;background:var(--sand)"></span><span style="width:10px;height:2px;background:var(--sand)"></span>
  </div>
  {FOOT_IG}
</div>"""))

T["instagram_02_carousel_slide"] = (1080, 1350, page(1080, 1350, f"""
<div class="card light frame">
  {LOGO}
  <div style="position:absolute;top:230px;right:90px;left:90px">
    <div style="display:flex;align-items:flex-end;gap:30px;margin-bottom:46px">
      <div class="num" data-field="step" style="font-size:170px">1</div>
      <h1 data-field="title" style="font-size:52px;padding-bottom:22px">توقيع العقد<br>دون قراءة بند الإخلاء</h1>
    </div>
    <div class="box" style="padding:44px 46px;border-top:3px solid var(--gold)">
      <p data-field="body" style="font-size:31px;line-height:1.75;color:#2A2A2A">كثير من المستأجرين يفاجؤون بشروط إخلاء مبكر أو غرامات لم ينتبهوا لها. اقرأ بند الإنهاء المبكر ومدة الإخطار قبل أي توقيع.</p>
      <div style="margin-top:34px;padding-top:28px;border-top:1px solid var(--sand);font-size:25px;color:var(--ink)"><span class="lbl" style="font-size:22px;margin-left:10px">الحل</span><span data-field="fix">اطلب نسخة من العقد قبل موعد التوقيع بـ48 ساعة على الأقل.</span></div>
    </div>
  </div>
  <div style="position:absolute;bottom:160px;right:90px;font-family:'IBM Plex Sans Arabic';font-size:22px;color:#8F887C" data-field="pager">1 / 5 · اسحب للتالي</div>
  {FOOT_IG}
</div>"""))

T["instagram_03_new_legislation"] = (1080, 1350, page(1080, 1350, f"""
<div class="card dark">
  <div class="sky"></div>
  <div style="position:absolute;top:0;right:0;left:0;height:6px;background:linear-gradient(90deg,var(--champ),var(--gold-d))"></div>
  {LOGO}
  <div style="position:absolute;top:230px;right:90px;left:90px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:34px">
      <span class="btn" data-field="badge" style="font-size:24px;padding:12px 30px">تشريع جديد</span>
      <span class="en" data-field="date" style="font-size:22px;color:var(--gold-l);letter-spacing:3px">24 · 11 · 2026</span>
    </div>
    <h1 data-field="headline" style="font-size:66px">[اسم التشريع كما ورد<br>في الجريدة الرسمية]</h1>
    <p class="ref" data-field="reference" style="margin-top:22px">[رقم التشريع وسنته] · يدخل حيّز التنفيذ في [التاريخ]</p>
  </div>
  <div style="position:absolute;top:660px;right:90px;left:90px;display:grid;gap:18px">
    <div class="box" style="padding:26px 30px;backdrop-filter:blur(6px)"><div class="lbl" style="font-size:20px;margin-bottom:8px">ما الذي تغيّر؟</div><div data-field="what" style="font-size:28px;line-height:1.5;color:var(--fg-strong)">[جملة واحدة واضحة عن التغيير الجوهري]</div></div>
    <div class="box" style="padding:26px 30px;backdrop-filter:blur(6px)"><div class="lbl" style="font-size:20px;margin-bottom:8px">من يتأثر؟</div><div data-field="who" style="font-size:28px;line-height:1.5;color:var(--fg-strong)">[الشركات / الأفراد / قطاع محدد]</div></div>
    <div class="box" style="padding:26px 30px;backdrop-filter:blur(6px)"><div class="lbl" style="font-size:20px;margin-bottom:8px">ماذا تفعل الآن؟</div><div data-field="action" style="font-size:28px;line-height:1.5;color:var(--fg-strong)">[خطوة عملية واحدة]</div></div>
  </div>
  <div style="position:absolute;bottom:150px;right:90px;left:90px;font-family:'IBM Plex Sans Arabic';font-size:21px;color:var(--gold-l)">الشرح الكامل في الثريد على X وفي المجلة القانونية على الموقع</div>
  {FOOT_IG}
</div>"""))

# ═══════════════ LINKEDIN 1200×1200 ═══════════════
T["linkedin_01_founder_quote"] = (1200, 1200, page(1200, 1200, f"""
<div class="card dark frame">
  {LOGO}
  <div class="photo" data-field="photo" style="top:200px;left:92px;width:400px;height:560px"><img src="brand/founder.jpg" alt=""></div>
  <div style="position:absolute;top:200px;right:92px;width:560px">
    <div class="num" style="font-family:'Amiri';font-size:190px;line-height:.55;margin-bottom:30px;direction:rtl">”</div>
    <p data-field="quote" style="font-family:'Amiri';font-size:50px;line-height:1.6;color:var(--fg-strong)">القانون الجديد لا يسأل الشركات إن كانت مستعدة. الاستعداد قرار تتخذه قبل تاريخ النفاذ، لا بعده.</p>
    <div class="hair" style="margin:40px 0 24px"></div>
    <div data-field="name" style="font-family:'Amiri';font-weight:700;font-size:36px;color:var(--champ)">د. راشد سلطان الكيتوب</div>
    <div data-field="title" style="font-family:'IBM Plex Sans Arabic';font-size:21px;color:var(--fg);margin-top:6px">المؤسس · راشد الكيتوب للمحاماة والاستشارات القانونية</div>
  </div>
  <div style="position:absolute;bottom:150px;right:92px;width:560px" class="lbl" data-field="topic">الاستعداد المؤسسي للتشريعات الجديدة في الإمارات</div>
  {FOOT_LI}
</div>"""))

T["linkedin_02_business_update"] = (1200, 1200, page(1200, 1200, f"""
<div class="card light frame">
  {LOGO}
  <div class="en" style="position:absolute;top:84px;left:92px;font-size:17px;color:var(--gold);text-align:left">Legislative Update<br><span style="font-size:13px;color:#8F887C">for business</span></div>
  <div style="position:absolute;top:210px;right:92px;left:92px">
    <span class="lbl" data-field="badge">مستجدات التشريع للشركات</span>
    <h1 data-field="headline" style="font-size:56px;margin:26px 0 14px">[عنوان التحديث: ما الذي صدر<br>وماذا يعني لشركتك]</h1>
    <p class="ref" data-field="reference">[رقم التشريع] · [تاريخ النفاذ] · [الجهة المصدرة]</p>
  </div>
  <div style="position:absolute;top:560px;right:92px;left:92px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px">
    <div class="box" style="padding:30px 28px;border-top:3px solid var(--gold)"><div class="num" style="font-size:58px;margin-bottom:14px">01</div><div class="lbl" style="font-size:21px;margin-bottom:10px">التغيير</div><div data-field="change" style="font-size:22px;line-height:1.6;color:#2A2A2A">[ما الذي تغيّر بجملة واحدة]</div></div>
    <div class="box" style="padding:30px 28px;border-top:3px solid var(--champ)"><div class="num" style="font-size:58px;margin-bottom:14px">02</div><div class="lbl" style="font-size:21px;margin-bottom:10px">الأثر على الأعمال</div><div data-field="impact" style="font-size:22px;line-height:1.6;color:#2A2A2A">[الالتزام أو الفرصة الجديدة]</div></div>
    <div class="box" style="padding:30px 28px;border-top:3px solid var(--gold)"><div class="num" style="font-size:58px;margin-bottom:14px">03</div><div class="lbl" style="font-size:21px;margin-bottom:10px">الخطوة المطلوبة</div><div data-field="action" style="font-size:22px;line-height:1.6;color:#2A2A2A">[ما الذي يجب أن تفعله الشركة قبل تاريخ النفاذ]</div></div>
  </div>
  <div style="position:absolute;top:900px;right:92px;left:92px;display:flex;gap:46px;font-family:'IBM Plex Sans Arabic';font-size:21px;color:var(--ink)"><span><span style="color:var(--gold)">تاريخ النفاذ:</span> <span data-field="effective">[التاريخ]</span></span><span><span style="color:var(--gold)">المهلة المتبقية للامتثال:</span> <span data-field="deadline">[عدد الأيام / الأشهر]</span></span></div>
  <div style="position:absolute;bottom:150px;right:92px;left:92px;background:var(--bg);color:var(--fg);border-radius:4px;padding:22px 30px;display:flex;justify-content:space-between;align-items:center">
    <span data-field="cta" style="font-size:23px">نساعد الشركات على مراجعة عقودها وسياساتها قبل تاريخ النفاذ</span><span class="btn" style="font-size:19px;padding:10px 24px">طلب استشارة</span>
  </div>
  {FOOT_LI}
</div>"""))

T["linkedin_03_team_feature"] = (1200, 1200, page(1200, 1200, f"""
<div class="card light">
  <div style="position:absolute;top:0;bottom:0;right:0;width:470px;background:radial-gradient(120%% 70%% at 50%% 0%%,#1A1B22,var(--bg) 70%%)"></div>
  <div style="position:absolute;top:0;bottom:0;right:470px;width:1px;background:linear-gradient(180deg,var(--champ),rgba(212,175,55,.1))"></div>
  <img class="logo sm" src="brand/logo.png" alt="" style="right:auto;left:80px;top:70px">
  <div class="ph" data-field="photo" style="top:110px;right:95px;width:280px;height:350px">صورة عضو الفريق<br>(280 × 350)<br><span style="font-size:15px;opacity:.7">تُستبدل بصورة الموقع الرسمية</span></div>
  <div style="position:absolute;top:500px;right:95px;width:300px">
    <div data-field="name" style="font-family:'Amiri';font-weight:700;font-size:38px;line-height:1.3;color:var(--fg-strong)">[اسم عضو الفريق]</div>
    <div data-field="role" style="font-family:'IBM Plex Sans Arabic';font-size:21px;color:var(--champ);margin-top:8px">[المسمى الوظيفي]</div>
    <div class="hair" style="margin:24px 0"></div>
    <div data-field="focus" style="font-size:21px;line-height:1.7;color:var(--fg)">[مجال التخصص · اللغات · الخبرة بالسنوات]</div>
  </div>
  <div style="position:absolute;top:190px;left:80px;width:560px">
    <span class="lbl" data-field="series">من فريقنا</span>
    <h1 data-field="headline" style="font-size:50px;margin:26px 0 22px">[عنوان: ما الذي يميّز<br>هذا الدور في خدمة عملائنا]</h1>
    <p data-field="body" style="font-size:25px;line-height:1.8;color:#2A2A2A">[فقرة من ثلاثة أسطر عن مساهمة هذا العضو أو القسم في الهيكل المؤسسي للمكتب، وكيف ينعكس ذلك على سرعة الخدمة وجودتها.]</p>
    <div style="margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="box" style="padding:20px 22px"><div class="num" style="font-size:46px" data-field="stat1">16</div><div style="font-family:'IBM Plex Sans Arabic';font-size:17px;color:#6A6A6A;margin-top:6px" data-field="stat1l">موقعاً في الهيكل المؤسسي</div></div>
      <div class="box" style="padding:20px 22px"><div class="num" style="font-size:46px" data-field="stat2">3</div><div style="font-family:'IBM Plex Sans Arabic';font-size:17px;color:#6A6A6A;margin-top:6px" data-field="stat2l">لغات عمل: العربية والإنجليزية والصينية</div></div>
    </div>
  </div>
  <div style="position:absolute;bottom:60px;left:80px;width:560px;border-top:1px solid rgba(133,104,58,.35);padding-top:18px;display:flex;justify-content:space-between;font-family:'IBM Plex Sans Arabic';font-size:17px;color:#8F887C"><span class="en" style="color:var(--gold);font-size:15px">rk-advocates.com</span><span>راشد الكيتوب للمحاماة والاستشارات القانونية</span></div>
</div>"""))

# ═══════════════ X 1600×900 ═══════════════
T["x_01_thread_header"] = (1600, 900, page(1600, 900, f"""
<div class="card dark frame">
  <div class="sky" style="opacity:.22"></div>
  {LOGO}
  <div style="position:absolute;top:220px;right:92px;width:900px">
    <span class="lbl" data-field="series">قانون في 10 تغريدات</span>
    <h1 data-field="headline" style="font-size:70px;margin:30px 0 22px">[اسم القانون أو الموضوع]<br><span style="color:var(--champ)">ما الذي يجب أن تعرفه؟</span></h1>
    <p class="ref" data-field="reference">[رقم التشريع وسنته] · سلسلة مبسّطة من عشر نقاط</p>
  </div>
  <div style="position:absolute;top:230px;left:92px;width:400px;display:grid;grid-template-columns:repeat(5,1fr);gap:14px;direction:ltr">
    {''.join(f'<div class="num" style="height:66px;border:1px solid rgba(212,175,55,.55);display:flex;align-items:center;justify-content:center;font-size:30px;{"background:var(--champ);color:var(--ink)" if i==1 else ""}">{i}</div>' for i in range(1,11))}
  </div>
  <div style="position:absolute;top:600px;left:92px;width:400px;text-align:left;font-family:'IBM Plex Sans Arabic';font-size:19px;color:var(--fg);line-height:1.6">ثريد · اقرأ حتى النهاية ثم أعد النشر لمن يحتاجه</div>
  {FOOT_X}
</div>"""))

T["x_02_breaking_legislation"] = (1600, 900, page(1600, 900, f"""
<div class="card dark">
  <div class="sky" style="opacity:.3"></div>
  <div style="position:absolute;top:0;bottom:0;right:0;width:10px;background:linear-gradient(180deg,var(--champ),var(--gold-d))"></div>
  {LOGO}
  <div style="position:absolute;top:84px;left:92px;display:flex;align-items:center;gap:22px;direction:ltr">
    <span class="en" data-field="date" style="font-size:20px;color:var(--gold-l)">24 · 11 · 2026</span>
    <span class="btn" data-field="badge" style="font-size:22px;padding:10px 28px">صدر اليوم</span>
  </div>
  <div style="position:absolute;top:210px;right:92px;left:92px">
    <h1 data-field="headline" style="font-size:76px;line-height:1.3">[اسم التشريع الجديد]</h1>
    <p class="ref" data-field="reference" style="margin-top:18px;font-size:24px">[رقم التشريع وسنته] · نفاذ: [التاريخ]</p>
  </div>
  <div class="box" style="position:absolute;top:500px;right:92px;left:92px;padding:30px 38px;backdrop-filter:blur(6px)">
    <div class="lbl" style="font-size:20px;margin-bottom:12px">النقطة الأهم</div>
    <div data-field="keypoint" style="font-size:36px;line-height:1.5;color:var(--fg-strong)">[التغيير الواحد الذي يجب أن يعرفه الجميع، بجملة واحدة]</div>
  </div>
  <div class="foot"><span class="site">RK-ADVOCATES.COM</span><span>التفاصيل في الثريد أدناه</span></div>
</div>"""))

T["x_03_founder_opinion"] = (1600, 900, page(1600, 900, f"""
<div class="card light frame">
  {LOGO}
  <div class="photo" data-field="photo" style="top:110px;left:110px;width:360px;height:470px;border-color:rgba(133,104,58,.6)"><img src="brand/founder.jpg" alt=""></div>
  <div style="position:absolute;top:200px;right:100px;width:940px">
    <span class="lbl" data-field="series">رأي قانوني</span>
    <p data-field="quote" style="font-family:'Amiri';font-size:52px;line-height:1.55;color:var(--ink);margin-top:30px">”[الموقف الواضح من القضية في جملتين كحد أقصى، بلغة مباشرة لا تحتمل التأويل]“</p>
  </div>
  <div style="position:absolute;bottom:150px;right:100px;width:940px;display:flex;align-items:center;gap:22px">
    <div class="hair" style="width:70px"></div>
    <div><div data-field="name" style="font-family:'Amiri';font-weight:700;font-size:34px;color:var(--gold)">د. راشد سلطان الكيتوب</div><div data-field="title" style="font-family:'IBM Plex Sans Arabic';font-size:19px;color:#6A6A6A">المؤسس · راشد الكيتوب للمحاماة والاستشارات القانونية</div></div>
  </div>
  <div class="foot"><span class="site">RK-ADVOCATES.COM</span><span>راشد الكيتوب للمحاماة والاستشارات القانونية</span></div>
</div>"""))

manifest = []
for name, (w, h, html) in T.items():
    open(f"{OUT}/{name}.html", "w", encoding="utf8").write(html)
    manifest.append({"name": name, "w": w, "h": h})
json.dump(manifest, open(f"{OUT}/manifest.json", "w"), indent=1)
print("templates:", len(manifest))
