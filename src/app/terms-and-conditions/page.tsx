import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Terms & Conditions | BackBySunday",
  description:
    "BackBySunday Terms & Conditions for marketplace bookings, Operators, payments, cancellations, traveller responsibilities, trekking risk, and platform use.",
  keywords: [
    "BackBySunday terms and conditions",
    "travel marketplace terms",
    "trek booking terms",
    "travel operator terms",
    "weekend trip booking terms",
  ],
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

const updatedDate = "10 September 2026";

const sections = [
  {
    title: "1. About BackBySunday",
    paragraphs: [
      "BackBySunday is a travel and trekking discovery and booking platform designed primarily for short-duration travel experiences, trekking experiences, adventure activities, stays, weekend escapes, and related travel services.",
      "BackBySunday is currently operating as an unregistered venture based in Pune, Maharashtra, India. References in these Terms to BackBySunday, we, us, or our refer to the operators of the BackBySunday Platform.",
      "The Platform may enable users to discover, compare, and book services offered by participating third-party travel operators, trekking companies, guides, accommodation providers, transport providers, and other service providers.",
      "Unless expressly stated otherwise for a particular service, BackBySunday acts as a marketplace and booking facilitator connecting users with Operators. The actual travel, trekking, transportation, accommodation, activity, guide, or other trip-related service may be provided by the relevant Operator rather than directly by BackBySunday.",
      "BackBySunday may independently verify, review, moderate, or approve Operators before permitting them to list services on the Platform. However, such verification does not guarantee that an Operator, trip, or experience will be entirely free from risk, delay, disruption, or other operational issues.",
    ],
  },
  {
    title: "2. Acceptance Of These Terms",
    paragraphs: [
      "These Terms & Conditions govern your access to and use of backbysunday.in, the BackBySunday web platform, any mobile applications that may be introduced in the future, and all related services, features, booking facilities, communications, and offerings provided through BackBySunday.",
      "By accessing, creating an account on, making a booking through, or otherwise using the Platform, you agree to be bound by these Terms, our Privacy Policy, Cancellation & Refund Policy, and any trip-specific terms, safety requirements, Operator policies, or other conditions clearly disclosed to you before booking.",
      "If you do not agree to these Terms, please do not use the Platform.",
    ],
  },
  {
    title: "3. Eligibility",
    paragraphs: [
      "You must generally be at least 18 years old and legally capable of entering into a binding agreement to create a BackBySunday account or independently make a booking.",
      "Persons under 18 years of age may participate in trips only where the particular trip permits minors, the booking is made by a parent or legal guardian, any required parental or guardian consent is provided, and all applicable safety, age, Operator, and legal requirements are satisfied.",
      "Certain treks or adventure activities may impose higher or lower age restrictions based on difficulty, safety, destination requirements, or Operator policies.",
      "By using the Platform, you represent that the information you provide is accurate and that you are legally entitled to use the Platform.",
    ],
  },
  {
    title: "4. User Accounts",
    paragraphs: [
      "Some Platform features may require account registration. You may be able to register using email and password, Google authentication, phone OTP, or other authentication methods offered by BackBySunday.",
      "You are responsible for providing accurate and current account information, maintaining the confidentiality of your account credentials, restricting unauthorized access to your account, promptly updating information that changes, and notifying BackBySunday if you suspect unauthorized account access.",
      "You are responsible for activity conducted through your account unless such activity results directly from circumstances for which applicable law places responsibility on BackBySunday.",
      "We may suspend, restrict, or terminate accounts where we reasonably believe there is fraud, abuse, impersonation, unauthorized activity, repeated policy violations, safety risk, or unlawful conduct.",
    ],
  },
  {
    title: "5. Traveller Information",
    paragraphs: [
      "To make or fulfil a booking, you may be required to provide traveller information including name, age or date of birth, mobile number, email address, emergency contact details, pickup or meeting information, identity information, and trip-specific safety details.",
      "If you make a booking for another traveller, you represent that you are authorized to provide their information, the information provided is accurate to the best of your knowledge, the traveller has been informed of the relevant booking conditions, and where required, the traveller has agreed to the applicable policies and trip requirements.",
      "Providing inaccurate traveller information may result in booking rejection, check-in failure, denial of participation, safety risk, or cancellation where the information is material to the trip.",
    ],
  },
  {
    title: "6. Operator Listings",
    paragraphs: [
      "Operators are responsible for providing accurate and up-to-date information about their services.",
      "Trip listings may include destination, duration, itinerary, difficulty level, departure and return time, meeting or pickup point, accommodation, transport, meals, inclusions and exclusions, group size, eligibility requirements, permits, required equipment, photographs, pricing, available dates, cancellation rules, safety information, and Operator details.",
      "BackBySunday may review or moderate listings, but Operators remain responsible for the accuracy of information they provide.",
      "Where BackBySunday becomes aware of materially inaccurate, deceptive, or unsafe listing information, we may modify, suspend, or remove the relevant listing or Operator.",
    ],
  },
  {
    title: "7. Booking Process",
    paragraphs: [
      "A booking generally involves selecting a trip or experience, selecting an available date or slot, providing traveller information, reviewing the booking summary and applicable terms, completing payment, and receiving a booking confirmation.",
      "Submitting payment does not necessarily mean the booking has been finally confirmed until the Platform displays or sends a confirmation.",
      "Where a booking cannot be confirmed after payment due to inventory, technical, Operator, or other issues, BackBySunday will take reasonable steps to arrange an appropriate refund, alternative booking, or other resolution.",
      "Users should review all trip details before making payment.",
    ],
  },
  {
    title: "8. Pricing",
    paragraphs: [
      "Trip prices displayed on BackBySunday may include or exclude certain taxes, platform charges, transaction charges, convenience charges, or other fees depending on the applicable listing.",
      "Before final payment, the Platform will seek to display the amount payable by the user and relevant charges applicable to the booking.",
      "Prices may vary based on date, demand, number of participants, accommodation type, transport, activity selections, Operator pricing, promotional offers, or other trip-specific factors.",
      "Once a booking has been confirmed, pricing for that booking will normally be governed by the amount and terms shown at checkout unless there has been an obvious pricing error, fraud, or another circumstance permitted by applicable law.",
    ],
  },
  {
    title: "9. Payments",
    paragraphs: [
      "Payments may be processed through third-party payment providers, including Cashfree Payments.",
      "Payment methods available may include UPI, cards, net banking, wallets, or other methods supported by the relevant payment provider.",
      "BackBySunday does not intend to directly store complete card numbers, CVV values, UPI PINs, banking passwords, or equivalent payment authentication credentials.",
      "Third-party payment providers may independently apply their own terms, privacy policies, security controls, and processing rules.",
      "If a payment is debited but the booking is not confirmed, users should contact BackBySunday support with the relevant transaction details. Payment failures, bank delays, gateway downtime, or transaction reversals may occasionally occur outside BackBySunday's direct control.",
    ],
  },
  {
    title: "10. Booking Confirmation",
    paragraphs: [
      "A booking is considered confirmed when BackBySunday provides a booking confirmation through the Platform, email, SMS, WhatsApp, or another designated communication method.",
      "Users are responsible for checking traveller names, dates, destination, departure time, return time, pickup or meeting point, number of travellers, amount paid, and any special trip conditions.",
      "Any discrepancy should be reported promptly.",
    ],
  },
  {
    title: "11. Cancellation Refunds And Rescheduling",
    paragraphs: [
      "All cancellations, refunds, rescheduling requests, no-shows, and related matters are governed by the BackBySunday Cancellation & Refund Policy together with any trip-specific cancellation conditions clearly disclosed before booking.",
      "The applicable policy may depend on how far in advance the cancellation occurs, Operator commitments already made, accommodation or transport reservations, permit costs, non-refundable third-party charges, weather or safety conditions, minimum group size, force majeure events, or other trip-specific circumstances.",
      "Where an Operator cancels a trip, users may be eligible for a refund, rescheduling, platform credit, or an alternative experience in accordance with the applicable Cancellation & Refund Policy.",
      "Refund processing times may depend partly on the relevant payment provider, bank, or payment network.",
    ],
  },
  {
    title: "12. Last Minute Bookings",
    paragraphs: [
      "BackBySunday may enable bookings at short notice, including bookings for trips departing the same day, the next day, or within a limited number of days.",
      "Last-minute bookings may have limited availability, shorter cancellation windows, additional verification requirements, restricted modification options, immediate Operator commitments, or different refund conditions.",
      "Any special conditions applicable to a last-minute booking should be reviewed carefully before payment. The availability of a listing does not guarantee that every requested last-minute booking can be fulfilled.",
    ],
  },
  {
    title: "13. Trip Itineraries",
    paragraphs: [
      "Trip itineraries are intended to provide a reasonable description of the planned experience.",
      "Actual itineraries may change because of weather, road conditions, traffic, natural events, local restrictions, government orders, safety concerns, transport delays, accommodation issues, participant condition, guide decisions, route closures, strikes, force majeure, or circumstances outside reasonable control.",
      "Where practical, BackBySunday or the Operator will seek to notify travellers about significant changes.",
      "Minor itinerary changes that do not materially alter the nature of the trip may not entitle a user to a refund. Material changes will be handled in accordance with the applicable booking and cancellation terms and consumer law.",
    ],
  },
  {
    title: "14. Departure And Return Times",
    paragraphs: [
      "Departure, pickup, activity, and return times shown on the Platform are estimates or scheduled times based on information available at the time of booking.",
      "Travel involves factors that may cause delays, including traffic, weather, road conditions, and operational circumstances.",
      "The name BackBySunday is a brand identity and should not be interpreted as an unconditional guarantee that every trip will physically return on Sunday. The actual scheduled return date and time for each trip will be displayed in the relevant trip details.",
      "Users should make appropriate arrangements before booking if they have strict onward travel, work, examination, medical, or other time-sensitive commitments following a trip.",
    ],
  },
  {
    title: "15. Minimum Group Size",
    paragraphs: [
      "Certain trips may require a minimum number of participants.",
      "Where the minimum group size is not achieved, BackBySunday or the relevant Operator may cancel the trip, offer another departure date, offer an alternative trip, request an agreed price adjustment, or provide a refund in accordance with the Cancellation & Refund Policy.",
      "Any applicable minimum group requirement should be disclosed where relevant.",
    ],
  },
  {
    title: "16. Traveller Responsibilities",
    paragraphs: [
      "Travellers are responsible for arriving at the designated meeting or pickup point on time, carrying required identification, following safety instructions, providing accurate health and emergency information, carrying recommended clothing, equipment and medication, respecting local laws and customs, following guide and Operator instructions, avoiding dangerous or disruptive conduct, respecting other travellers, protecting personal belongings, and determining whether they are reasonably fit to participate in the selected trip.",
      "Where a traveller's conduct creates a material safety risk or substantially disrupts the trip, the Operator or BackBySunday may remove or refuse participation where reasonably necessary.",
      "Refunds may not be available where removal results from serious misconduct or violation of clearly disclosed safety requirements.",
    ],
  },
  {
    title: "17. Trekking And Adventure Risk",
    paragraphs: [
      "Travel, trekking, and adventure activities may involve inherent risks. These may include uneven terrain, altitude, weather changes, wildlife, physical exertion, road travel, slips or falls, illness, remote locations, limited communications, natural hazards, and other risks associated with outdoor activities.",
      "BackBySunday and Operators will seek to apply reasonable safety practices appropriate to the experience. However, no travel or adventure activity can be made entirely risk-free.",
      "Users should review difficulty ratings, eligibility requirements, health recommendations, and safety instructions before booking.",
      "Participation in a trip does not waive any statutory rights that cannot lawfully be waived.",
    ],
  },
  {
    title: "18. Health And Medical Requirements",
    paragraphs: [
      "Certain trips may require travellers to provide relevant health or safety information.",
      "Travellers are responsible for accurately disclosing information where reasonably necessary for safe participation.",
      "BackBySunday and Operators may refuse or restrict participation where there is a reasonable safety concern or where a traveller does not meet clearly disclosed eligibility requirements.",
      "BackBySunday does not provide medical advice. Travellers should consult an appropriate healthcare professional where they are uncertain about their ability to participate in a particular trek or activity.",
    ],
  },
  {
    title: "19. Identity Verification",
    paragraphs: [
      "BackBySunday may offer optional identity verification for verified-profile status.",
      "Certain trips may separately require government-issued identification for permits, accommodation, transport, check-in, insurance, safety, or legal reasons.",
      "Where identity verification is mandatory for a particular booking, this will be disclosed where practical before completion of the booking.",
      "Information relating to identity documents will be handled in accordance with our Privacy Policy.",
    ],
  },
  {
    title: "20. Location And GPS",
    paragraphs: [
      "Certain Platform features or trips may request access to location information for nearby trip discovery, pickup coordination, route support, trip management, safety, emergency response, or guide coordination.",
      "Travellers may be encouraged or required to keep GPS or location services enabled during particular trekking or adventure activities where reasonably necessary for safety.",
      "Location functionality should not be relied upon as a replacement for emergency services, guides, or appropriate outdoor safety practices.",
    ],
  },
  {
    title: "21. Operator Responsibilities",
    paragraphs: [
      "Operators using BackBySunday are expected to provide truthful and accurate listing information, hold licences, registrations, or permissions required for their operations where applicable, provide the services booked by travellers, follow reasonable safety standards, communicate material changes, comply with applicable laws, treat travellers fairly, protect traveller information, cooperate with legitimate complaints and disputes, and comply with BackBySunday's Operator policies.",
      "BackBySunday may investigate complaints and may suspend or remove Operators where reasonably justified.",
    ],
  },
  {
    title: "22. Relationship Between BackBySunday And Operators",
    paragraphs: [
      "Unless expressly stated otherwise, Operators are independent third-party service providers.",
      "Nothing in these Terms automatically creates an employment, partnership, agency, franchise, or joint-venture relationship between BackBySunday and an Operator.",
      "BackBySunday facilitates discovery, booking, payments, communication, trust and safety functions, and marketplace administration. Operators remain responsible for actually delivering the services they list.",
      "This distinction does not limit any responsibility that applicable law independently imposes on BackBySunday as an e-commerce entity or marketplace.",
    ],
  },
  {
    title: "23. Reviews And User Content",
    paragraphs: [
      "Users may be able to publish reviews, ratings, photographs, videos, comments, or other content.",
      "By submitting content, you confirm that you have the right to submit it, it is not knowingly false or misleading, it does not unlawfully infringe another person's rights, it does not contain unlawful, abusive, or malicious content, and any identifiable persons appearing in uploaded media have been appropriately considered as required by applicable law.",
      "BackBySunday may moderate, restrict, or remove content that violates Platform rules or applicable law.",
      "Submitting content may grant BackBySunday a non-exclusive licence to host, reproduce, and display it as necessary to operate the Platform, subject to our Privacy Policy and applicable permissions.",
      "Any broader promotional use of identifiable traveller media will be handled in accordance with our Privacy Policy and applicable consent requirements.",
    ],
  },
  {
    title: "24. Prohibited Use",
    paragraphs: [
      "You must not use BackBySunday to commit fraud, make fraudulent bookings, impersonate another person, misuse payment systems, interfere with Platform security, scrape or extract Platform data without authorization, upload malicious software, harass Operators or other users, submit fake reviews, circumvent booking fees or Platform systems, use the Platform for unlawful purposes, or violate intellectual-property or privacy rights.",
      "We may take reasonable action against misuse, including suspension, cancellation, restriction, or reporting unlawful conduct to appropriate authorities.",
    ],
  },
  {
    title: "25. Intellectual Property",
    paragraphs: [
      "The BackBySunday name, logo, visual identity, Platform design, software, text, graphics, photographs, interfaces, databases, trademarks, and other original content owned by BackBySunday are protected by applicable intellectual-property laws.",
      "Users may not reproduce, distribute, modify, commercially exploit, or create derivative works from BackBySunday-owned content without authorization, except where permitted by law.",
      "Operator-provided content may remain owned by the relevant Operator or its licensors.",
    ],
  },
  {
    title: "26. Promotions And Discount Codes",
    paragraphs: [
      "BackBySunday may offer promotional codes, credits, discounts, referral benefits, or other promotional offers.",
      "Such promotions may have validity periods, minimum booking values, trip restrictions, user eligibility conditions, usage limits, or other specific terms.",
      "Promotions cannot normally be exchanged for cash unless expressly stated. BackBySunday may cancel or restrict promotional benefits in cases of fraud, misuse, or obvious system error.",
    ],
  },
  {
    title: "27. Communications",
    paragraphs: [
      "By using BackBySunday, you agree that we may send necessary service communications relating to bookings, payments, refunds, cancellations, itinerary changes, safety, account security, support, and other operational matters.",
      "Promotional communications will be handled separately according to the Privacy Policy and applicable consent preferences.",
    ],
  },
  {
    title: "28. Third Party Services",
    paragraphs: [
      "The Platform may rely on third-party services including Cashfree Payments, Supabase, mapping providers, Google authentication, communication providers, analytics tools, accommodation providers, transport providers, and Operators.",
      "BackBySunday is not responsible for independent third-party websites or services outside our control. Users should review applicable third-party terms where appropriate.",
    ],
  },
  {
    title: "29. Service Availability And Accuracy",
    paragraphs: [
      "We aim to keep the Platform reasonably available, but we do not guarantee uninterrupted or error-free access.",
      "The Platform may occasionally be unavailable because of maintenance, technical failure, third-party outages, cyber incidents, infrastructure issues, upgrades, force majeure, or other circumstances. We may modify, suspend, or discontinue features where reasonably necessary.",
      "We seek to maintain accurate information. However, occasional errors may occur in pricing, availability, photographs, trip descriptions, departure times, Operator information, or other Platform content.",
      "Where a material error affects a booking, BackBySunday will seek to provide an appropriate resolution consistent with applicable law.",
    ],
  },
  {
    title: "30. Liability",
    paragraphs: [
      "Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited under applicable law.",
      "To the extent permitted by law, BackBySunday will not be liable for indirect, incidental, special, or consequential losses arising from circumstances outside our reasonable control.",
      "Because many services are provided by independent Operators, BackBySunday is not automatically responsible for every act or omission of an Operator. However, this does not remove any responsibility imposed on BackBySunday under applicable consumer, e-commerce, privacy, or other law.",
      "Users retain all mandatory statutory consumer rights.",
    ],
  },
  {
    title: "31. Personal Belongings",
    paragraphs: [
      "Travellers are responsible for reasonable care of their personal belongings during trips.",
      "BackBySunday and Operators are not responsible for loss, theft, or damage to personal property except where responsibility arises under applicable law or results from proven negligence or misconduct attributable to the relevant party.",
      "Travellers should avoid carrying unnecessary valuables.",
    ],
  },
  {
    title: "32. Force Majeure",
    paragraphs: [
      "BackBySunday or an Operator may be unable to perform part or all of a booking because of circumstances beyond reasonable control. These may include extreme weather, natural disasters, landslides, floods, earthquakes, government restrictions, political disturbances, strikes, epidemics or pandemics, road closures, transport disruption, acts of terrorism, civil unrest, network failures, or comparable events.",
      "Where such circumstances affect a trip, BackBySunday will seek to work with the Operator and traveller toward a reasonable solution in accordance with the applicable cancellation/refund policy and law.",
    ],
  },
  {
    title: "33. Complaints And Grievance Redressal",
    paragraphs: [
      "If you have a complaint regarding a booking, Operator, payment, refund, trip experience, Platform issue, or these Terms, please contact BackBySunday, Pune, Maharashtra, India. Email: hello.backbysunday@gmail.com. Website: backbysunday.in.",
      "Please provide the relevant booking ID or transaction details where applicable.",
      "We will make reasonable efforts to acknowledge, investigate, and resolve complaints in accordance with applicable law.",
      "After incorporation or appointment of a designated Grievance Officer, this section will be updated with the appropriate legal entity, registered office, and grievance-contact details.",
    ],
  },
  {
    title: "34. Privacy",
    paragraphs: [
      "Personal data collected through the Platform is handled in accordance with the BackBySunday Privacy Policy.",
      "The Privacy Policy forms part of the framework governing your use of BackBySunday.",
    ],
  },
  {
    title: "35. Changes To These Terms",
    paragraphs: [
      "We may update these Terms to reflect changes in our services, business model, Platform functionality, Operators, legal requirements, or operational practices.",
      "The revised Terms will display an updated Last Updated date. Where required by applicable law, we will provide additional notice or obtain renewed acceptance for material changes.",
    ],
  },
  {
    title: "36. Suspension And Termination",
    paragraphs: [
      "BackBySunday may suspend or terminate access to the Platform where reasonably necessary because of fraud, unlawful conduct, material breach of these Terms, serious safety concerns, payment abuse, harassment, repeated misconduct, or risk to the Platform or other users.",
      "Users may stop using the Platform at any time and may request account deletion in accordance with our Privacy Policy.",
      "Termination does not automatically erase rights or obligations relating to completed bookings, payments, refunds, disputes, or legal requirements.",
    ],
  },
  {
    title: "37. Governing Law And Jurisdiction",
    paragraphs: [
      "These Terms are governed by the laws of India.",
      "Subject to mandatory consumer-law rights and any dispute-resolution forum that cannot lawfully be excluded, disputes relating to these Terms or the Platform will be subject to the jurisdiction of competent courts in Pune, Maharashtra, India.",
      "Nothing in this provision prevents a consumer from exercising any jurisdictional right available under applicable consumer law.",
    ],
  },
  {
    title: "38. Severability No Waiver And Entire Agreement",
    paragraphs: [
      "If any provision of these Terms is found to be invalid, unlawful, or unenforceable, the remaining provisions will continue to apply to the extent permitted by law.",
      "A failure by BackBySunday to enforce a provision of these Terms on one occasion does not constitute a waiver of that provision or our right to enforce it later.",
      "These Terms, together with the Privacy Policy, Cancellation & Refund Policy, booking confirmation, trip-specific conditions, and any other terms expressly incorporated into a booking, form the agreement governing use of the relevant BackBySunday services.",
      "Where a trip-specific condition conflicts with these general Terms, the trip-specific condition will apply to that booking only to the extent the difference was clearly disclosed before booking and is permitted by applicable law.",
    ],
  },
  {
    title: "39. Contact Us",
    paragraphs: [
      "For questions about these Terms, contact BackBySunday, Pune, Maharashtra, India. Website: backbysunday.in. Email: hello.backbysunday@gmail.com.",
      "BackBySunday is currently not incorporated as a separate legal entity. Following incorporation, this section and these Terms will be updated with the applicable legal entity name, registered office, and statutory contact information.",
    ],
  },
];

const summaryItems = [
  "BackBySunday is generally a marketplace and booking facilitator",
  "Operators remain responsible for delivering listed trips and services",
  "Bookings are confirmed only after BackBySunday issues confirmation",
  "Cancellations and refunds are governed by a separate policy",
  "Treks and adventure activities carry inherent travel and safety risks",
  "The BackBySunday name is not a guaranteed Sunday return promise",
];

export default function TermsAndConditionsPage() {
  const siteUrl = "https://backbysunday.in";
  const pageUrl = `${siteUrl}/terms-and-conditions`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions",
    url: pageUrl,
    description: metadata.description,
    dateModified: "2026-09-10",
    isPartOf: {
      "@type": "WebSite",
      name: "BackBySunday",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "BackBySunday",
      url: siteUrl,
      logo: `${siteUrl}/Hero/hero-logo.png`,
    },
  };

  return (
    <main className="relative isolate min-h-[100svh] overflow-x-hidden bg-[#f7f5ef] text-[#101010]">
      <JsonLd data={jsonLd} />
      <section className="relative bg-[#101010] text-white">
        <Image
          src="/Banner/Banner.png"
          alt="BackBySunday mountain travel banner"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,16,0.88),rgba(16,16,16,0.62)_48%,rgba(16,16,16,0.72)),linear-gradient(180deg,rgba(16,16,16,0.42),rgba(16,16,16,0.78))]" />
        <header className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pt-6 md:pt-8 lg:px-8 xl:pt-10">
          <Navbar />
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-7 px-4 pb-14 pt-20 sm:px-6 sm:pb-18 sm:pt-24 lg:px-8 lg:pb-20">
          <div className="flex flex-col gap-4">
            <p className="font-urbanist text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
              BackBySunday
            </p>
            <h1 className="max-w-4xl font-urbanist text-[clamp(2.25rem,6.5vw,5rem)] font-semibold leading-[0.96] tracking-normal">
              Terms &amp; Conditions
            </h1>
            <p className="max-w-3xl font-urbanist text-base font-medium leading-7 text-white/76 sm:text-lg">
              These Terms govern use of the BackBySunday Platform, bookings,
              Operator services, payments, traveller responsibilities, trekking
              risks, and marketplace rules.
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
                Terms Summary
              </h2>
              <p className="mt-2 font-urbanist text-sm font-medium leading-6 text-[#5e5e5e]">
                This summary is only a guide. The full Terms control.
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
