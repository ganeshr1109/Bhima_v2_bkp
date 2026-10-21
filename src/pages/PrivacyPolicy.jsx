
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
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
                Privacy Policy
              </h1>

              <div className="mt-4 h-1 w-16 rounded-full bg-[#E85A1C]" />
            </header>

            <div className="space-y-5 text-sm sm:text-base leading-7 text-stone-700">
              <p>
                Bhima Mobility, a mobility solutions brand of the
                Yalamanchili Group, respects your privacy and is
                committed to handling your personal information
                responsibly. This Privacy Policy explains how
                information may be collected, used, stored, and
                shared when you access our website, create an
                account, submit a vehicle enquiry, request a
                booking, place an online order, or use our
                related services.
              </p>

              <p>
                When you voluntarily provide information while
                creating an account, submitting an enquiry,
                requesting a vehicle booking, purchasing a product,
                or contacting us, we may collect details including
                your name, billing address, shipping address,
                contact information, email address, mobile number,
                order details, vehicle booking information, and
                other information that you choose to provide.
                Depending on the transaction, this may also include
                business or GST details and information necessary
                to process a payment. We aim to collect information
                relevant to the service being requested.
              </p>

              <p>
                The information collected is used to process
                enquiries, manage vehicle booking requests, fulfil
                online orders, coordinate delivery where applicable,
                communicate transaction updates, provide customer
                support, maintain business records, improve our
                products and services, prevent fraudulent activity,
                and meet applicable legal obligations.
              </p>

              <p>
                Bhima Mobility does not sell personal information
                to third parties. Personal information may be
                shared where necessary with relevant entities
                within the Yalamanchili Group, where permitted
                by applicable law, to support customer service,
                process requests, coordinate business operations,
                and improve the services provided to customers.
                Such information should be accessed and used only
                for appropriate purposes.
              </p>

              <p>
                We may share relevant information with authorised
                third-party service providers where necessary
                to operate our website and deliver requested
                services. These providers may include payment
                processing partners, delivery and logistics
                providers, hosting providers, technical service
                providers, and customer support partners.
                Information shared will depend on the service
                required and applicable legal obligations.
              </p>

              <p>
                We may disclose personal information where
                reasonably necessary to investigate or prevent
                suspected fraud, unlawful activity, security
                incidents, or misuse of our website; to protect
                the rights, safety, and security of customers,
                employees, or other persons; to enforce applicable
                website terms; or to establish, exercise, or defend
                legal claims, subject to applicable law.
              </p>

              <p>
                Information may also be disclosed when required
                by law or in response to valid legal processes,
                court orders, notices, or lawful requests from
                government authorities, regulators, or law
                enforcement agencies. Any such disclosure will
                be handled in accordance with applicable legal
                requirements.
              </p>

              <p>
                We may receive information about you from third-party
                service providers or business partners where they
                are authorised to provide it and where doing so
                is permitted by applicable law. Where appropriate,
                such information may be used to support a request
                you have made, verify transaction details, or
                provide the relevant service.
              </p>

              <p>
                We take reasonable measures designed to protect
                personal information against unauthorised access,
                disclosure, alteration, loss, or misuse. However,
                no website, electronic transmission, or storage
                system can be guaranteed to be completely secure.
                You should keep your account credentials
                confidential and notify us if you suspect
                unauthorised use of your account.
              </p>

              <p>
                Personal information will be retained for as long
                as reasonably necessary to fulfil the purposes
                described in this Privacy Policy, provide requested
                services, maintain relevant business and transaction
                records, resolve disputes, prevent fraud, and comply
                with applicable legal obligations. The applicable
                retention period may vary depending on the type
                of information and the reason it was collected.
              </p>

              <p>
                Depending on applicable law, you may have rights
                concerning your personal information, including
                requesting access to or correction of inaccurate
                information, or requesting deletion where legally
                available. Certain information may need to be
                retained where required by law or for legitimate
                transaction and recordkeeping purposes.
              </p>

              <p>
                Our website may contain links to third-party
                websites or services. These websites operate
                independently and may have their own privacy
                policies and practices. We encourage you to review
                the applicable policies before providing personal
                information to third parties. This Privacy Policy
                does not govern websites that we do not control.
              </p>

              <p>
                Our services are not intended for children under
                the age of 18 to independently create accounts
                or submit personal information through account
                or purchase facilities. If you believe that a
                child has provided personal information to us
                inappropriately, please contact us through our
                official website so that we can review the matter
                and take appropriate action in accordance with
                applicable law.
              </p>

              <p>
                This website may use cookies or similar
                technologies where applicable to support website
                functionality, improve user experience, maintain
                security, and understand website usage. You may
                be able to manage certain cookie preferences
                through your browser or available website
                settings. The operation of individual cookies
                may depend on the services and technologies
                implemented on the website.
              </p>

              <p>
                This Privacy Policy may be updated periodically
                to reflect changes in our business operations,
                website features, information-handling practices,
                or applicable legal requirements. Any updated
                version will be published on this page and will
                apply in accordance with applicable law.
                We encourage you to review this page periodically.
              </p>

              <p>
                For questions, requests, or concerns relating
                to this Privacy Policy or the handling of your
                personal information, please contact Bhima
                Mobility through our official website at{" "}
                <a
                  className="font-medium text-[#D94D13] underline underline-offset-4 hover:text-[#B83E0B]"
                  href="https://bhimamobility.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  bhimamobility.com
                </a>
                .
              </p>
            </div>

            <div className="mt-7 border-t border-stone-200/80 pt-5">
              <p className="text-xs sm:text-sm leading-6 text-stone-500">
                This Privacy Policy should be read together with
                the applicable Terms &amp; Conditions and any
                relevant booking, order, or refund policies.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
