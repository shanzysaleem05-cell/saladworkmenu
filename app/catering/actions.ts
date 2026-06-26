"use server"

export async function submitCateringQuote(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const eventDate = formData.get("eventDate") as string;
  const guests = formData.get("guests") as string;
  const package_ = formData.get("package") as string;
  const requests = formData.get("requests") as string;

  // Log the submission (replace with email service later)
  console.log("Catering Quote Request:", {
    name, email, phone, eventDate, guests, package_, requests
  });

  // Return success
  return { success: true, message: "Quote request received! We will contact you within 24 hours." };
}
