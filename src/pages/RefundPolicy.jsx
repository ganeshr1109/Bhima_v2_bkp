
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RefundPolicy = () => {
  return (
    <div className="pattern-body-bg min-h-screen w-full text-stone-900 antialiased">
      <Navbar transparent fixedOnScroll />

      <main className="pt-5 pb-8 sm:pt-7 md:pb-10">
        <section
          className="
            glass-section
            !w-[92%]
            !max-w-[1150px]
            mx-auto
            px-4 py-6
            sm:px-6 sm:py-8
            md:px-8 md:py-10
            lg:px-10 lg:py-10
          "
        >
          <div className="w-full max-w-4xl mx-auto">
            <header className="mb-7 sm:mb-9">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-stone-900">
                Refund &amp; Return Policy
              </h1>

              <div className="mt-4 h-1 w-16 rounded-full bg-[#E85A1C]" />
            </header>

            <div className="space-y-5 text-sm sm:text-base leading-7 text-stone-700">
              <p>
                This Refund and Return Policy explains the conditions
                under which products purchased through the Bhima
                Mobility online shop may be returned and refunds
                requested. The shop may offer apparel, charging
                equipment, spare parts, accessories, and other related
                products. By placing an order, customers should review
                this policy along with the applicable Terms &amp;
                Conditions and order details.
              </p>

              <p>
                Customers should inspect their order promptly after
                delivery. A return or refund request should be raised
                within 7 calendar days from the date of delivery.
                Requests submitted after this period may not be
                accepted, except where a different remedy is required
                under applicable law or expressly confirmed by
                Bhima Mobility.
              </p>

              <p>
                A return or refund request may be considered if the
                product received is damaged or defective, the wrong
                product has been delivered, or an item or component
                included in the order is missing. Requests will be
                reviewed against the order details and the information
                provided by the customer.
              </p>

              <p>
                To be eligible for a return, the product should,
                wherever reasonably possible, be returned in its
                original packaging, with its accessories, manuals,
                tags, and other supplied components. The customer
                should provide the original purchase receipt, invoice,
                or order confirmation. Products should be unused and
                in the condition in which they were delivered, except
                where reasonable inspection is necessary to identify
                damage, a defect, or an incorrect item.
              </p>

              <p>
                To initiate a return or refund request, customers
                should contact Bhima Mobility through the official
                website at{" "}
                <a
                  className="font-medium text-[#D94D13] underline underline-offset-4 hover:text-[#B83E0B]"
                  href="https://bhimamobility.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  bhimamobility.com
                </a>
                . Please provide the order number, product details,
                a description of the issue, and clear photographs
                where the product is damaged, defective, incorrect,
                or incomplete. Customers should wait for return
                instructions before dispatching the product.
              </p>

              <p>
                Once a return request is accepted, the customer should
                dispatch the product within 3 working days of receiving
                the return instructions, unless another period is
                communicated by Bhima Mobility. The return address
                and shipping instructions will be provided during
                the return process.
              </p>

              <p>
                Return shipping and transportation costs will be
                communicated when the return is authorised. Where a
                return results from a damaged, defective, incorrect,
                or incomplete order, responsibility for reasonable
                return costs will be determined in accordance with
                the applicable law and the circumstances of the case.
                Customers should not assume that return costs will
                always be charged to them.
              </p>

              <p>
                Returned products will be inspected after receipt.
                Bhima Mobility will assess the reported issue, the
                condition of the product, the order information, and
                the applicable return conditions before determining
                the appropriate remedy. If a request is approved,
                the available remedy may include a refund, replacement,
                or another appropriate resolution, depending on the
                circumstances, product availability, and applicable
                law.
              </p>

              <p>
                If a refund is approved, it will ordinarily be
                processed using the original payment method, where
                supported by the payment provider. The time taken
                for the amount to appear in the customer's account
                may depend on the bank, payment provider, and
                transaction method. Any deduction or adjustment
                will be communicated where applicable and will
                comply with applicable law.
              </p>

              <p>
                If a refund has been approved but has not appeared
                within 7 working days of the refund initiation date,
                customers should contact Bhima Mobility through
                the official website with their order number and
                refund reference, if available, so that the status
                can be checked.
              </p>

              <p>
                Products returned without prior authorisation,
                products that do not correspond to the reported
                order issue, or returns that do not meet the
                applicable conditions may require further review
                before a refund or replacement can be approved.
                The absence of original packaging or a purchase
                receipt may affect verification, but will not
                remove any mandatory rights or remedies available
                to customers under applicable law.
              </p>

              <p>
                This policy applies to products purchased through
                the Bhima Mobility online shop. Vehicle bookings,
                vehicle purchases, and vehicle-specific deposits
                may be governed by separate booking, cancellation,
                warranty, and purchase terms. Customers should
                refer to the terms applicable to the relevant
                transaction.
              </p>

              <p>
                Bhima Mobility may update this policy from time
                to time to reflect changes in its operations,
                products, payment processes, or legal requirements.
                The updated policy will be published on this page
                and will apply in accordance with applicable law
                and the terms governing the relevant transaction.
              </p>

              <p>
                For questions about returns, refunds, or the status
                of a refund request, please contact Bhima Mobility
                through the official website at{" "}
                <a
                  className="font-medium text-[#D94D13] underline underline-offset-4 hover:text-[#B83E0B]"
                  href="https://bhimamobility.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  bhimamobility.com
                </a>
                . Please include your order number when making
                an enquiry.
              </p>
            </div>

            <div className="mt-7 border-t border-stone-200/80 pt-5">
              <p className="text-xs sm:text-sm leading-6 text-stone-500">
                This policy should be read together with the
                applicable Terms &amp; Conditions and Privacy Policy.
                Nothing in this policy limits rights available
                under applicable law.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
