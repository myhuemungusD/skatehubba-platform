import {
  ArrowLeft,
  Database,
  Eye,
  Lock,
  Mail,
  Shield,
  UserCheck,
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

export default function PrivacyPage() {
  useEffect(() => {
    const title = "Privacy Policy - SkateHubba";
    const description =
      "Learn how SkateHubba collects, uses, and protects your personal information. Our privacy policy covers data security, user rights, and GDPR/CCPA compliance.";
    const url = "https://skatehubba.com/privacy";

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
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                  Privacy Policy
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Last updated: November 13, 2025
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                Introduction
              </h2>
              <p className="text-muted-foreground">
                SkateHubba ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our mobile
                skateboarding platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-foreground mt-4">
                Personal Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Account information (email, name, phone number)</li>
                <li>Profile data (username, bio, profile picture)</li>
                <li>Authentication data (Firebase Auth)</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-4">
                Location Data
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Geolocation data for spot check-ins (only when you use the
                  feature)
                </li>
                <li>Spot discovery and mapping features</li>
                <li>We never track your location in the background</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-4">
                User Content
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Trick videos and photos you upload</li>
                <li>Chat messages and AI assistant interactions</li>
                <li>S.K.A.T.E. game sessions and challenges</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-4">
                Payment Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Payment processing through Stripe (we don't store card
                  details)
                </li>
                <li>Purchase history for HubbShop items</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-4">
                Automatic Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Device information and identifiers</li>
                <li>Usage data and analytics</li>
                <li>Performance metrics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Lock className="h-6 w-6 text-primary" />
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Provide and maintain our services</li>
                <li>Process transactions and send notifications</li>
                <li>Personalize your experience</li>
                <li>Improve our platform and develop new features</li>
                <li>Communicate with you about updates and support</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-primary" />
                Information Sharing
              </h2>
              <p className="text-muted-foreground">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Service Providers:</strong> Firebase (auth), Stripe
                  (payments), OpenAI (AI chat), Neon (database)
                </li>
                <li>
                  <strong>Other Users:</strong> Public profile information,
                  leaderboard stats, and content you choose to share
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or
                  to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, sale, or acquisition
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We <strong>never sell</strong> your personal information to
                third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Data Security
              </h2>
              <p className="text-muted-foreground">
                We implement industry-standard security measures including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>HTTPS encryption for all data transmission</li>
                <li>Secure authentication with Firebase</li>
                <li>HttpOnly session cookies</li>
                <li>Regular security audits</li>
                <li>Access controls and monitoring</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Your Rights
              </h2>
              <p className="text-muted-foreground">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
                <li>Object to processing</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:privacy@skatehubba.com"
                  className="text-primary hover:underline"
                >
                  privacy@skatehubba.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Children's Privacy
              </h2>
              <p className="text-muted-foreground">
                SkateHubba is not intended for children under 13. We do not
                knowingly collect personal information from children under 13.
                If you are a parent or guardian and believe your child has
                provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                International Users
              </h2>
              <p className="text-muted-foreground">
                Your information may be transferred to and processed in the
                United States and other countries. By using SkateHubba, you
                consent to the transfer of your information to countries outside
                your country of residence.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Changes to This Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                Contact Us
              </h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact
                us:
              </p>
              <ul className="list-none space-y-2 text-muted-foreground mt-4">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:privacy@skatehubba.com"
                    className="text-primary hover:underline"
                  >
                    privacy@skatehubba.com
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
                By using SkateHubba, you acknowledge that you have read and
                understood this Privacy Policy and agree to its terms.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
