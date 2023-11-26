import { useContext, useRef } from "react";
import { WASMContext } from "../context/WASM";

export const WASMExample = () => {
  const ctx = useContext(WASMContext);

  if (!ctx.wasm) {
    return <>...</>;
  }

  return (
    <>
      Computed from WASM: 4+3={ctx.wasm.add(4, 3)}
      <OpenEmailWindow />
      <OpenSmsWindow />
      <OpenWhatsAppWindow />
      <OpenTelegramWindow />
    </>
  );
};

const OpenEmailWindow: React.FC = () => {
  const subject = "Hello, this is the subject"; // Set the email subject
  const body = "Hello, this is a predefined message in the email body."; // Set the email body
  const mailtoLink = `mailto:%20?receipient=&subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  const hiddenLinkRef = useRef<HTMLAnchorElement>(null);

  const handleButtonClick = () => {
    hiddenLinkRef.current?.click();
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="button-style"
        aria-label="Open Email Window"
      >
        Open Email Window
      </button>
      <a
        href={mailtoLink}
        ref={hiddenLinkRef}
        style={{ display: "none" }}
        aria-hidden="true"
      />
    </div>
  );
};

const OpenSmsWindow: React.FC = () => {
  const message = "Hello, this is a predefined SMS message!";
  const smsLink = `sms:?&body=${encodeURIComponent(message)}`;
  const hiddenLinkRef = useRef<HTMLAnchorElement>(null);

  const handleButtonClick = () => {
    hiddenLinkRef.current?.click();
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="button-style"
        aria-label="Open SMS Window"
      >
        Open SMS Window
      </button>
      <a
        href={smsLink}
        ref={hiddenLinkRef}
        style={{ display: "none" }}
        aria-hidden="true"
      />
    </div>
  );
};

const OpenWhatsAppWindow: React.FC = () => {
  const message = "Hello, this is a predefined WhatsApp message!";
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
  const hiddenLinkRef = useRef<HTMLAnchorElement>(null);

  const handleButtonClick = () => {
    hiddenLinkRef.current?.click();
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="button-style"
        aria-label="Open WhatsApp Window"
      >
        Open WhatsApp Window
      </button>
      <a
        href={whatsappLink}
        ref={hiddenLinkRef}
        style={{ display: "none" }}
        aria-hidden="true"
      />
    </div>
  );
};

const OpenTelegramWindow: React.FC = () => {
  const telegramLink = `tg://`;
  const hiddenLinkRef = useRef<HTMLAnchorElement>(null);

  const handleButtonClick = () => {
    hiddenLinkRef.current?.click();
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="button-style"
        aria-label="Telegram the author"
      >
        Telegram the Author
      </button>
      <a
        href={telegramLink}
        ref={hiddenLinkRef}
        style={{ display: "none" }}
        aria-hidden="true"
      />
    </div>
  );
};
