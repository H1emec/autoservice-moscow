/**
 * Переводы интерфейса. Русский текст страницы лежит в разметке и в src/config (его источник правды),
 * поэтому здесь для ru только строки, которые создаёт скрипт (сообщения форм и т. п.).
 * en и hy содержат ВСЕ ключи: интерфейс и демонстрационное содержимое из src/config.
 * Если ключа нет в выбранном языке, показывается русский текст.
 *
 * Армянские тексты нужно показать носителю языка перед запуском у клиента.
 */
export type Lang = 'ru' | 'hy' | 'en';
export const LANGS: Lang[] = ['hy', 'ru', 'en'];
export const DEFAULT_LANG: Lang = 'ru';

type Dict = Record<string, string>;

/* ---------- Содержимое, привязанное к src/config ---------- */
type SvcTr = Record<string, { name: string; items: string[] }>;

const svcEn: SvcTr = {
  engine: { name: 'Engine', items: ['Engine diagnostics', 'Engine mount replacement', 'Gasket and seal replacement', 'Timing chain and belt replacement', 'Engine overhaul', 'Partial engine repair', 'Intake valve cleaning', 'Engine endoscopy'] },
  chassis: { name: 'Chassis', items: ['Chassis diagnostics', 'Shock absorber and strut replacement', 'Stabilizer bushing and link replacement', 'Wheel bearing replacement', 'Control arm and ball joint replacement', 'Wheel alignment', 'Chassis repair'] },
  transmission: { name: 'Transmission', items: ['Gearbox diagnostics', 'Gearbox oil change', 'Clutch replacement', 'CVT repair', 'Automatic transmission valve body repair', 'Torque converter repair', 'Mechatronic unit repair', 'Manual transmission repair', 'Automatic transmission ECU repair', 'DSG and robotic gearbox repair'] },
  brakes: { name: 'Brake system', items: ['Brake system diagnostics', 'Brake fluid replacement', 'Brake disc replacement', 'Brake pad replacement', 'Brake hose replacement', 'Caliper repair'] },
  electrics: { name: 'Electrics and electronics', items: ['Computer diagnostics', 'Error troubleshooting and clearing', 'Battery check and replacement', 'Alternator repair', 'Wiring repair', 'Starter repair'] },
  cooling: { name: 'Cooling and heating', items: ['Cooling system diagnostics', 'Water pump replacement', 'Radiator replacement', 'Radiator cleaning', 'Cooling system flush', 'Air conditioner diagnostics', 'Air conditioner recharge', 'Heater and climate control repair'] },
  fuel: { name: 'Fuel system', items: ['High-pressure fuel pump diagnostics', 'TDI fuel system diagnostics', 'Fuel system flush', 'Injector cleaning', 'FSI high-pressure injector cleaning'] },
  maintenance: { name: 'Maintenance', items: ['Pre-purchase inspection', 'Oil and filter change', 'Scheduled maintenance', 'Fluid level check'] },
};

/** Армянские названия услуг пока не переведены: для них показывается русский текст. */
const svcHy: SvcTr = {
  engine: { name: 'Շարժիչ', items: [] },
  chassis: { name: 'Ընթացամաս', items: [] },
  transmission: { name: 'Փոխանցումատուփ', items: [] },
  brakes: { name: 'Արգելակային համակարգ', items: [] },
  electrics: { name: 'Էլեկտրիկա և էլեկտրոնիկա', items: [] },
  cooling: { name: 'Հովացում և ջեռուցում', items: [] },
  fuel: { name: 'Վառելիքային համակարգ', items: [] },
  maintenance: { name: 'Տեխնիկական սպասարկում', items: [] },
};

function flattenSvc(s: SvcTr): Dict {
  const out: Dict = {};
  for (const [id, v] of Object.entries(s)) {
    out[`svc.${id}.name`] = v.name;
    v.items.forEach((it, i) => (out[`svc.${id}.i.${i}`] = it));
  }
  return out;
}

const list = (prefix: string, rows: Dict[]): Dict => {
  const out: Dict = {};
  rows.forEach((r, i) => Object.entries(r).forEach(([k, v]) => (out[`${prefix}.${i}.${k}`] = v)));
  return out;
};

/* ---------- Английский ---------- */
export const en: Dict = {
  'meta.title': 'Auto service in Yerevan: repair and maintenance of cars of all makes',
  'meta.description': 'Professional auto service in Yerevan: diagnostics, engine, chassis, transmission, brake and electrical repair. Modern equipment, experienced technicians, warranty on work. Book online.',
  'meta.privacy.title': 'Privacy policy: AUTO SERVICE',
  'meta.privacy.description': 'How we process the personal data you leave in the forms on the site.',
  'meta.credits.title': 'Photo credits: AUTO SERVICE',
  'meta.credits.description': 'Authors and licenses of the photos used on the site.',

  'skip': 'Skip to content',
  'site.name': 'AUTO SERVICE',
  'site.address.city': 'Yerevan',
  'site.address.street': '15 Abovyan St',
  'site.address.full': 'Yerevan, 15 Abovyan St',
  'site.hours': 'Daily 09:00–20:00',

  'nav.home': 'Home', 'nav.services': 'Services', 'nav.about': 'About us', 'nav.gallery': 'Gallery', 'nav.reviews': 'Reviews', 'nav.contacts': 'Contacts',
  'nav.main': 'Main navigation', 'nav.mobile': 'Mobile navigation', 'nav.footer': 'Footer navigation',
  'header.cta': 'Book', 'menu.open': 'Open menu', 'menu.close': 'Close menu',
  'mbar.label': 'Quick actions', 'mbar.call': 'Call',
  'lang.label': 'Language',

  'hero.l.0': 'AUTO SERVICE', 'hero.l.1': 'IN YEREVAN',
  'hero.subtitle': 'Comprehensive maintenance, diagnostics and repair of vehicles. Quality service, modern equipment and a professional approach to every car.',
  'hero.cta1': 'Book a service', 'hero.cta2': 'Our services',
  'hero.adv.0': 'Modern equipment', 'hero.adv.1': 'Experienced specialists', 'hero.adv.2': 'Warranty on completed work',

  'brands.title': 'We service cars of all brands',
  'brands.pause': 'Pause the ticker', 'brands.resume': 'Resume the ticker',

  'svc.title': 'Auto repair services',
  'svc.subtitle': 'A full range of maintenance and repair for your car.',
  'svc.hint': "Can't find your problem?",
  'svc.cta': 'Book a service at the auto shop',
  'svc.prefill': 'Service: {name}. ',
  'svc.count.one': '{n} service', 'svc.count.other': '{n} services',
  ...flattenSvc(svcEn),

  'booking.title': 'Having trouble with your car?',
  'booking.lead': 'Leave a request and our specialist will contact you to clarify the details.',
  'booking.call': 'Or call right now',
  'f.name': 'Your name', 'f.phone': 'Phone number', 'f.car': 'Car make and model', 'f.message': 'Describe the problem or the service you need',
  'f.ph.name': 'How should we address you', 'f.ph.car': 'E.g., Toyota Camry, 2015', 'f.ph.message': 'E.g., knocking noise in the suspension when braking',
  'f.consent.a': 'I agree to the processing of personal data in accordance with the', 'f.consent.link': 'privacy policy',
  'f.submit': 'SUBMIT REQUEST', 'f.sending': 'SENDING…',

  'about.title': 'Everything is transparent at every stage',
  'about.lead': 'You know what is wrong with the car, what we will do and how much it costs before work begins.',
  ...list('about.s', [
    { t: 'Inspection and diagnostics', p: 'We find the cause, not just treat the symptoms.' },
    { t: 'Estimate before work', p: 'We agree the scope of work and the cost with you.' },
    { t: 'Repair with a report', p: 'We show the replaced parts and send photos.' },
    { t: 'Handover with a warranty', p: 'We explain what was done and give a warranty on the work.' },
  ]),

  'gal.title': 'Our auto service',
  'gal.subtitle': 'Modern equipment, professional technicians and comfortable service conditions.',
  'gal.cap.diagnostics': 'Repair area', 'gal.cap.balancer': 'Wheel balancing', 'gal.cap.suspension': 'Suspension repair', 'gal.cap.engineCheck': 'Engine inspection',
  'gal.cap.lift': 'Lifts and work area', 'gal.cap.mechanicLight': "Technician's workplace", 'gal.cap.obd': 'Diagnostic equipment',
  'gal.alt.hero': 'A technician running computer diagnostics on an engine with a laptop',
  'gal.alt.diagnostics': 'A car on a lift in the repair area of an auto service',
  'gal.alt.mechanicLight': 'A technician working by a car on a lift in a sunlit workshop',
  'gal.alt.engineCheck': "A technician inspecting a car's engine bay",
  'gal.alt.obd': 'Connecting an OBD diagnostic connector to a car',
  'gal.alt.balancer': 'A wheel balancing machine with a screen',
  'gal.alt.suspension': 'A technician placing a stand under the suspension of a lifted car',
  'gal.alt.lift': 'A lift and hydraulic unit in the repair area',
  'lb.label': 'Photo viewer', 'lb.close': 'Close', 'lb.prev': 'Previous photo', 'lb.next': 'Next photo', 'lb.count': '{i} of {n}',

  'rev.title': 'What our customers say', 'rev.cta': 'LEAVE A REVIEW',
  'rev.demo': 'Demonstration reviews: sample text for the mockup, not reviews from real customers.',
  'stars.label': 'Rating {n} out of 5',
  ...list('rev', [
    { name: 'Ashot M.', date: 'October 12, 2026', text: 'I came in with a dull knocking in the suspension. The technician showed me the worn ball joints, agreed the price and fixed it the same day. They gave me the old parts back, and the knocking is gone.' },
    { name: 'Anna K.', date: 'September 28, 2026', text: "The check engine light came on and two other shops couldn't find the cause. Here they ran diagnostics in an hour and explained exactly what broke." },
    { name: 'David G.', date: 'September 3, 2026', text: 'Routine maintenance, oil and filters. Done quickly, and they told me what to replace next time. I waited a bit in the queue, but they warned me in advance.' },
    { name: 'Mariam T.', date: 'August 17, 2026', text: 'We replaced the brake pads and discs. Everything was clean, the price matched the estimate, and the work came with a warranty.' },
  ]),
  'rd.title': 'Leave a review', 'rd.name': 'Your name', 'rd.rating': 'Rating', 'rd.star': '{n} out of 5', 'rd.text': 'Review text',
  'rd.ph.text': "What you had repaired and what you liked or didn't like", 'rd.submit': 'Submit review', 'rd.sending': 'Sending…',

  'c.title': 'We are waiting for you',
  'c.address': 'Address', 'c.phone': 'Phone', 'c.hours': 'Working hours', 'c.email': 'Email', 'c.instagram': 'Instagram',
  'c.book': 'Book a service', 'c.call': 'Call', 'c.insta': 'Message on Instagram',
  'map.title': 'Map', 'map.route': 'Get directions', 'map.open': 'Open map',

  'footer.desc': 'Diagnostics, maintenance and repair of cars of all makes in Yerevan. We explain what is broken and agree on the price before work begins.',
  'footer.sections': 'Sections', 'footer.rights': 'All rights reserved.', 'footer.privacy': 'Privacy policy', 'footer.credits': 'Photo credits',

  'priv.title': 'Privacy policy',
  'priv.note.a': 'Template.', 'priv.note.b': 'This is sample text for demonstrating the site. Replace it with a document prepared by a lawyer under the laws of your country.',
  'priv.h1': 'What data we collect', 'priv.p1': 'Through the forms on the site we receive your name, phone number, car make and a description of the task. You provide this data voluntarily.',
  'priv.h2': 'Why we use it', 'priv.l1': 'to contact you and agree on a service appointment;', 'priv.l2': 'to prepare for work on your car;', 'priv.l3': 'to reply to your review or question.',
  'priv.h3': 'Storage and sharing', 'priv.p3': 'We do not share your data with third parties except where required by law. Retention period:',
  'priv.h4': 'Your rights', 'priv.p4': 'You can request that your data be corrected or deleted by contacting us using the details given on the site.',
  'priv.h5': 'Data operator', 'priv.op': 'Details:', 'fill': '[FILL IN]',

  'cr.title': 'Photo credits',
  'cr.note.a': 'Temporary materials.', 'cr.note.b': 'The photos are from Wikimedia Commons and are distributed under the CC BY 2.0 license. Replace them with photos of your auto service before launching the site.',
  'cr.outro': 'Car brand logos belong to their owners and are shown only to indicate the brands serviced. Icons: Lucide (ISC license), Simple Icons (CC0).',

  's.ok.title': 'Thank you, {name}! Your request has been sent.', 's.ok.text': 'Our specialist will contact you at {phone}.',
  's.demo.title': 'Request not sent: request intake is not connected on this site yet.', 's.demo.text': 'Your details are still in the form. Please contact us another way:',
  's.err.title': 'Could not send your request.', 's.err.text': 'Try again or contact us directly:',
  's.call': 'Call {phone}', 's.mail': 'Send by email', 's.mailReview': 'Send review by email',
  'sr.ok.title': 'Thank you for your review!', 'sr.ok.text': 'It has been sent for moderation and will appear on the site after review.',
  'sr.demo.title': 'Review not saved: review intake is not connected on this site yet.', 'sr.demo.text': 'Your text is still in the form.',
  'sr.err.title': 'Could not send the review.', 'sr.err.text': 'Please try again.',
  'err.http': 'The server responded with code {code}', 'err.timeout': 'The server did not respond in time', 'err.network': 'No connection to the server',
  'v.name': 'Please tell us how to address you', 'v.phone.empty': 'Enter your phone number',
  'v.phone.chars': 'Only digits, spaces and the “+” sign are allowed', 'v.phone.format': 'Check the number: 8 to 15 digits, e.g. +374 00 000 000',
  'v.consent': 'Consent to data processing is required', 'v.rev.name': 'Enter your name', 'v.rating': 'Please choose a rating from 1 to 5',
  'v.text': 'Write at least a couple of sentences (10+ characters)',
  'm.subjectLead': 'Request from the website', 'm.subjectReview': 'Review from the website',
  'm.name': 'Name', 'm.phone': 'Phone', 'm.car': 'Car', 'm.task': 'Problem or service', 'm.rating': 'Rating', 'm.of': 'out of 5',
};

/* ---------- Армянский ---------- */
export const hy: Dict = {
  'meta.title': 'Ավտոսերվիս Երևանում․ բոլոր մակնիշների ավտոմեքենաների վերանորոգում և սպասարկում',
  'meta.description': 'Մասնագիտական ավտոսերվիս Երևանում․ ախտորոշում, շարժիչի, ընթացամասի, փոխանցումատուփի, արգելակների և էլեկտրասարքավորումների վերանորոգում։ Ժամանակակից սարքավորումներ, փորձառու վարպետներ, աշխատանքների երաշխիք։ Գրանցվեք առցանց։',
  'meta.privacy.title': 'Գաղտնիության քաղաքականություն․ ԱՎՏՈՍԵՐՎԻՍ',
  'meta.privacy.description': 'Ինչպես ենք մշակում կայքի ձևաթղթերում թողնված անձնական տվյալները։',
  'meta.credits.title': 'Լուսանկարների աղբյուրներ․ ԱՎՏՈՍԵՐՎԻՍ',
  'meta.credits.description': 'Կայքում օգտագործված լուսանկարների հեղինակներն ու լիցենզիաները։',

  'skip': 'Անցնել բովանդակությանը',
  'site.name': 'ԱՎՏՈՍԵՐՎԻՍ',
  'site.address.city': 'ք. Երևան',
  'site.address.street': 'Աբովյան փող., 15',
  'site.address.full': 'ք. Երևան, Աբովյան փող., 15',
  'site.hours': 'Ամեն օր 09:00–20:00',

  'nav.home': 'Գլխավոր', 'nav.services': 'Ծառայություններ', 'nav.about': 'Մեր մասին', 'nav.gallery': 'Պատկերասրահ', 'nav.reviews': 'Կարծիքներ', 'nav.contacts': 'Կոնտակտներ',
  'nav.main': 'Հիմնական նավիգացիա', 'nav.mobile': 'Բջջային նավիգացիա', 'nav.footer': 'Նավիգացիա էջի ներքևում',
  'header.cta': 'Գրանցվել', 'menu.open': 'Բացել մենյուն', 'menu.close': 'Փակել մենյուն',
  'mbar.label': 'Արագ գործողություններ', 'mbar.call': 'Զանգահարել',
  'lang.label': 'Լեզու',

  'hero.l.0': 'ԱՎՏՈՍԵՐՎԻՍ', 'hero.l.1': 'ԵՐԵՎԱՆՈՒՄ',
  'hero.subtitle': 'Ավտոմեքենաների համալիր սպասարկում, ախտորոշում և վերանորոգում։ Որակյալ սպասարկում, ժամանակակից սարքավորումներ և մասնագիտական մոտեցում յուրաքանչյուր մեքենայի նկատմամբ։',
  'hero.cta1': 'Գրանցվել սպասարկման', 'hero.cta2': 'Մեր ծառայությունները',
  'hero.adv.0': 'Ժամանակակից սարքավորումներ', 'hero.adv.1': 'Փորձառու մասնագետներ', 'hero.adv.2': 'Կատարված աշխատանքների երաշխիք',

  'brands.title': 'Սպասարկում ենք բոլոր մակնիշների ավտոմեքենաներ',
  'brands.pause': 'Կանգնեցնել ժապավենը', 'brands.resume': 'Շարունակել ժապավենը',

  'svc.title': 'Ավտոսերվիսի ծառայություններ',
  'svc.subtitle': 'Ձեր ավտոմեքենայի տեխնիկական սպասարկման և վերանորոգման ամբողջական շրջանակ։',
  'svc.hint': 'Չե՞ք գտել ձեր անսարքությունը։',
  'svc.cta': 'Գրանցվել ավտոսերվիս',
  'svc.prefill': 'Ծառայություն՝ {name}. ',
  'svc.count.one': '{n} ծառայություն', 'svc.count.other': '{n} ծառայություն',
  ...flattenSvc(svcHy),

  'booking.title': 'Խնդիր ունե՞ք ավտոմեքենայի հետ',
  'booking.lead': 'Թողեք հայտ, և մեր մասնագետը կկապվի ձեզ հետ մանրամասները ճշտելու համար։',
  'booking.call': 'Կամ զանգահարեք հենց հիմա',
  'f.name': 'Ձեր անունը', 'f.phone': 'Հեռախոսահամար', 'f.car': 'Ավտոմեքենայի մակնիշը և մոդելը', 'f.message': 'Նկարագրեք խնդիրը կամ անհրաժեշտ ծառայությունը',
  'f.ph.name': 'Ինչպե՞ս դիմել ձեզ', 'f.ph.car': 'Օրինակ՝ Toyota Camry, 2015', 'f.ph.message': 'Օրինակ՝ կախոցում թակոց արգելակելիս',
  'f.consent.a': 'Համաձայն եմ անձնական տվյալների մշակմանը՝', 'f.consent.link': 'գաղտնիության քաղաքականությանը համապատասխան',
  'f.submit': 'ՈՒՂԱՐԿԵԼ ՀԱՅՏԸ', 'f.sending': 'ՈՒՂԱՐԿՎՈՒՄ Է…',

  'about.title': 'Ամեն փուլում ամեն ինչ թափանցիկ է',
  'about.lead': 'Դուք գիտեք, թե ինչ է մեքենային, ինչ ենք անելու և որքան է արժենալու՝ մինչև աշխատանքների սկսելը։',
  ...list('about.s', [
    { t: 'Զննում և ախտորոշում', p: 'Գտնում ենք պատճառը, այլ ոչ թե բուժում ախտանիշները։' },
    { t: 'Նախահաշիվ մինչև աշխատանքները', p: 'Համաձայնեցնում ենք աշխատանքների ծավալը և արժեքը ձեզ հետ։' },
    { t: 'Վերանորոգում հաշվետվությամբ', p: 'Ցույց ենք տալիս փոխարինված մասերը և ուղարկում լուսանկարներ։' },
    { t: 'Հանձնում երաշխիքով', p: 'Բացատրում ենք, թե ինչ է արվել, և տալիս ենք երաշխիք աշխատանքների համար։' },
  ]),

  'gal.title': 'Մեր ավտոսերվիսը',
  'gal.subtitle': 'Ժամանակակից սարքավորումներ, պրոֆեսիոնալ վարպետներ և սպասարկման հարմարավետ պայմաններ։',
  'gal.cap.diagnostics': 'Վերանորոգման գոտի', 'gal.cap.balancer': 'Անիվների հավասարակշռում', 'gal.cap.suspension': 'Կախոցի վերանորոգում', 'gal.cap.engineCheck': 'Շարժիչի զննում',
  'gal.cap.lift': 'Վերելակներ և աշխատանքային գոտի', 'gal.cap.mechanicLight': 'Վարպետի աշխատատեղ', 'gal.cap.obd': 'Ախտորոշման սարքավորում',
  'gal.alt.hero': 'Վարպետը նոութբուքով համակարգչային ախտորոշում է կատարում շարժիչի վրա',
  'gal.alt.diagnostics': 'Ավտոմեքենան վերելակի վրա՝ ավտոսերվիսի վերանորոգման գոտում',
  'gal.alt.mechanicLight': 'Վարպետը աշխատում է վերելակի վրա բարձրացված մեքենայի մոտ՝ լուսավոր արհեստանոցում',
  'gal.alt.engineCheck': 'Վարպետը զննում է մեքենայի շարժիչի խցիկը',
  'gal.alt.obd': 'OBD ախտորոշման միակցիչի միացում ավտոմեքենային',
  'gal.alt.balancer': 'Անիվների հավասարակշռման հաստոց էկրանով',
  'gal.alt.suspension': 'Վարպետը կանգնակ է դնում բարձրացված մեքենայի կախոցի տակ',
  'gal.alt.lift': 'Վերելակ և հիդրավլիկ ագրեգատ վերանորոգման գոտում',
  'lb.label': 'Լուսանկարի դիտում', 'lb.close': 'Փակել', 'lb.prev': 'Նախորդ լուսանկար', 'lb.next': 'Հաջորդ լուսանկար', 'lb.count': '{i} / {n}',

  'rev.title': 'Ինչ են ասում մեր հաճախորդները', 'rev.cta': 'ԹՈՂՆԵԼ ԿԱՐԾԻՔ',
  'rev.demo': 'Ցուցադրական կարծիքներ․ մակետի համար օրինակելի տեքստեր են, ոչ թե իրական հաճախորդների կարծիքներ։',
  'stars.label': 'Գնահատական՝ {n} 5-ից',
  ...list('rev', [
    { name: 'Աշոտ Մ.', date: '2026 թ. հոկտեմբերի 12', text: 'Եկա կախոցում խուլ թակոցով։ Վարպետը ցույց տվեց մաշված գնդային հենարանները, համաձայնեցրեց գինը և նույն օրը վերանորոգեց։ Հին մասերը վերադարձրին, թակոցը վերացավ։' },
    { name: 'Աննա Կ.', date: '2026 թ. սեպտեմբերի 28', text: 'Վառվեց «Check Engine» ցուցիչը, և երկու այլ սերվիսում պատճառը չգտան։ Այստեղ մեկ ժամում ախտորոշեցին և բացատրեցին, թե կոնկրետ ինչ է փչացել։' },
    { name: 'Դավիթ Գ.', date: '2026 թ. սեպտեմբերի 3', text: 'Պլանային սպասարկում՝ յուղ և զտիչներ։ Արագ արեցին, գրեցին՝ հաջորդ անգամ ինչ փոխել։ Մի քիչ սպասեցի հերթում, բայց նախապես զգուշացրել էին։' },
    { name: 'Մարիամ Թ.', date: '2026 թ. օգոստոսի 17', text: 'Փոխեցինք արգելակային կոճղակներն ու սկավառակները։ Ամեն ինչ մաքուր էր, գինը համընկավ նախահաշվին, աշխատանքների համար երաշխիք տվեցին։' },
  ]),
  'rd.title': 'Թողնել կարծիք', 'rd.name': 'Ձեր անունը', 'rd.rating': 'Գնահատական', 'rd.star': '{n} 5-ից', 'rd.text': 'Կարծիքի տեքստը',
  'rd.ph.text': 'Ինչ եք վերանորոգել և ինչն է դուր եկել կամ չի եկել', 'rd.submit': 'Ուղարկել կարծիքը', 'rd.sending': 'Ուղարկվում է…',

  'c.title': 'Սպասում ենք ձեզ',
  'c.address': 'Հասցե', 'c.phone': 'Հեռախոս', 'c.hours': 'Աշխատանքային ժամեր', 'c.email': 'Էլ. փոստ', 'c.instagram': 'Instagram',
  'c.book': 'Գրանցվել սպասարկման', 'c.call': 'Զանգահարել', 'c.insta': 'Գրել Instagram-ով',
  'map.title': 'Քարտեզ', 'map.route': 'Կառուցել երթուղի', 'map.open': 'Բացել քարտեզը',

  'footer.desc': 'Բոլոր մակնիշների ավտոմեքենաների ախտորոշում, սպասարկում և վերանորոգում Երևանում։ Բացատրում ենք, թե ինչ է փչացել, և համաձայնեցնում ենք գինը մինչև աշխատանքների սկսելը։',
  'footer.sections': 'Բաժիններ', 'footer.rights': 'Բոլոր իրավունքները պաշտպանված են։', 'footer.privacy': 'Գաղտնիության քաղաքականություն', 'footer.credits': 'Լուսանկարների աղբյուրներ',

  'priv.title': 'Գաղտնիության քաղաքականություն',
  'priv.note.a': 'Ձևանմուշ։', 'priv.note.b': 'Սա օրինակելի տեքստ է կայքի ցուցադրության համար։ Գործարկելուց առաջ փոխարինեք այն իրավաբանի կազմած փաստաթղթով՝ ձեր երկրի օրենսդրության համաձայն։',
  'priv.h1': 'Ինչ տվյալներ ենք հավաքում', 'priv.p1': 'Կայքի ձևաթղթերի միջոցով մենք ստանում ենք ձեր անունը, հեռախոսահամարը, ավտոմեքենայի մակնիշը և խնդրի նկարագրությունը։ Այս տվյալները դուք նշում եք կամավոր։',
  'priv.h2': 'Ինչու ենք օգտագործում', 'priv.l1': 'ձեզ հետ կապվելու և սպասարկման գրանցումը համաձայնեցնելու համար․', 'priv.l2': 'ձեր մեքենայի հետ աշխատանքներին նախապատրաստվելու համար․', 'priv.l3': 'ձեր կարծիքին կամ հարցին պատասխանելու համար։',
  'priv.h3': 'Պահպանում և փոխանցում', 'priv.p3': 'Մենք ձեր տվյալները երրորդ անձանց չենք փոխանցում, բացառությամբ օրենքով նախատեսված դեպքերի։ Պահպանման ժամկետ՝',
  'priv.h4': 'Ձեր իրավունքները', 'priv.p4': 'Դուք կարող եք պահանջել ձեր տվյալների ճշգրտում կամ ջնջում՝ դիմելով մեզ կայքում նշված կոնտակտներով։',
  'priv.h5': 'Տվյալների օպերատոր', 'priv.op': 'Վավերապայմաններ՝', 'fill': '[ԼՐԱՑՆԵԼ]',

  'cr.title': 'Լուսանկարների աղբյուրներ',
  'cr.note.a': 'Ժամանակավոր նյութեր։', 'cr.note.b': 'Լուսանկարները վերցված են Wikimedia Commons-ից և տարածվում են CC BY 2.0 լիցենզիայով։ Կայքը գործարկելուց առաջ փոխարինեք դրանք ձեր ավտոսերվիսի լուսանկարներով։',
  'cr.outro': 'Ավտոմեքենաների մակնիշների լոգոները պատկանում են իրենց սեփականատերերին և ցուցադրվում են միայն սպասարկվող մակնիշները նշելու համար։ Պատկերակներ՝ Lucide (ISC լիցենզիա), Simple Icons (CC0)։',

  's.ok.title': 'Շնորհակալություն, {name}։ Ձեր հայտն ուղարկված է։', 's.ok.text': 'Մեր մասնագետը կկապվի ձեզ հետ {phone} համարով։',
  's.demo.title': 'Հայտն ուղարկված չէ․ այս կայքում հայտերի ընդունումը դեռ միացված չէ։', 's.demo.text': 'Ձեր տվյալները մնացել են ձևաթղթում։ Կապվեք մեզ հետ այլ եղանակով․',
  's.err.title': 'Չհաջողվեց ուղարկել հայտը։', 's.err.text': 'Փորձեք նորից կամ կապվեք մեզ հետ անմիջապես․',
  's.call': 'Զանգահարել {phone}', 's.mail': 'Ուղարկել նամակով', 's.mailReview': 'Ուղարկել կարծիքը նամակով',
  'sr.ok.title': 'Շնորհակալություն կարծիքի համար։', 'sr.ok.text': 'Այն ուղարկվել է մոդերացիայի և կհայտնվի կայքում ստուգումից հետո։',
  'sr.demo.title': 'Կարծիքը չի պահպանվել․ այս կայքում կարծիքների ընդունումը դեռ միացված չէ։', 'sr.demo.text': 'Ձեր տեքստը մնացել է ձևաթղթում։',
  'sr.err.title': 'Չհաջողվեց ուղարկել կարծիքը։', 'sr.err.text': 'Փորձեք նորից։',
  'err.http': 'Սերվերը պատասխանել է {code} կոդով', 'err.timeout': 'Սերվերը ժամանակին չպատասխանեց', 'err.network': 'Սերվերի հետ կապ չկա',
  'v.name': 'Նշեք, թե ինչպես դիմել ձեզ', 'v.phone.empty': 'Մուտքագրեք հեռախոսահամարը',
  'v.phone.chars': 'Թույլատրվում են միայն թվեր, բացատներ և «+» նշանը', 'v.phone.format': 'Ստուգեք համարը․ 8-ից 15 թվանշան, օրինակ՝ +374 00 000 000',
  'v.consent': 'Անհրաժեշտ է համաձայնություն տվյալների մշակմանը', 'v.rev.name': 'Մուտքագրեք ձեր անունը', 'v.rating': 'Ընտրեք գնահատական 1-ից 5',
  'v.text': 'Գրեք առնվազն մի քանի նախադասություն (10+ նշան)',
  'm.subjectLead': 'Հայտ կայքից', 'm.subjectReview': 'Կարծիք կայքից',
  'm.name': 'Անուն', 'm.phone': 'Հեռախոս', 'm.car': 'Ավտոմեքենա', 'm.task': 'Խնդիր կամ ծառայություն', 'm.rating': 'Գնահատական', 'm.of': '5-ից',
};

/* ---------- Русский: только строки, которые создаёт скрипт ---------- */
export const ru: Dict = {
  'menu.open': 'Открыть меню', 'menu.close': 'Закрыть меню',
  'svc.prefill': 'Услуга: {name}. ',
  'svc.count.one': '{n} услуга', 'svc.count.few': '{n} услуги', 'svc.count.many': '{n} услуг', 'svc.count.other': '{n} услуги',
  'f.submit': 'ОТПРАВИТЬ ЗАЯВКУ', 'f.sending': 'ОТПРАВЛЯЕМ…',
  'rd.submit': 'Отправить отзыв', 'rd.sending': 'Отправляем…',
  'lb.count': '{i} из {n}', 'stars.label': 'Оценка {n} из 5', 'rd.star': '{n} из 5',
  's.ok.title': 'Спасибо, {name}! Заявка отправлена.', 's.ok.text': 'Наш специалист свяжется с вами по номеру {phone}.',
  's.demo.title': 'Заявка не отправлена: приём заявок на этом сайте ещё не подключён.', 's.demo.text': 'Ваши данные остались в форме. Свяжитесь с нами другим способом:',
  's.err.title': 'Не удалось отправить заявку.', 's.err.text': 'Попробуйте ещё раз или свяжитесь с нами напрямую:',
  's.call': 'Позвонить {phone}', 's.mail': 'Отправить письмом', 's.mailReview': 'Отправить отзыв письмом',
  'sr.ok.title': 'Спасибо за отзыв!', 'sr.ok.text': 'Он отправлен на проверку и появится на сайте после модерации.',
  'sr.demo.title': 'Отзыв не сохранён: приём отзывов на этом сайте ещё не подключён.', 'sr.demo.text': 'Текст остался в форме.',
  'sr.err.title': 'Не удалось отправить отзыв.', 'sr.err.text': 'Попробуйте ещё раз.',
  'err.http': 'Сервер ответил кодом {code}', 'err.timeout': 'Сервер не ответил вовремя', 'err.network': 'Нет соединения с сервером',
  'v.name': 'Укажите, как к вам обращаться', 'v.phone.empty': 'Укажите номер телефона',
  'v.phone.chars': 'В номере допустимы только цифры, пробелы и знак «+»', 'v.phone.format': 'Проверьте номер: нужно от 8 до 15 цифр, например +7 000 000-00-00',
  'v.consent': 'Нужно согласие на обработку данных', 'v.rev.name': 'Укажите ваше имя', 'v.rating': 'Поставьте оценку от 1 до 5',
  'v.text': 'Напишите хотя бы пару предложений (от 10 символов)',
  'm.subjectLead': 'Заявка с сайта', 'm.subjectReview': 'Отзыв с сайта',
  'm.name': 'Имя', 'm.phone': 'Телефон', 'm.car': 'Автомобиль', 'm.task': 'Проблема или услуга', 'm.rating': 'Оценка', 'm.of': 'из 5',
};

export const ui: Record<Lang, Dict> = { ru, en, hy };
