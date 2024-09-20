import Header from "@/components/header/Header";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-grow container mx-auto ">
      <Header />
      {children}
    </main>
  );
}
