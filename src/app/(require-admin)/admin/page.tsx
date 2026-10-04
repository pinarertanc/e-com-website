import { MutedText, PageTitle } from "@/components/typography";

export default function Admin(){
return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <PageTitle className="text-4xl font-bold mb-4">Admin Home Page</PageTitle>
    <MutedText className="text-lg text-gray-600">This is the admin home page.</MutedText>
  </div>
)
}