"use client"
import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="w-8 h-8 border-4 border-t-sky-500 border-sky-500/20 rounded-full animate-spin" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center py-12 px-4 bg-background">
      <div className="w-full max-w-md flex justify-center">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "blockButton",
            },
            variables: {
              colorPrimary: isDark ? "#ffffff" : "#000000",
              colorBackground: isDark ? "#0a0a0a" : "#ffffff",
              colorText: isDark ? "#ffffff" : "#000000",
              colorInputBackground: isDark ? "#171717" : "#ffffff",
              colorInputText: isDark ? "#ffffff" : "#000000",
              colorTextSecondary: isDark ? "#a3a3a3" : "#525252",
              borderRadius: "0.5rem",
            },
            elements: {
              card: "bg-transparent shadow-none border-0 w-full p-0",
              rootBox: "w-full",
              headerTitle: `text-2xl font-bold text-center font-sans ${isDark ? "text-white" : "text-black"}`,
              headerSubtitle: `text-center mb-6 font-sans text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`,
              socialButtonsBlockButton: `${isDark ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"} border-0 transition-colors font-semibold py-2.5 rounded-lg mb-2`,
              socialButtonsBlockButtonText: `font-semibold text-sm ${isDark ? "text-black" : "text-white"}`,
              socialButtonsBlockButtonArrow: "hidden",
              dividerLine: `bg-transparent border-b border-dashed ${isDark ? "border-gray-700" : "border-gray-300"}`,
              dividerText: `text-xs bg-background px-3 ${isDark ? "text-gray-500" : "text-gray-400"}`,
              formFieldLabel: `text-sm font-semibold mb-1.5 ${isDark ? "text-white" : "text-black"}`,
              formFieldInput: `w-full px-3.5 py-2.5 border focus:ring-1 rounded-lg text-sm transition-all ${isDark ? "bg-[#171717] border-[#262626] focus:border-white focus:ring-white text-white placeholder-gray-600" : "bg-white border-gray-200 focus:border-black focus:ring-black text-black placeholder-gray-400"}`,
              formButtonPrimary: `${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"} text-sm font-bold py-2.5 rounded-lg w-full transition-colors mt-2`,
              footerActionText: `font-sans text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`,
              footerActionLink: `font-bold ml-1 text-sm ${isDark ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"}`,
              footer: isDark ? "bg-[#0a0a0a]" : "bg-white",
              formFieldAction: `text-sm font-sans ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`,
              identityPreviewText: isDark ? "text-white" : "text-black",
              identityPreviewEditButtonIcon: isDark ? "text-white" : "text-black",
              formFieldInputShowPasswordButton: isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black",
            },
          }}
        />
      </div>
    </div>
  );
}
