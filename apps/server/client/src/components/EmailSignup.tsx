// Legacy EmailSignup - now powered by UltimateEmailSignup

import { trackButtonClick } from "../lib/analytics";
import UltimateEmailSignup from "./UltimateEmailSignup";

export default function EmailSignup() {
  const handleSuccess = (_data: any) => {
    // Track using existing analytics
    trackButtonClick("email_signup", "landing_page");
  };

  return (
    <UltimateEmailSignup
      variant="inline"
      includeFirstName={false}
      ctaText="Get Updates"
      source="landing_page"
      onSuccess={handleSuccess}
      showSocialProof={false}
    />
  );
}
