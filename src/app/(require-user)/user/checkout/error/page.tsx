import Link from "next/link";

import { Button } from "@/components/ui/button";

import { MutedText, PageTitle } from "@/components/typography";

export function SomethingWentWrongPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <PageTitle >Something went wrong</PageTitle>
      <MutedText >
        We could not complete your checkout. Please try again.
      </MutedText>
      <Button asChild>
        <Link href="/">Back to products</Link>
      </Button>
    </main>
  );
}

export default SomethingWentWrongPage;