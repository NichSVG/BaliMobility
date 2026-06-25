export const WHATSAPP_NUMBER = "6282146522084";
export const PHONE_DISPLAY = "+62 821-4652-2084";
export const EMAIL = "dedikbali@yahoo.com";
export const ADDRESS = "Perumahan Griya Carik No.16 Bona Kelod, Blahbatuh, Gianyar, Bali, Indonesia";
export const BUSINESS_HOURS = "Daily: 8:00 AM - 4:00 PM (WITA)";
export const DEFAULT_WHATSAPP_MSG = "Hi Bali Mobility! I'd like to enquire about equipment rental.";

export function whatsappLink(message?: string) {
  const msg = message || DEFAULT_WHATSAPP_MSG;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
