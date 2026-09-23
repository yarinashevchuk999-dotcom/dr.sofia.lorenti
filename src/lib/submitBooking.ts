export type BookingLead = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
  lang?: string;
};

export async function submitBooking(lead: BookingLead): Promise<boolean> {
  try {
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    return res.ok;
  } catch {
    return false;
  }
}
