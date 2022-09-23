import type Mailgun from "mailgun.js";

type MailGunClient = ReturnType<Mailgun["client"]>;
type MailGunSendResult = ReturnType<MailGunClient["messages"]["create"]>;

interface templateData {
  firstName?: string;
  subject?: string;
  shortDescription?: string;
  /* Used in verifyEmail template */
  verificationUrl?: string;
  /* Used in verfityEmail template */
  waitlist?: boolean;
  /* Used in confirmAttendance template */
  yesConfirmationUrl?: string;
  /* Used in confirmAttendance template */
  noConfirmationUrl?: string;
  /* Used in confirmAttendance template */
  offWaitlist?: boolean;
}

export declare function build(
  templateName: string,
  templateData: templateData
): Promise<string>;
export declare function send(
  mailgunApiKey: string,
  mailgunDomain: string,
  from: string,
  to: string,
  subject: string,
  html: string
): MailGunSendResult;
