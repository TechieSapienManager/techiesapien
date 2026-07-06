import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const LAST_UPDATED = "July 6, 2026";

export const metadata: Metadata = {
  title: "CommitFlow AI — Privacy Policy",
  description:
    "Privacy Policy for CommitFlow AI, an AI-powered productivity app. Learn what information we collect, how it is used, how AI processes your input, and the choices and rights you have.",
  alternates: {
    canonical: "/commitflow-ai/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "CommitFlow AI — Privacy Policy",
    description:
      "How CommitFlow AI collects, uses, and protects your information.",
    type: "article",
    url: "/commitflow-ai/privacy-policy",
  },
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-28">
      <h2 className="section-heading text-2xl font-semibold text-foreground sm:text-3xl">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-[17px] leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default function CommitFlowPrivacyPolicy() {
  return (
    <div className="relative px-6 pb-28 pt-32 sm:pt-36">
      <article className="mx-auto w-full max-w-[720px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-electric-2"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-electric-2">
            CommitFlow AI
          </p>
          <h1 className="section-heading mt-3 text-4xl font-semibold text-foreground sm:text-5xl">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="mt-4 text-sm text-muted">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="mt-10 text-[17px] leading-relaxed text-muted">
          <p>
            This Privacy Policy explains how CommitFlow AI (&ldquo;CommitFlow
            AI,&rdquo; the &ldquo;app,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
            or &ldquo;our&rdquo;) handles your information. Please read it
            carefully. By using the app, you agree to the practices described
            here.
          </p>
        </div>

        <Section id="introduction" title="1. Introduction">
          <p>
            CommitFlow AI is an AI-powered productivity application developed by{" "}
            Techie Sapien. This policy covers the information we collect through
            the app and any related services, describes how that information is
            used and shared, and outlines the rights and choices available to
            you.
          </p>
          <p>
            This policy applies to all users of CommitFlow AI. It does not apply
            to third-party products or services that operate under their own
            privacy policies, even where they are integrated with the app.
          </p>
        </Section>

        <Section id="information-we-collect" title="2. Information We Collect">
          <p>We collect the following categories of information:</p>
          <ul className="flex list-disc flex-col gap-3 pl-6 marker:text-electric">
            <li>
              <strong className="font-medium text-foreground">
                Account information.
              </strong>{" "}
              You sign in with Google Sign-In (via Supabase). When you do, we
              receive basic Google profile information, including your name and
              email address, which is used to create and identify your account.
              We also store profile details you choose to provide (for example,
              bio, website, and productivity preferences).
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Content you provide.
              </strong>{" "}
              We collect the productivity content you create in the app, such as
              tasks, notes, focus sessions, habits, daily activity, and any
              commands or prompts you enter to use AI features.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Usage data.
              </strong>{" "}
              We collect information about how you interact with the app, such as
              features used, actions taken, session activity, and diagnostic or
              performance data.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Device and advertising information.
              </strong>{" "}
              To display ads, Google AdMob may collect device identifiers, your
              advertising ID, IP address, approximate location, and information
              about how you interact with ads. This data is collected and used in
              accordance with{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noreferrer noopener"
                className="text-electric-2 underline-offset-4 hover:underline"
              >
                Google&rsquo;s advertising policies
              </a>
              . You can reset or limit your advertising ID in your device
              settings.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Media you select.
              </strong>{" "}
              If you choose a profile photo, it may be stored on your device
              and, where enabled, uploaded to our cloud storage.
            </li>
          </ul>
        </Section>

        <Section id="how-we-use" title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="flex list-disc flex-col gap-3 pl-6 marker:text-electric">
            <li>Provide, maintain, and improve the app&rsquo;s features.</li>
            <li>
              Create and manage your account and synchronize your data across
              devices.
            </li>
            <li>
              Generate AI suggestions, summaries, and responses when you use AI
              features.
            </li>
            <li>
              Personalize your experience and remember your preferences.
            </li>
            <li>
              Monitor reliability, prevent abuse, and maintain the security of
              the app.
            </li>
            <li>
              Serve and measure advertising, where applicable, to help keep the
              app available.
            </li>
            <li>Comply with legal obligations and enforce our terms.</li>
          </ul>
        </Section>

        <Section id="ai-processing" title="4. AI Processing">
          <p>
            CommitFlow AI uses artificial intelligence to power certain
            features. When you use an AI feature, the input you provide &mdash;
            such as your command text and the relevant productivity context
            needed to fulfill your request &mdash; is sent to and processed by
            the Google Gemini API (Gemini 2.5 models) to generate a response.
          </p>
          <p>
            This processing is performed to provide the feature you requested.
            Google processes this content under its API terms; see the{" "}
            <a
              href="https://ai.google.dev/gemini-api/terms"
              target="_blank"
              rel="noreferrer noopener"
              className="text-electric-2 underline-offset-4 hover:underline"
            >
              Gemini API Terms of Service
            </a>
            . AI-generated output may be imperfect and should not be relied upon
            as professional, legal, medical, or financial advice.
          </p>
        </Section>

        <Section
          id="data-sharing"
          title="5. Data Sharing and Third-Party Services"
        >
          <p>
            We do not sell your personal information. We share information only
            with service providers that help us operate the app, and only to the
            extent necessary for them to perform their services. These may
            include:
          </p>
          <ul className="flex list-disc flex-col gap-3 pl-6 marker:text-electric">
            <li>
              <strong className="font-medium text-foreground">
                Cloud, database, and authentication:
              </strong>{" "}
              Supabase provides our backend, database, and authentication, and
              stores your account and app data. See the{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noreferrer noopener"
                className="text-electric-2 underline-offset-4 hover:underline"
              >
                Supabase Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong className="font-medium text-foreground">
                AI processing:
              </strong>{" "}
              The Google Gemini API (Gemini 2.5 models) processes content you
              submit to AI features, under the{" "}
              <a
                href="https://ai.google.dev/gemini-api/terms"
                target="_blank"
                rel="noreferrer noopener"
                className="text-electric-2 underline-offset-4 hover:underline"
              >
                Gemini API Terms
              </a>
              .
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Advertising:
              </strong>{" "}
              Google AdMob serves and measures ads in the app, under{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noreferrer noopener"
                className="text-electric-2 underline-offset-4 hover:underline"
              >
                Google&rsquo;s advertising policies
              </a>
              .
            </li>
          </ul>
          <p>
            Each third-party service processes data under its own privacy policy.
            We may also disclose information where required by law or to protect
            the rights, safety, and security of our users and the app.
          </p>
        </Section>

        <Section id="data-retention" title="6. Data Retention">
          <p>
            We retain your account and app data while your account is active.
            Content you create is kept until you delete it or request account
            deletion. When you request account deletion, your data is deleted
            within 30 days, unless a longer period is required by law.
          </p>
        </Section>

        <Section id="data-security" title="7. Data Security">
          <p>
            We use reasonable technical and organizational measures designed to
            protect your information against unauthorized access, loss, or
            misuse. However, no method of transmission over the internet or method
            of electronic storage is completely secure, and we cannot guarantee
            absolute security.
          </p>
        </Section>

        <Section id="your-rights" title="8. Your Rights">
          <p>
            Depending on your location, you may have the right to access,
            correct, update, or delete your personal information, and to object to
            or restrict certain processing. You can manage much of your
            information directly within the app. To make a privacy request or
            delete your account, contact us at{" "}
            <a
              href="mailto:founder@techiesapien.com"
              className="text-electric-2 underline-offset-4 hover:underline"
            >
              founder@techiesapien.com
            </a>
            . We will respond within the time frame required by applicable law.
          </p>
        </Section>

        <Section id="childrens-privacy" title="9. Children&rsquo;s Privacy">
          <p>
            CommitFlow AI is not intended for children under the age of 13 (or the
            minimum age required in your jurisdiction). We do not knowingly
            collect personal information from children. If you believe a child has
            provided us with personal information, please contact us at{" "}
            <a
              href="mailto:founder@techiesapien.com"
              className="text-electric-2 underline-offset-4 hover:underline"
            >
              founder@techiesapien.com
            </a>{" "}
            so we can take appropriate action.
          </p>
        </Section>

        <Section id="changes" title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we make
            material changes, we will update the &ldquo;Last updated&rdquo; date
            above and, where appropriate, provide additional notice within the app
            or on our website. Your continued use of the app after an update
            constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section id="contact-us" title="11. Contact Us">
          <p>
            If you have questions or concerns about this Privacy Policy or our
            data practices, please contact us:
          </p>
          <ul className="flex list-none flex-col gap-2">
            <li>
              Email:{" "}
              <a
                href="mailto:founder@techiesapien.com"
                className="text-electric-2 underline-offset-4 hover:underline"
              >
                founder@techiesapien.com
              </a>
            </li>
            <li>
              Website:{" "}
              <a
                href="https://techiesapien.com"
                target="_blank"
                rel="noreferrer noopener"
                className="text-electric-2 underline-offset-4 hover:underline"
              >
                techiesapien.com
              </a>
            </li>
            <li>Developer: Techie Sapien</li>
          </ul>
        </Section>

        <footer className="mt-16 border-t border-border pt-8 text-sm text-muted">
          <Link
            href="/"
            className="inline-flex items-center gap-2 transition-colors hover:text-electric-2"
          >
            <ArrowLeft size={16} />
            Return to homepage
          </Link>
        </footer>
      </article>
    </div>
  );
}
