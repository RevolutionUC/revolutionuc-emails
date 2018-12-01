interface templateData {
  firstName?: string,
  subject?: string,
  shortDescription?: string,
  /* Used in verifyEmail template */
  verificationUrl?: string,
  /* Used in verfityEmail template */
  waitlist?: boolean,
  /* Used in confirmAttendance template */
  yesConfirmationUrl?: string;
  /* Used in confirmAttendance template */
  noConfirmationUrl?: string;
  /* Used in confirmAttendance template */
  offWaitlist: boolean

}
declare function build(templateName: string, templateData: object) : Promise<string>
declare function send(mailgunApiKey: string, mailgunDomain: string, from: string, to: string, subject: string, html: stirng): Promise;
