import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  FileText,
  Scale,
  Shield,
  XCircle,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function TermsPage() {
  useEffect(() => {
    const title = "Terms of Service - SkateHubba";
    const description =
      "Read SkateHubba Terms of Service covering acceptable use, user accounts, content standards, payments, intellectual property, and legal disclaimers.";
    const url = "https://skatehubba.com/terms";

    document.title = title;

    const metaDescription =
      document.querySelector('meta[name="description"]') ||
      document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    metaDescription.setAttribute("content", description);
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    const ogTitle =
      document.querySelector('meta[property="og:title"]') ||
      document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.setAttribute("content", title);
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitle);
    }

    const ogDescription =
      document.querySelector('meta[property="og:description"]') ||
      document.createElement("meta");
    ogDescription.setAttribute("property", "og:description");
    ogDescription.setAttribute("content", description);
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDescription);
    }

    const ogUrl =
      document.querySelector('meta[property="og:url"]') ||
      document.createElement("meta");
    ogUrl.setAttribute("property", "og:url");
    ogUrl.setAttribute("content", url);
    if (!document.querySelector('meta[property="og:url"]')) {
      document.head.appendChild(ogUrl);
    }

    const ogType =
      document.querySelector('meta[property="og:type"]') ||
      document.createElement("meta");
    ogType.setAttribute("property", "og:type");
    ogType.setAttribute("content", "website");
    if (!document.querySelector('meta[property="og:type"]')) {
      document.head.appendChild(ogType);
    }

    const ogImage =
      document.querySelector('meta[property="og:image"]') ||
      document.createElement("meta");
    ogImage.setAttribute("property", "og:image");
    ogImage.setAttribute("content", "https://skatehubba.com/skatehubba-og.png");
    if (!document.querySelector('meta[property="og:image"]')) {
      document.head.appendChild(ogImage);
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-6"
            data-testid="button-back-home"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card className="border-primary/20">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                  Terms of Service
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Last updated: November 13, 2025
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Agreement to Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing or using SkateHubba ("Platform," "Service," "we,"
                "us," or "our"), you agree to be bound by these Terms of
                Service. If you disagree with any part of these terms, you may
                not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Acceptable Use
              </h2>
              <p className="text-muted-foreground">
                You agree to use SkateHubba only for lawful purposes. You agree
                NOT to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Violate any local, state, national, or international law
                </li>
                <li>
                  Upload or share inappropriate, offensive, or illegal content
                </li>
                <li>Harass, bully, or threaten other users</li>
                <li>Impersonate another person or entity</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools or bots without permission</li>
                <li>Spam, phish, or engage in fraudulent activity</li>
                <li>Interfere with or disrupt the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                User Accounts
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  You must provide accurate and complete information when
                  creating an account
                </li>
                <li>
                  You are responsible for maintaining the security of your
                  account
                </li>
                <li>You must be at least 13 years old to use SkateHubba</li>
                <li>
                  One person or legal entity may maintain no more than one
                  account
                </li>
                <li>
                  You must notify us immediately of any unauthorized use of your
                  account
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                User Content
              </h2>

              <h3 className="text-xl font-semibold text-foreground mt-4">
                Your Content
              </h3>
              <p className="text-muted-foreground">
                You retain ownership of content you post on SkateHubba (videos,
                photos, messages). By posting content, you grant us a
                non-exclusive, worldwide, royalty-free license to use, display,
                reproduce, and distribute your content on the Platform.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-4">
                Content Standards
              </h3>
              <p className="text-muted-foreground">All content must:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Be relevant to skateboarding and the SkateHubba community
                </li>
                <li>Not contain nudity, violence, or hate speech</li>
                <li>Not infringe on intellectual property rights</li>
                <li>Not contain misleading or fraudulent information</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-4">
                Content Moderation
              </h3>
              <p className="text-muted-foreground">
                We reserve the right to remove any content that violates these
                Terms or is otherwise objectionable. We may suspend or terminate
                accounts that repeatedly violate our content standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Payments & Purchases
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  All purchases through HubbShop are final unless otherwise
                  stated
                </li>
                <li>Prices are subject to change without notice</li>
                <li>We use Stripe for secure payment processing</li>
                <li>
                  You agree to provide current, complete, and accurate billing
                  information
                </li>
                <li>Refunds are handled on a case-by-case basis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Scale className="h-6 w-6 text-primary" />
                Intellectual Property
              </h2>
              <p className="text-muted-foreground">
                The SkateHubba platform, including its original content,
                features, and functionality, is owned by SkateHubba and is
                protected by international copyright, trademark, patent, trade
                secret, and other intellectual property laws.
              </p>
              <p className="text-muted-foreground mt-4">
                Our trademarks and trade dress may not be used without our prior
                written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <XCircle className="h-6 w-6 text-destructive" />
                Disclaimers
              </h2>

              <h3 className="text-xl font-semibold text-foreground mt-4">
                Skateboarding Risks
              </h3>
              <p className="text-muted-foreground">
                Skateboarding is an inherently dangerous activity. SkateHubba is
                a social platform and does NOT provide safety advice or
                equipment. You participate in skateboarding activities at your
                own risk.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-4">
                Service Availability
              </h3>
              <p className="text-muted-foreground">
                The Service is provided "as is" and "as available" without
                warranties of any kind. We do not guarantee that the Service
                will be uninterrupted, secure, or error-free.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-4">
                User Conduct
              </h3>
              <p className="text-muted-foreground">
                We are not responsible for the conduct of any user. You interact
                with other users at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Limitation of Liability
              </h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, SkateHubba shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages resulting from your use of or inability to use
                the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Termination
              </h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account and access to the
                Service immediately, without prior notice or liability, for any
                reason, including if you breach these Terms.
              </p>
              <p className="text-muted-foreground mt-4">
                You may terminate your account at any time by contacting
                support@skatehubba.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Dispute Resolution
              </h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by the laws of the State of
                California, United States, without regard to its conflict of law
                provisions.
              </p>
              <p className="text-muted-foreground mt-4">
                Any disputes arising from these Terms or your use of the Service
                will be resolved through binding arbitration, except where
                prohibited by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                Changes to Terms
              </h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. If we
                make material changes, we will notify you by email or through
                the Service. Your continued use of the Service after such
                modifications constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Contact Information
              </h2>
              <p className="text-muted-foreground">
                For questions about these Terms, please contact us:
              </p>
              <ul className="list-none space-y-2 text-muted-foreground mt-4">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:legal@skatehubba.com"
                    className="text-primary hover:underline"
                  >
                    legal@skatehubba.com
                  </a>
                </li>
                <li>
                  <strong>Support:</strong>{" "}
                  <a
                    href="mailto:support@skatehubba.com"
                    className="text-primary hover:underline"
                  >
                    support@skatehubba.com
                  </a>
                </li>
              </ul>
            </section>

            <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                By clicking "I Accept" or using SkateHubba, you acknowledge that
                you have read, understood, and agree to be bound by these Terms
                of Service.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
