import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import PlannerContent from "./planner-content";

export default function AIPlannerPage() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          }
        >
          <PlannerContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
