import { Navbar } from "@/components/custom/Navbar";
import { Footer } from "@/components/custom/Footer";
import { ContactModalProvider } from "@/components/custom/contact/ContactModalProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContactModalProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </ContactModalProvider>
  );
}
