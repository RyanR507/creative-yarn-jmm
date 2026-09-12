import { getWhatsAppLink } from "../data/config";
import { trackEvent } from "../utils/analytics";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.24.62 4.4 1.8 6.3L4 29l7.86-1.75a12.9 12.9 0 0 0 4.16.69h.01c6.62 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3Zm0 21.9h-.01a10 10 0 0 1-3.7-.62l-.53-.19-4.66 1.04.99-4.55-.21-.55a9.94 9.94 0 0 1-.98-4.01c0-5.54 4.5-10.04 10.05-10.04 2.68 0 5.2 1.05 7.1 2.94a9.98 9.98 0 0 1 2.94 7.1c0 5.54-4.5 10.04-10.05 10.04Zm5.5-7.53c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"
        />
      </svg>
    </a>
  );
}
