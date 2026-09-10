import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | BackBySunday",
  description:
    "BackBySunday Cancellation & Refund Policy for marketplace trips, Operator-led refund eligibility, rescheduling, no-shows, failed payments, and refund processing.",
  keywords: [
    "BackBySunday cancellation policy",
    "BackBySunday refund policy",
    "travel booking cancellation",
    "trek refund policy",
    "travel marketplace refund",
    "weekend trip cancellation policy",
  ],
  alternates: {
    canonical: "/cancellation-and-refund-policy",
  },
};

const updatedDate = "10 September 2026";

const sections = [
  {
    title: "1. General Principle",
    paragraphs: [
      "BackBySunday primarily operates as a marketplace and booking facilitator connecting users with third-party travel operators, trekking companies, organizers, guides, accommodation providers, transport providers, and other service providers.",
      "Unless BackBySunday expressly states otherwise for a particular booking, the cancellation and refund conditions applicable to a trip are determined by the relevant Operator or Organizer.",
      "Different trips may therefore have different cancellation windows, refund percentages, non-refundable periods, rescheduling options, cancellation fees, credit policies, minimum group-size conditions, and special terms.",
      "Users should carefully review the cancellation and refund terms displayed on the relevant trip page and during checkout before completing a booking.",
    ],
  },
  {
    title: "2. Role Of BackBySunday",
    paragraphs: [
      "BackBySunday facilitates bookings, payments, communications, support, and refund processing between users and Operators.",
      "BackBySunday generally does not independently determine whether an Operator-provided trip qualifies for a refund. Eligibility for a refund, partial refund, rescheduling, or travel credit will ordinarily depend on the relevant Operator's cancellation policy, the specific terms disclosed for the booked trip, the reason and timing of cancellation, third-party commitments already made by the Operator, and applicable law.",
      "Where an Operator confirms that a user is eligible for a refund, BackBySunday will seek to process and facilitate that refund promptly through the applicable payment system.",
      "BackBySunday will not ordinarily be required to provide a refund from its own funds where the relevant Operator has validly determined that the booking is non-refundable under clearly disclosed trip conditions, except where applicable law requires otherwise.",
    ],
  },
  {
    title: "3. Trip Specific Cancellation Policies",
    paragraphs: [
      "Each Operator may establish its own cancellation and refund policy for its trips.",
      "Before completing payment, users should be able to view the applicable cancellation conditions for the selected booking. These conditions may specify whether the booking is refundable, how much may be refunded, the cancellation deadline, any cancellation charge, whether platform or payment-related charges are refundable, whether the booking may be rescheduled, whether travel credit may be offered, and circumstances where no refund will be provided.",
      "The cancellation terms displayed for the booking at the time the booking is made will generally govern that booking, subject to applicable law.",
    ],
  },
  {
    title: "4. User Initiated Cancellation",
    paragraphs: [
      "If you wish to cancel a booking, you should submit the cancellation request through the Platform where that functionality is available or contact BackBySunday support at hello.backbysunday@gmail.com.",
      "Please provide your booking ID, traveller name, registered contact details, booked trip, travel date, and reason for cancellation where requested.",
      "BackBySunday will review the request against the cancellation policy provided by the relevant Operator. Submitting a cancellation request does not automatically mean that a refund will be approved.",
      "The applicable Operator may determine that the booking is eligible for a full refund, partial refund, rescheduling, travel credit, or no refund, depending on the applicable trip policy.",
    ],
  },
  {
    title: "5. Full Refunds",
    paragraphs: [
      "A full refund will ordinarily be provided only where the applicable Operator or Organizer approves a full refund under the relevant booking policy or where applicable law requires one.",
      "Examples may include situations where the Operator cancels the trip and offers a full refund, the Operator cannot provide the booked service, the booking cannot be confirmed, a specific trip policy expressly provides a full refund, or applicable law requires repayment.",
      "Where the Operator authorizes a full refund, BackBySunday will seek to facilitate the refund for the approved refundable amount promptly.",
    ],
  },
  {
    title: "6. Partial Refunds",
    paragraphs: [
      "Some Operator policies may provide only a partial refund.",
      "This may occur where the Operator has already incurred non-refundable expenses such as accommodation deposits, vehicle or transport reservations, permits, activity fees, guide commitments, campsite bookings, entry fees, third-party reservations, or other trip-related costs.",
      "Where the Operator approves a partial refund, BackBySunday will process the amount authorized under the applicable policy. BackBySunday does not ordinarily determine the percentage independently.",
    ],
  },
  {
    title: "7. Non Refundable Bookings",
    paragraphs: [
      "Some trips may be designated as non-refundable or may become non-refundable after a specified deadline.",
      "This is particularly relevant to last-minute bookings, bookings made close to departure, limited-inventory trips, fixed transport arrangements, permit-based experiences, prepaid accommodation, special events, or bookings involving immediate third-party commitments.",
      "If a trip is non-refundable, that condition should be clearly displayed before booking where applicable. Users should review such conditions carefully before making payment.",
    ],
  },
  {
    title: "8. Last Minute Bookings",
    paragraphs: [
      "Because BackBySunday specializes in short-duration and spontaneous travel, some bookings may be made very close to departure.",
      "Last-minute bookings may have stricter cancellation conditions because Operators may immediately commit funds or inventory after confirmation.",
      "Depending on the Operator's policy, a booking made within a short period before departure may be partially refundable, non-refundable, eligible only for rescheduling, or eligible for credit instead of a cash refund.",
      "Any such condition should be disclosed during booking.",
    ],
  },
  {
    title: "9. Operator Or Organizer Cancellation",
    paragraphs: [
      "If an Operator cancels a trip, the remedy available to the traveller will depend on the Operator's applicable policy and the circumstances of cancellation.",
      "The Operator may offer a full refund, an alternative departure date, a replacement trip, platform or travel credit, or another reasonable option.",
      "Where the Operator confirms that a refund is due, BackBySunday will facilitate the refund through the relevant payment system.",
      "Users will not ordinarily be required to chase the Operator separately for payment processing once BackBySunday has received the Operator's refund authorization and the refundable funds or settlement arrangement permits processing.",
    ],
  },
  {
    title: "10. Weather Natural Events And Safety Cancellations",
    paragraphs: [
      "Travel and trekking activities may be affected by weather and circumstances outside the reasonable control of BackBySunday or an Operator. These may include heavy rain, snowfall, landslides, floods, road closures, unsafe trail conditions, government restrictions, natural disasters, transport disruption, local emergencies, or other safety concerns.",
      "If a trip is cancelled or materially changed because of such circumstances, the available remedy will ordinarily depend on the Operator's trip policy.",
      "Possible outcomes may include rescheduling, partial refund, full refund, travel credit, alternate itinerary, or no refund for already-incurred non-refundable costs.",
      "BackBySunday will communicate the Operator's decision and facilitate any refund or alternative approved under the applicable policy.",
    ],
  },
  {
    title: "11. Minimum Group Size Cancellations",
    paragraphs: [
      "Certain group trips may require a minimum number of participants.",
      "If the required group size is not reached, the Operator may operate the trip anyway, propose an additional charge with traveller consent, reschedule the trip, offer an alternative experience, issue travel credit, or cancel the trip.",
      "Where the Operator cancels and authorizes a refund, BackBySunday will facilitate the approved refund.",
    ],
  },
  {
    title: "12. Rescheduling",
    paragraphs: [
      "Some Operators may permit users to reschedule a trip instead of cancelling.",
      "Rescheduling may be subject to availability, notice period, price differences, rescheduling fees, Operator approval, seasonal pricing, or other trip-specific conditions.",
      "BackBySunday will facilitate rescheduling where the Operator's policy allows it. A request to reschedule is not guaranteed until confirmed.",
    ],
  },
  {
    title: "13. No Shows And Missed Departure",
    paragraphs: [
      "A traveller who fails to arrive at the designated pickup, meeting, check-in, or departure point at the required time may be treated as a no-show.",
      "No-show bookings are generally not refundable unless the applicable Operator policy provides otherwise.",
      "If a traveller misses a departure because of circumstances under their control, including late arrival, incorrect meeting-point interpretation, missing identification, failure to satisfy trip requirements, or failure to respond to Operator communications, the booking may be treated according to the Operator's no-show or cancellation policy.",
      "Refund entitlement is not guaranteed in these circumstances.",
    ],
  },
  {
    title: "14. Trip Changes",
    paragraphs: [
      "Operators may occasionally need to modify itinerary, route, accommodation, transport, guide, activity, pickup time, departure time, or other trip details.",
      "Minor operational modifications do not automatically create a right to a refund.",
      "If an Operator makes a material change to the core booked experience, the Operator will determine the available resolution subject to the trip policy and applicable law. BackBySunday will facilitate any approved refund, rescheduling, or alternative arrangement.",
    ],
  },
  {
    title: "15. Refund Processing By BackBySunday",
    paragraphs: [
      "Once the relevant Operator has approved a refund and BackBySunday has the ability to process the approved amount, BackBySunday will seek to initiate the refund as quickly as reasonably possible.",
      "Eligible refunds processed through the payment gateway will generally be returned to the original payment method, unless another method is agreed or required.",
      "There are two separate stages: refund approval and refund settlement. Refund approval is determined according to the Operator's cancellation and refund policy. Refund settlement is processed by BackBySunday and the payment provider after approval.",
      "BackBySunday will seek to make the settlement stage as seamless and prompt as reasonably possible.",
    ],
  },
  {
    title: "16. Refund Processing Time",
    paragraphs: [
      "Where a refund has been approved, BackBySunday will seek to initiate the eligible refund promptly after receiving the required approval and information.",
      "Once submitted to the payment gateway or banking system, settlement time may depend on Cashfree, the issuing bank, card network, UPI system, or other financial institution.",
      "Cashfree currently states that once a refund is initiated with the bank, it generally takes about 5 to 7 working days to reflect in the customer's account or card statement, although actual timelines may differ because multiple stakeholders are involved.",
    ],
  },
  {
    title: "17. Refund Method",
    paragraphs: [
      "Refunds will ordinarily be processed back to the payment method used for the original transaction.",
      "For example, card payments may return to the relevant card account, UPI payments may return through the applicable UPI-linked account, and net-banking payments may return through the applicable banking channel.",
      "Alternative refund methods may be used where technically necessary, agreed with the user, or required by the payment provider.",
    ],
  },
  {
    title: "18. Payment Gateway Failures",
    paragraphs: [
      "Where a payment is debited but the booking is not successfully confirmed because of a payment or technical failure, the transaction may be automatically reversed or refunded depending on the circumstances.",
      "Such payment failures are different from a voluntary cancellation of a confirmed trip.",
      "BackBySunday will assist users in resolving genuine payment discrepancies. Users may be asked to provide transaction ID, payment reference, booking reference, payment date, amount, and relevant screenshots or bank information.",
    ],
  },
  {
    title: "19. Platform Convenience Or Processing Fees",
    paragraphs: [
      "Whether platform, convenience, transaction, payment-processing, or similar fees are refundable may depend on the fee description shown at checkout, the Operator policy, the payment provider's charges, whether the booking was completed, and applicable law.",
      "BackBySunday will seek to clearly disclose material fees before payment. If a fee is designated as non-refundable, this should be disclosed before booking where applicable.",
    ],
  },
  {
    title: "20. Promotions Coupons Credits And Travel Credits",
    paragraphs: [
      "If a booking was made using promotional credit, coupon, discount code, referral benefit, wallet credit, or other promotional value, the refund treatment may differ from a normal cash payment.",
      "Where appropriate, promotional value may be restored as coupon credit, platform credit, original promotional value, or another equivalent benefit rather than being refunded as cash. The conditions of the relevant promotion will apply.",
      "Where an Operator offers travel credit instead of a monetary refund, the credit may be subject to conditions such as validity period, permitted trips, permitted Operators, transferability, minimum booking value, or redemption restrictions.",
      "Acceptance of travel credit instead of an otherwise available cash refund should be voluntary unless the booking terms or applicable law permit otherwise.",
    ],
  },
  {
    title: "21. Disputes Regarding Refund Eligibility",
    paragraphs: [
      "If a user disputes an Operator's refund decision, BackBySunday may assist as a marketplace intermediary by reviewing booking records, reviewing the applicable cancellation policy, obtaining information from the Operator, facilitating communication, and seeking a fair resolution.",
      "However, BackBySunday does not automatically have authority to override every Operator cancellation policy or compel an Operator to issue a refund where no refund obligation exists.",
      "This does not limit any statutory rights or remedies available to the consumer under applicable law.",
    ],
  },
  {
    title: "22. BackBySunday Marketplace Responsibility",
    paragraphs: [
      "BackBySunday seeks to provide a transparent and reliable booking experience.",
      "While cancellation and refund eligibility for Operator-provided services is generally based on the Operator's disclosed policy, BackBySunday will display or provide access to applicable cancellation terms, facilitate cancellation requests, communicate with Operators, communicate approved refund outcomes, process eligible refunds through the payment system, provide support for payment and refund issues, and handle grievances in accordance with applicable law.",
      "BackBySunday will not use the Operator relationship to avoid responsibilities that applicable consumer or e-commerce law independently places on BackBySunday.",
    ],
  },
  {
    title: "23. Refund Abuse Chargebacks And Payment Disputes",
    paragraphs: [
      "BackBySunday may investigate refund requests where there is reasonable suspicion of fraud, payment abuse, duplicate refund claims, false cancellation information, chargeback abuse, forged evidence, or misuse of Platform policies.",
      "Refunds may be withheld temporarily while legitimate fraud or payment investigations are underway, subject to applicable law.",
      "Users should contact BackBySunday before initiating a chargeback where a refund or payment issue can reasonably be resolved directly.",
      "Nothing in this section limits a user's legitimate rights through their bank, payment provider, regulator, or applicable law.",
    ],
  },
  {
    title: "24. Communication Of Refund Status",
    paragraphs: [
      "Where available, BackBySunday may provide refund updates through email, SMS, WhatsApp, Platform notifications, booking history, or customer support.",
      "Users should keep their registered contact information accurate.",
    ],
  },
  {
    title: "25. Exceptional Circumstances",
    paragraphs: [
      "BackBySunday and Operators may consider exceptional refund requests on a case-by-case basis. Examples may include serious emergencies or other extraordinary circumstances.",
      "Any discretionary exception does not create a permanent entitlement, does not require the same exception for future bookings, and does not modify the general Operator cancellation policy.",
    ],
  },
  {
    title: "26. Consumer Rights",
    paragraphs: [
      "Nothing in this Policy is intended to restrict or exclude any right or remedy that cannot lawfully be restricted under applicable Indian consumer law.",
      "Where applicable law requires a refund or other remedy regardless of an Operator's stated cancellation policy, the applicable legal requirement will prevail.",
    ],
  },
  {
    title: "27. Grievances And Support",
    paragraphs: [
      "For cancellation, refund, payment, or booking-related assistance, contact BackBySunday, Pune, Maharashtra, India. Website: backbysunday.in. Email: hello.backbysunday@gmail.com.",
      "Where possible, please include your booking ID and transaction reference.",
      "BackBySunday will make reasonable efforts to review and facilitate resolution of cancellation and refund grievances in accordance with applicable law.",
      "After incorporation or appointment of a designated Grievance Officer, this section will be updated with the appropriate legal entity and grievance contact information.",
    ],
  },
  {
    title: "28. Changes To This Policy",
    paragraphs: [
      "BackBySunday may update this Cancellation & Refund Policy from time to time to reflect changes to the Platform, payment systems, Operator arrangements, applicable law, business practices, or refund procedures.",
      "The latest version will display the updated Last Updated date.",
      "The cancellation policy applicable to an existing confirmed booking will generally remain the policy disclosed for that booking unless a change benefits the user or is required by applicable law.",
    ],
  },
  {
    title: "29. Contact Us",
    paragraphs: [
      "For questions regarding this Policy, contact BackBySunday, Pune, Maharashtra, India. Website: backbysunday.in. Email: hello.backbysunday@gmail.com.",
    ],
  },
];

const summaryItems = [
  "Organizer policy primarily decides refund eligibility",
  "BackBySunday facilitates cancellation requests and approved refunds",
  "Submitting a cancellation request does not guarantee a refund",
  "Last-minute and non-refundable trips may have stricter terms",
  "Approved refunds usually return to the original payment method",
  "Consumer rights under applicable law remain protected",
];

export default function CancellationAndRefundPolicyPage() {
  return (
    <main className="relative isolate min-h-[100svh] overflow-x-hidden bg-[#f7f5ef] text-[#101010]">
      <section className="relative bg-[#101010] text-white">
        <Image
          src="/Banner/Banner.png"
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
            <h1 className="max-w-4xl font-urbanist text-[clamp(2.15rem,6.2vw,4.8rem)] font-semibold leading-[0.96] tracking-normal">
              Cancellation &amp; Refund Policy
            </h1>
            <p className="max-w-3xl font-urbanist text-base font-medium leading-7 text-white/76 sm:text-lg">
              This Policy explains how cancellations, refunds, rescheduling,
              credits, payment failures, and booking adjustments are handled
              for trips booked through BackBySunday.
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
                Refund Summary
              </h2>
              <p className="mt-2 font-urbanist text-sm font-medium leading-6 text-[#5e5e5e]">
                This summary is only a guide. The full Policy controls.
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
