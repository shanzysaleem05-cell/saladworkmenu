"use server"

export async function submitCateringQuote(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const eventDate = formData.get("eventDate") as string;
  const guests = formData.get("guests") as string;
  const package_ = formData.get("package") as string;
  const requests = formData.get("requests") as string;

  // TODO: wire this up to a real email/CRM service. Intentionally not
  // logging the submission (name/email/phone) to server console output.
  void name; void email; void phone; void eventDate; void guests; void package_; void requests;

  // Return success
  return { success: true, message: "Quote request received! We will contact you within 24 hours." };
}
