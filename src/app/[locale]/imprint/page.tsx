import Link from "next/link";
import { Mail, Phone, MapPin, ArrowLeft } from "lucide-react";

export async function generateMetadata() {
  return { title: "Imprint & Privacy Policy — Martin Pattera" };
}

export default function ImprintPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-36 pb-16"
        style={{ background: "var(--bg-dark)" }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-70"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          <p
            className="eyebrow mb-4"
            style={{ color: "var(--gold)" }}
          >
            Legal
          </p>
          <h1
            className="text-5xl sm:text-6xl font-extrabold text-white leading-tight"
          >
            Imprint &amp;<br />Privacy Policy
          </h1>
        </div>
      </section>

      {/* Content */}
      <div
        className="py-20"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-3xl mx-auto px-6">

          {/* Contact card */}
          <div
            className="rounded-3xl border p-8 mb-16 shadow-card"
            style={{ background: "var(--bg-soft)", borderColor: "var(--border)" }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--text)" }}
            >
              Martin Pattera
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: "var(--blue)" }} />
                <p style={{ color: "var(--text-muted)" }}>
                  Gusshausstrasse 18/1A<br />
                  1040 Wien, Österreich
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" style={{ color: "var(--blue)" }} />
                <a
                  href="tel:+436818449061"
                  className="hover:underline"
                  style={{ color: "var(--text-muted)" }}
                >
                  +43 681 844 90 612
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" style={{ color: "var(--blue)" }} />
                <a
                  href="mailto:martin.pattera@myles-innovation.com"
                  className="hover:underline"
                  style={{ color: "var(--text-muted)" }}
                >
                  martin.pattera@myles-innovation.com
                </a>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="prose-legal">
            <h2>Privacy Policy</h2>

            <h3>1. Privacy</h3>
            <p>The operator of this website takes the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and the new EU General Data Protection Regulation (GDPR), as well as this Privacy Policy.</p>

            <h3>2. Use of your data and types of data</h3>
            <p>We only collect the personal data that is necessary for the performance and processing of our services, or that you have voluntarily provided to us.</p>
            <p>We have made some of our publications available online for you to download. In order to download a publication, we ask that you provide the following information: First name, last name, Email address, Company.</p>
            <p>We also store the following additional data: Gender, Company address, Position, Telephone number(s) (if provided), Social media profile(s) (LinkedIn/XING, if provided).</p>
            <p>We will only process the data provided to us for the purposes covered by your consent or otherwise included in a provision in accordance with the GDPR. We store the data in our CRM system and use it, on the basis of justifiable interest, to send you information about our company, products and innovations, as well as invitations to interesting events. The data is not disclosed to third parties.</p>

            <h3>3. Data retention</h3>
            <p>We will not retain data for longer than is necessary to fulfill our contractual or legal obligations and to avoid any possible liability claims. Data for marketing and promotional purposes will be retained until we receive a notice of revocation of the consent previously provided.</p>

            <h3>4. Data security</h3>
            <p>We use appropriate organizational and technical precautions to protect your personal data. These precautions specifically include protections against unauthorized, unlawful or accidental access, processing, loss, use and manipulation. Notwithstanding our efforts to maintain a consistently high level of due diligence, it cannot be ruled out that information you provide to us over the Internet will be viewed and used by others. Therefore, please note that we accept no liability whatsoever for the disclosure of information based on errors in the transfer of the data and/or through unauthorized access by third parties.</p>

            <h3>5. Recipients of the data</h3>
            <p>Your personal data, including your name, address, telephone number, company, company position, and email address will occasionally be transmitted to contracted processors with which MYLES has concluded a specific processing agreement.</p>

            <h3>6. Privacy policy for the use of Google Analytics</h3>
            <p>This website uses functions included in Google Analytics web analytics services. The service provider is Google Inc. 1600 Amphitheatre Parkway Mountain View, CA 94043, USA. Google Analytics uses "cookies" — text files stored on your computer that enable analysis of your website use. The information generated by the cookie about your use of this website is usually transmitted to a Google server in the USA and stored there.</p>
            <p>We only use Google Analytics with IP anonymization activated. This means that the user's IP address is shortened by Google within European Union Member States or in other States included in the Agreement on the European Economic Area.</p>
            <p>You can prevent storage of cookies by changing your browser settings. You can also prevent collection by Google by downloading and installing the browser plug-in at: <a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.</p>

            <h3>7. Newsletter and consents</h3>
            <p>Registration for our newsletter is done using a double opt-in procedure. This means that after you register, you will receive an email requesting that you confirm your registration. This confirmation is necessary to prevent anyone from registering with email addresses that do not belong to them.</p>
            <p>The newsletter is distributed by MailChimp, a newsletter distribution platform owned by the US service provider Rocket Science Group, LLC, 675 Ponce De Leon Ave NE #5000, Atlanta, GA 30308, USA. The email addresses of our newsletter recipients, as well as their other data as described in these notes, are stored on MailChimp's servers in the USA.</p>
            <p>You can cancel the receipt of our newsletter at any time via the unsubscribe link at the end of each newsletter.</p>

            <h3>8. Use of lead generation tools (Leadfeeder and LinkedIn)</h3>
            <p>We use the Leadfeeder service operated by Liidio Oy, Mikonkatu 17, 0100 Helsinki, Finland. This service uses Google Analytics data to recognize company visitors. We also use LinkedIn Lead Generation tools (LinkedIn AG, Dammtorstrasse 29-32, 20354 Hamburg, Germany). These tools are used for marketing purposes in accordance with Art. 6 (1) Letter f GDPR.</p>
            <p>Opt out: <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" target="_blank" rel="noopener noreferrer">LinkedIn opt-out</a></p>

            <h3>9. Use of Zoom</h3>
            <p>MYLES Innovation GmbH uses the "Zoom" service for the purpose of location-independent communication. The service provider Zoom Video Communications, Inc processes traffic and usage data to fulfill contractual obligations. Privacy policy: <a href="https://zoom.us/de-de/privacy.html" target="_blank" rel="noopener noreferrer">zoom.us/privacy</a></p>

            <h3>10. Use of Clickmeeting</h3>
            <p>ClickMeeting (ClickMeeting Spółka z ograniczoną odpowiedzialnością, ul. Arkońska 6/A4, 80-387 Gdańsk, Poland) is used for webinars. By participating, participants consent to their contact details being processed by Clickmeeting solely for the purpose of holding the webinars.</p>

            <h3>11. Contact form</h3>
            <p>If you send us inquiries via the contact form, we will store your details from the inquiry form, including the contact details you provide, in order to process the request and in case of follow-up questions. We will not share your information without your consent.</p>

            <h3>12. Cookies</h3>
            <p>Our website partly uses cookies. Cookies are small text files placed on your computer and stored by your browser. Most of the cookies we use are "session cookies" — they are automatically deleted after your visit. You can set your browser to refuse cookies, though this may limit the functionality of this website.</p>

            <h3>13. Server log files</h3>
            <p>The website provider automatically collects and stores information in server log files: browser type/version, operating system, referrer URL, hostname of the accessing computer, date and time of the server request, and data volume transferred. We use this log data only for statistical evaluations for operation and safety.</p>

            <h3>14. Your rights</h3>
            <p>As a data subject you have the following rights: right to information about your personal data, right to rectification or restriction of processing, right to decline processing, and right to data portability. If you believe that the processing of your data violates data protection law, you may file a complaint with the Data Protection Authority.</p>
            <p>To revoke consent at any time, please contact: <a href="mailto:office@myles-innovation.com">office@myles-innovation.com</a></p>

            <h3>15. Social plugins</h3>
            <p>The website contains social plugins from the following social networks: LinkedIn Ireland Unlimited Company, Dublin 2; XING SE, Dammtorstrasse 30, 20354 Hamburg; YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066; Meetup (subsidiary of WeWork Companies Inc., 115 W 18th St., New York, NY 10011). When you visit a page with these plugins, your browser connects directly to their servers.</p>

            <h3>16. Linking to other websites</h3>
            <p>Our website also contains links to other websites. The privacy policy described here does not apply to those websites. We ask you to visit those websites directly for their privacy information. MYLES cannot be held liable for any action taken on or content of those websites.</p>

            <h3>17. Revocation of advertising emails</h3>
            <p>The use of published contact information for sending unsolicited advertising and information materials is hereby prohibited. The operators expressly reserve the right to take legal action in the event of the unsolicited sending of advertising information.</p>

            <p className="text-xs mt-12" style={{ color: "var(--text-faint)" }}>
              Source: eRecht24 — according to the template from Dr. Thomas Schwenke
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
