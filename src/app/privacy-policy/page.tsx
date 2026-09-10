import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy | BackBySunday",
  description:
    "BackBySunday Privacy Policy for account, booking, identity verification, medical, location, payment, operator, and communication data.",
  keywords: [
    "BackBySunday privacy policy",
    "travel marketplace privacy policy",
    "travel booking data policy",
    "trek booking privacy",
  ],
  alternates: {
    canonical: "/privacy-policy",
  },
};

const updatedDate = "10 September 2026";

const sections = [
  {
    title: "1. Who We Are",
    paragraphs: [
      "BackBySunday is a travel and trekking discovery and booking platform currently operating as an unregistered venture based in Pune, Maharashtra, India. BackBySunday may be referred to in this Privacy Policy as BackBySunday, we, us, or our.",
      "BackBySunday provides a platform through which users may discover, compare, and book short-duration travel experiences, trekking experiences, adventure activities, stays, and other travel-related services offered either by BackBySunday or by participating third-party travel operators, trekking companies, guides, accommodation providers, transport providers, and other service providers.",
      "This Privacy Policy explains how we collect, use, store, share, and protect personal data when you access or use backbysunday.in, our web platform, mobile applications when available, and any related services, features, communications, booking services, or platforms operated by BackBySunday.",
      "BackBySunday is currently not incorporated as a separate legal entity. This Privacy Policy will be updated with the applicable legal entity name, registered office, and other statutory information after incorporation.",
    ],
  },
  {
    title: "2. Legal Framework And Our Approach",
    paragraphs: [
      "BackBySunday respects privacy and is committed to handling personal data transparently, responsibly, and in accordance with applicable laws in India.",
      "India's Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 apply according to their notified commencement timelines. We have structured this Privacy Policy to align with the DPDP framework, including lawful and transparent processing, purpose limitation, data minimisation, accuracy, storage limitation, security safeguards, accountability, privacy rights, and grievance handling.",
      "By using the Platform, you acknowledge that you have read this Privacy Policy. Where consent is required under applicable law, we will request such consent separately or through an appropriate notice, permission, checkbox, setting, or consent mechanism.",
      "For certain data practices, including identity verification, medical or safety information, precise location, public media, marketing communications, and non-essential cookies or tracking technologies, we may provide shorter notices at the point where the relevant information is collected.",
    ],
  },
  {
    title: "3. Personal Data We Collect",
    paragraphs: [
      "The information we collect depends on how you use the Platform.",
      "Account and profile information may include your name, email address, mobile number, age or date of birth, profile photograph, city or general location, login credentials, authentication information, account preferences, and information received from Google login or phone OTP where those features are enabled.",
      "Traveller and booking information may include traveller names, age or date of birth, mobile number, email address, emergency contact details, number of participants, selected trip, selected dates, pickup or meeting location, booking preferences, special requests, booking status, cancellation history, refund information, and booking history.",
      "If one user makes a booking on behalf of other travellers, that user confirms that they have authority to provide those travellers' personal data, including contact details, age, identity verification information, medical or safety information, and emergency contact details where required. The booking user is responsible for ensuring that such travellers are informed about this Privacy Policy and the use of their information for the relevant booking.",
      "If you provide another person's details, such as an emergency contact, you confirm that you have authority to provide that information and that the person may be contacted in connection with your booking, trip coordination, safety, or emergency assistance.",
    ],
  },
  {
    title: "4. Medical Safety And Emergency Information",
    paragraphs: [
      "For certain treks, adventure activities, stays, permits, or travel experiences, we may collect additional information required for safety, eligibility, emergency response, identity verification, or trip coordination. This may include basic medical information, health declarations, fitness or risk confirmations, allergies, medication details, blood group where relevant, emergency notes, emergency contact information, and other trip-specific safety information.",
      "Some medical or safety information may be mandatory for a particular trip where it is reasonably required for safety, eligibility, legal, insurance, Operator, guide, destination, permit, or emergency-response purposes. Other information may be optional and provided at your discretion.",
      "By providing medical, health, allergy, medication, fitness, or emergency-related information, you confirm that the information is accurate to the best of your knowledge and may be used by BackBySunday, relevant Operators, guides, trip leaders, emergency responders, or support personnel where necessary for trip safety, coordination, emergency assistance, or risk management.",
      "We will use medical and safety information only for purposes connected with booking administration, safety, emergency assistance, fraud prevention, legal compliance, or fulfilment of the relevant trip.",
    ],
  },
  {
    title: "5. Optional Identity Verification And Government ID Documents",
    paragraphs: [
      "Users may voluntarily upload a government-issued identity document for profile verification and to receive a verified-profile badge or similar indication on the Platform. Uploading an identity document is optional unless a specific trip, permit, destination, Operator requirement, safety requirement, insurance requirement, or legal obligation requires identity verification, in which case this will be disclosed before booking where practical.",
      "Accepted identity documents may include government-issued documents selected by the user. Aadhaar is not required by default and should not be provided unless the user voluntarily chooses it or it is specifically required by applicable law or a lawful trip, permit, destination, or regulatory requirement. Where possible, users are encouraged to upload masked Aadhaar or another accepted government-issued identity document instead of a full Aadhaar copy.",
      "Identity documents may be used for verification, fraud prevention, verified-profile status, permit or check-in support, trip safety, dispute handling, legal compliance, or booking-related requirements.",
      "After verification, BackBySunday may retain verification status, document type, verification date, and limited verification records. Full uploaded identity document copies may be retained only for as long as reasonably necessary for verification, fraud prevention, legal compliance, dispute handling, safety, or booking-related requirements.",
      "Users may request deletion of uploaded identity documents. If the uploaded identity document is deleted, BackBySunday may remove the verified-profile badge and may require re-verification for features or trips that require verified identity.",
    ],
  },
  {
    title: "6. Location And GPS Information",
    paragraphs: [
      "BackBySunday may request location access for features such as showing nearby treks, identifying departure points, assisting with pickup or meeting-point coordination, and supporting safety during active treks or trips.",
      "For nearby-trip discovery, location access may be requested on a one-time or while-using basis, depending on the feature and device or browser settings.",
      "For active treks or adventure activities, users may be requested or strongly encouraged to keep GPS or location services enabled for safety, route coordination, group management, emergency assistance, or guide support. If a specific trip or feature requires location access for safety or coordination, we will seek to disclose that before booking or before the feature is used where practical.",
      "Where precise or live location functionality is introduced through the Platform, we will provide appropriate notice and request relevant permissions. Location permissions can usually be withdrawn through device or browser settings, but disabling location may limit nearby discovery, pickup coordination, safety, navigation, or emergency-support features.",
      "Users should not rely exclusively on BackBySunday or location functionality as a substitute for emergency services, local authorities, guides, Operators, or appropriate safety procedures.",
    ],
  },
  {
    title: "7. Payment And Transaction Information",
    paragraphs: [
      "Payments made through BackBySunday are expected to be processed using third-party payment providers, including Cashfree Payments.",
      "BackBySunday may receive transaction-related information such as transaction or payment ID, booking amount, payment status, payment method category, date and time of payment, refund status, and information required for reconciliation, customer support, fraud checks, disputes, tax, accounting, or legal compliance.",
      "Your complete payment credentials, such as full card numbers, CVV values, UPI PINs, banking passwords, or equivalent payment authentication credentials, are expected to be processed directly by Cashfree or the relevant regulated payment provider. BackBySunday does not intend to directly store those complete payment credentials.",
      "Cashfree independently processes certain information in accordance with its own privacy practices and applicable regulatory requirements. You may review Cashfree's privacy policy at cashfree.com/privacypolicy.",
    ],
  },
  {
    title: "8. Device Usage Cookies Analytics And Advertising Technologies",
    paragraphs: [
      "When you access the Platform, certain technical and usage information may be collected automatically, including IP address, browser type, operating system, device type, device identifiers where permitted, language settings, referring pages, pages viewed, features used, session information, timestamps, crash information, and general interaction data.",
      "We may use cookies, local storage, SDKs, pixels, and similar technologies to operate the Platform, remember preferences, understand Platform usage, improve functionality, measure performance, prevent fraud, and evaluate marketing campaigns.",
      "We currently expect to use services including Google Analytics and Meta Pixel. These services may process information regarding your browser, device, interactions with our Platform, pages visited, approximate location derived from IP address, advertising identifiers where available, and other technical or usage information.",
      "Where applicable law requires consent for non-essential cookies, advertising pixels, or tracking technologies, we will provide an appropriate notice or consent mechanism. You may also be able to control certain cookies through your browser settings and advertising preferences through the relevant third-party provider.",
    ],
  },
  {
    title: "9. Communications WhatsApp And Marketing",
    paragraphs: [
      "We may use email, SMS, WhatsApp, phone calls, push notifications, in-app messages, or similar channels to send booking confirmations, payment updates, itineraries, pickup information, trip reminders, safety instructions, cancellation updates, refund updates, account messages, and customer-support communications.",
      "Where permitted by law and based on user consent or preferences, BackBySunday may send promotional communications, offers, destination recommendations, discounts, new trip announcements, and marketing messages through email, SMS, WhatsApp, push notifications, or similar channels.",
      "If a marketing preference is pre-selected, users may unselect it before continuing. Users may opt out of promotional communications at any time through the unsubscribe option, account settings, WhatsApp opt-out instructions, or by contacting us.",
      "Essential booking, payment, safety, account, refund, cancellation, security, and service communications may still be sent even if marketing communications are disabled.",
    ],
  },
  {
    title: "10. Reviews Ratings Photos Videos And Public Content",
    paragraphs: [
      "Users may upload or submit reviews, ratings, photographs, videos, comments, feedback, or other trip-related content. Depending on the feature and permissions provided, such content may be displayed publicly on the Platform, including on trip pages, Operator pages, review sections, galleries, marketing pages, or social-media channels.",
      "BackBySunday or Operators may request group photographs or trip media for verification, safety, community, listing-quality, operational, or promotional purposes. Where such media identifies users and is intended for public or promotional use, we will seek to provide appropriate notice or obtain consent where required.",
      "Users should not upload photographs or videos of other individuals unless they have appropriate permission to do so. Users may contact BackBySunday to request review of public content associated with them, although removal may depend on platform rules, legal obligations, evidence preservation needs, and the rights of other users.",
      "Operators may manage certain trip photographs, videos, ratings, and reviews on their listing pages, subject to BackBySunday's platform rules, moderation rights, safety standards, and legal obligations.",
    ],
  },
  {
    title: "11. Operator And Service Provider Information",
    paragraphs: [
      "BackBySunday allows travel companies, trekking companies, guides, agencies, accommodation providers, transport providers, and other service providers to apply to list experiences on the Platform.",
      "For verification, onboarding, fraud prevention, trust and safety, payouts, marketplace administration, and listing quality, we may collect business name, representative name, phone number, email address, business address, website and social-media profiles, registration details, licences or certifications where applicable, years in operation, public reputation information, bank or payout information, trip information, photographs, media, reviews, and related documents.",
      "Providing information does not automatically guarantee that an Operator will be approved or remain listed on BackBySunday.",
    ],
  },
  {
    title: "12. How We Use Personal Data",
    paragraphs: [
      "We may use personal data to provide and operate the Platform; create and authenticate accounts; verify profiles; discover and recommend relevant trips; process and manage bookings; process payments and refunds; coordinate trips with Operators and guides; send confirmations, itineraries, reminders, safety instructions, and operational updates; provide customer support; handle cancellations, refunds, disputes, and complaints; verify Operators; maintain platform security; prevent fraud and abuse; respond to emergencies; improve our products and services; conduct analytics; comply with legal obligations; and establish, exercise, or defend legal claims.",
      "We will seek to collect only information that is reasonably necessary for the relevant purpose and will use higher-risk information such as ID documents, medical details, emergency contacts, and precise location information only for purposes connected with verification, safety, trip fulfilment, emergency assistance, legal compliance, fraud prevention, or user-authorized functionality.",
      "Where permitted by law and subject to applicable choices and consent requirements, we may also use contact information to inform users about new trips, offers, destinations, features, promotions, or other BackBySunday services.",
    ],
  },
  {
    title: "13. How We Share Personal Data",
    paragraphs: [
      "BackBySunday does not sell personal data to advertisers or data brokers.",
      "When you book a trip, we may share relevant traveller information with Operators, guides, trip leaders, accommodation providers, transport providers, emergency responders, or other persons involved in delivering the booked experience. This may include names, participant details, age where relevant, contact information, emergency contact details, pickup or meeting information, booking information, safety or medical information where necessary, and other information reasonably required for the booked experience.",
      "Operators, guides, trip leaders, and other travel service providers are expected to use traveller information only for legitimate purposes connected with the trip, safety, legal obligations, emergency response, and operational fulfilment.",
      "Emergency contact information may be accessed by BackBySunday and may be shared with the relevant Operator, guide, trip leader, emergency responder, or support personnel where reasonably necessary for safety, emergency response, trip coordination, or incident management.",
      "Transaction-related information may be shared with Cashfree Payments, banks, payment networks, or payment service providers to process payments, payouts, refunds, reconciliation, fraud checks, disputes, and related services.",
      "We use third-party service providers to operate our technology infrastructure. Our current backend and database infrastructure includes Supabase. We may also engage hosting, cloud storage, authentication, email, communication, analytics, monitoring, customer-support, security, and other technology providers where necessary to operate BackBySunday.",
      "We may disclose information to professional advisers, insurers, government authorities, law-enforcement authorities, courts, regulators, or other parties where required by applicable law, valid legal process, safety needs, fraud investigation, cyber incident response, or enforcement of our policies.",
      "If BackBySunday is incorporated, reorganized, merged, acquired, financed, sells substantially all or part of its business or assets, or otherwise undergoes a corporate transaction, relevant information may be transferred as part of that transaction, subject to applicable law and appropriate safeguards.",
    ],
  },
  {
    title: "14. Data Retention",
    paragraphs: [
      "We retain personal data for as long as reasonably necessary for the purposes described in this Privacy Policy, including providing the Platform, maintaining accounts, managing bookings, fulfilling trips, meeting legal or accounting requirements, resolving disputes, preventing fraud, preserving safety records, and enforcing agreements.",
      "Account data is generally retained while the account is active. Booking, payment, tax, accounting, refund, cancellation, dispute, safety, and fraud-prevention records may be retained for longer where reasonably necessary. Support messages may be retained while needed to resolve issues and maintain appropriate records. Marketing preferences may be retained until opt-out, deletion, or replacement by a newer preference record. Analytics data is retained according to the relevant tool settings and business needs.",
      "Uploaded identity documents may be retained for as long as reasonably necessary for verification, fraud prevention, legal compliance, dispute handling, safety, or booking-related requirements. Where continued storage of the full document is no longer reasonably necessary, we will seek to delete, anonymize, or securely restrict the document while retaining limited verification status or metadata where appropriate.",
      "When personal data is no longer reasonably required, we will seek to delete, anonymize, or otherwise appropriately dispose of it in accordance with applicable law and our technical capabilities.",
    ],
  },
  {
    title: "15. Account Data Deletion And Withdrawal",
    paragraphs: [
      "You may request deletion of your BackBySunday account, uploaded identity documents, or associated personal data by contacting hello.backbysunday@gmail.com with the subject line Account Deletion Request or Document Deletion Request, as applicable.",
      "We may need to verify your identity before processing a deletion request. Upon verification, we will take reasonable steps to delete or anonymize personal data that is no longer required.",
      "Certain information may remain retained where required or permitted by applicable law, including records relating to completed transactions, refunds, disputes, fraud prevention, safety incidents, regulatory requirements, or legal obligations.",
      "Withdrawal of consent will not necessarily affect processing that occurred lawfully before withdrawal. If certain information is necessary to provide a service, withdrawing consent or requesting deletion may prevent us from providing that functionality or may remove verified-profile status.",
      "As our Platform develops, we may also provide an account-deletion option directly within the website or application.",
    ],
  },
  {
    title: "16. Your Privacy Rights And Choices",
    paragraphs: [
      "Subject to applicable law, you may have rights relating to your personal data, including the ability to request information about personal data being processed, request correction or updating of inaccurate information, request deletion or erasure where applicable, withdraw consent where processing is based on consent, raise a grievance, and exercise other rights provided under applicable law.",
      "If certain information is necessary to provide a service, withdrawing consent or requesting deletion may prevent us from continuing to provide that particular functionality or service.",
      "Privacy requests may be sent to hello.backbysunday@gmail.com. We will make reasonable efforts to review and respond to privacy requests and grievances within the time required by applicable law.",
    ],
  },
  {
    title: "17. Security Of Personal Data",
    paragraphs: [
      "We use reasonable administrative, technical, and organizational safeguards designed to protect personal data against unauthorized access, disclosure, alteration, misuse, loss, or destruction.",
      "These measures may include access controls, authentication mechanisms, secure network communication, encryption where appropriate, restricted administrative access, monitoring, backups, and security practices implemented by our infrastructure and payment providers.",
      "No website, application, database, network, or electronic transmission method can be guaranteed to be completely secure. Users are responsible for protecting their account credentials and should notify BackBySunday promptly if they suspect unauthorized access to their account.",
    ],
  },
  {
    title: "18. Children And Minors",
    paragraphs: [
      "BackBySunday accounts are intended for individuals aged 18 years or older. Persons under 18 should not independently create an account or make a booking.",
      "A minor may participate in certain trips or experiences where permitted by the relevant Operator and applicable law, provided that the booking and necessary authorization are completed by a parent or legal guardian. Where information about a minor is required for a permitted booking, the parent or guardian providing such information represents that they are authorized to do so.",
      "Some adventure or trekking experiences may impose different minimum or maximum age requirements based on safety, difficulty, Operator policy, destination rules, or applicable law. Such requirements will be communicated where applicable.",
      "BackBySunday does not intend to direct targeted advertising to children or conduct behavioral monitoring of children.",
    ],
  },
  {
    title: "19. Third Party Websites Services And International Processing",
    paragraphs: [
      "The Platform may contain links to third-party websites, applications, social-media services, maps, Operators, payment providers, or other services not controlled by BackBySunday. This Privacy Policy does not govern independent processing performed by those third parties.",
      "We encourage users to review the privacy policies and terms of third-party services before providing information to them.",
      "Some technology or service providers used by BackBySunday may process or store information using infrastructure located outside your state or outside India. Where personal data is transferred or processed internationally, we will seek to do so in accordance with applicable Indian law and any applicable restrictions or safeguards.",
    ],
  },
  {
    title: "20. Changes To This Privacy Policy",
    paragraphs: [
      "We may revise this Privacy Policy from time to time to reflect changes in the Platform, business practices, technology, Service Providers, or applicable laws.",
      "When material changes are made, we will update the Last Updated date at the beginning of this Privacy Policy and provide additional notice where required by applicable law.",
      "Continued use of the Platform following an update will be handled in accordance with applicable law, including any requirement to obtain fresh consent where necessary.",
    ],
  },
  {
    title: "21. Grievances And Contact Us",
    paragraphs: [
      "If you have a question, complaint, privacy concern, request for correction or deletion, or other issue regarding our handling of personal data, please contact BackBySunday.",
      "Privacy / Grievance Contact: BackBySunday, Pune, Maharashtra, India. Email: hello.backbysunday@gmail.com. Website: backbysunday.in.",
      "Once BackBySunday is formally incorporated or appoints a designated Grievance Officer, privacy contact, or other responsible person, this section will be updated with the relevant legal entity, registered office, and contact details.",
    ],
  },
];

const summaryItems = [
  "Account, booking, payment, support, technical, and Operator onboarding data",
  "Optional government ID upload for verified-profile status",
  "Basic medical, safety, emergency contact, and trip eligibility information",
  "Location access for nearby discovery, pickup coordination, and trek safety",
  "WhatsApp, SMS, email, push, and similar service or marketing communications",
  "Public reviews, ratings, photos, videos, and trip media where the feature permits it",
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative isolate min-h-[100svh] overflow-x-hidden bg-[#f7f5ef] text-[#101010]">
      <section className="relative bg-[#101010] text-white">
        <Image
          src="/Banner/ChatGPT%20Image%20Sep%2010%2C%202026%2C%2012_50_11%20PM.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,16,0.88),rgba(16,16,16,0.62)_48%,rgba(16,16,16,0.72)),linear-gradient(180deg,rgba(16,16,16,0.42),rgba(16,16,16,0.78))]" />
        <header className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pt-6 md:pt-8 lg:px-8 xl:pt-10">
          <Navbar bookNowVariant="trekDetails" />
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-7 px-4 pb-14 pt-20 sm:px-6 sm:pb-18 sm:pt-24 lg:px-8 lg:pb-20">
          <div className="flex flex-col gap-4">
            <p className="font-urbanist text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
              BackBySunday
            </p>
            <h1 className="max-w-3xl font-urbanist text-[clamp(2.4rem,7vw,5.25rem)] font-semibold leading-[0.95] tracking-normal">
              Privacy Policy
            </h1>
            <p className="max-w-3xl font-urbanist text-base font-medium leading-7 text-white/76 sm:text-lg">
              This policy explains how BackBySunday collects, uses, stores,
              shares, and protects personal data for account, booking,
              verification, safety, payment, communication, location, and
              marketplace operations.
            </p>
          </div>

          <dl className="grid gap-3 border-t border-white/16 pt-5 font-urbanist text-sm font-medium text-white/74 sm:grid-cols-2">
            <div>
              <dt className="text-white/46">Effective Date</dt>
              <dd className="mt-1 text-white">{updatedDate}</dd>
            </div>
            <div>
              <dt className="text-white/46">Last Updated</dt>
              <dd className="mt-1 text-white">{updatedDate}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(230px,300px)_minmax(0,1fr)] lg:px-8 lg:py-14">
        <aside className="h-fit lg:sticky lg:top-6">
          <div className="flex flex-col gap-5 rounded-lg border border-[#dad5ca] bg-white p-5 shadow-[0_18px_60px_rgba(16,16,16,0.06)]">
            <div>
              <h2 className="font-urbanist text-lg font-semibold leading-tight">
                Policy Summary
              </h2>
              <p className="mt-2 font-urbanist text-sm font-medium leading-6 text-[#5e5e5e]">
                This summary is only a guide. The full Privacy Policy controls.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {summaryItems.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 font-urbanist text-sm font-medium leading-5 text-[#303030]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6f8f6b]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className="rounded-lg border border-[#dad5ca] bg-white px-5 py-6 shadow-[0_18px_60px_rgba(16,16,16,0.06)] sm:px-8 sm:py-8 lg:px-10">
          <div className="flex flex-col gap-8">
            {sections.map((section) => (
              <section key={section.title} className="scroll-mt-8">
                <h2 className="font-urbanist text-xl font-semibold leading-tight text-[#101010] sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-urbanist text-sm font-medium leading-7 text-[#4c4c4c] sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
