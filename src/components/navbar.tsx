"use client";

import { useState, useEffect } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChatPopover } from "@/components/chat-popover";
import { ChatWelcomeCard } from "@/components/chat-welcome-card";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { hasActiveSession } from "@/lib/session-manager";

export default function Navbar() {
  const [showWelcomeCard, setShowWelcomeCard] = useState(false);
  const [externalMessage, setExternalMessage] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const activeSession = hasActiveSession();
      setHasSession(activeSession);

      if (!activeSession) {
        const timer = setTimeout(() => {
          setShowWelcomeCard(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    };

    checkSession();

    const interval = setInterval(checkSession, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleQuestionClick = (question: string) => {
    setExternalMessage(question);
    setShowWelcomeCard(false);
    setHasSession(true);
  };

  const handleMessageSent = () => {
    setHasSession(true);
    setShowWelcomeCard(false);
  };

  const handleCloseWelcomeCard = () => {
    setShowWelcomeCard(false);
  };

  const handleExternalMessageProcessed = () => {
    setExternalMessage("");
  };

  const handleChatOpenChange = (isOpen: boolean) => {
    setIsChatOpen(isOpen);
  };

  const shouldShowWelcomeCard = showWelcomeCard && !hasSession && !isChatOpen;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <div className="mx-auto flex gap-2 items-center w-fit">
        <Dock className="z-50 pointer-events-auto relative flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12"
                      )}
                    >
                      <social.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          <Separator orientation="vertical" className="h-full py-2" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>

        <div className="relative h-full">
          {shouldShowWelcomeCard && (
            <div className="absolute bottom-full mb-4 right-0 pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
              <ChatWelcomeCard
                onQuestionClick={handleQuestionClick}
                onClose={handleCloseWelcomeCard}
              />
            </div>
          )}

          <Dock className="z-50 pointer-events-auto relative flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
            <DockIcon>
              <ChatPopover
                onMessageSent={handleMessageSent}
                externalMessage={externalMessage}
                onExternalMessageProcessed={handleExternalMessageProcessed}
                onOpenChange={handleChatOpenChange}
              />
            </DockIcon>
          </Dock>
        </div>
      </div>
    </div>
  );
}
