import { ExternalLink, Lock, RotateCw } from "lucide-react";
import type { IframeHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type WebPreviewProps = HTMLAttributes<HTMLDivElement> & {
  defaultUrl?: string;
};

export const WebPreview = ({
  defaultUrl = "",
  className = "",
  children,
  ...props
}: WebPreviewProps) => (
  <div
    className={`overflow-hidden rounded-lg border border-white/12 bg-[#07131b]/80 shadow-[0_22px_90px_rgba(0,0,0,0.28)] ${className}`}
    data-preview-url={defaultUrl}
    {...props}
  >
    {children}
  </div>
);

export const WebPreviewNavigation = ({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex h-10 items-center gap-2 border-b border-white/10 bg-black/24 px-3 ${className}`}
    {...props}
  >
    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-md bg-white/8 px-2.5 py-1.5 text-[10px] font-medium text-white/58">
      <Lock className="h-3 w-3 flex-none text-primary/80" />
      {children}
    </div>
    <RotateCw className="h-3.5 w-3.5 flex-none text-white/36" />
    <ExternalLink className="h-3.5 w-3.5 flex-none text-white/36" />
  </div>
);

export const WebPreviewUrl = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <span className={`truncate ${className}`}>{children}</span>;

export const WebPreviewBody = ({
  className = "",
  ...props
}: IframeHTMLAttributes<HTMLIFrameElement>) => (
  <iframe
    title="Web preview"
    className={`h-full w-full border-0 bg-white ${className}`}
    loading="lazy"
    sandbox=""
    {...props}
  />
);
