import { cloneElement, isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import CodeBlock from "./CodeBlock";

type CaloutKind = "INFO" | "TIP" | "WARNING" | "DANGER";

const CALLOUTS: Record<
  CaloutKind,
  { icon: string; accent: string; iconColor: string }
> = {
  INFO: { icon: "info", accent: "border-primary", iconColor: "text-primary" },
  TIP: {
    icon: "lightbulb",
    accent: "border-status-seedling",
    iconColor: "text-status-seedling",
  },
  WARNING: {
    icon: "warning",
    accent: "border-warning-bg",
    iconColor: "text-warning-bg",
  },
  DANGER: { icon: "error", accent: "border-error", iconColor: "text-error" },
};

/* eslint-disable @typescript-eslint/no-explicit-any */

function firstTextOf(node: any): string {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";
  if (Array.isArray(node.children)) {
    return node.children.map(firstTextOf).join("");
  }
  return "";
}

/** Remove the leading "[!KIND]" marker from the first paragraph's text. */
function stripMarker(children: React.ReactNode): React.ReactNode {
  if (typeof children === "string") {
    return children.replace(/^\s*\[!(?:INFO|TIP|WARNING|DANGER)\][ \t]*\n?/, "");
  }
  if (Array.isArray(children)) {
    const [first, ...rest] = children;
    if (typeof first === "string") {
      const stripped = first.replace(
        /^\s*\[!(?:INFO|TIP|WARNING|DANGER)\][ \t]*\n?/,
        ""
      );
      return [stripped, ...rest];
    }
    if (isValidElement(first)) {
      const el = first as React.ReactElement<{ children?: React.ReactNode }>;
      return [cloneElement(el, {}, stripMarker(el.props.children)), ...rest];
    }
    return children;
  }
  return children;
}

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-body flex flex-col gap-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre({ children, node }: any) {
            const codeNode = (node?.children ?? []).find(
              (c: any) => c.type === "element" && c.tagName === "code"
            );
            const classNames: string[] = codeNode?.properties?.className ?? [];
            const language = classNames
              .find((c) => c.startsWith("language-"))
              ?.slice("language-".length);
            const meta: string =
              codeNode?.data?.meta ?? codeNode?.properties?.metastring ?? "";
            const filename = /title="([^"]+)"/.exec(meta)?.[1];
            return (
              <CodeBlock filename={filename} language={language}>
                {children}
              </CodeBlock>
            );
          },
          blockquote({ children, node }: any) {
            const firstParagraph = (node?.children ?? []).find(
              (c: any) => c.type === "element" && c.tagName === "p"
            );
            const m = /^\s*\[!(INFO|TIP|WARNING|DANGER)\][ \t]*(.*)$/.exec(
              firstTextOf(firstParagraph)
            );
            if (m) {
              const kind = m[1] as CaloutKind;
              const conf = CALLOUTS[kind];
              const kids = Array.isArray(children) ? [...children] : [children];
              const [first, ...rest] = kids;
              const cleanedFirst = isValidElement(first)
                ? cloneElement(
                    first as React.ReactElement<{ children?: React.ReactNode }>,
                    {},
                    stripMarker(
                      (first as React.ReactElement<{ children?: React.ReactNode }>).props
                        .children
                    )
                  )
                : first;
              return (
                <div
                  className={`flex items-start bg-surface-container border-l-4 ${conf.accent} rounded-r-lg p-5 my-6`}
                >
                  <span
                    className={`material-symbols-outlined ${conf.iconColor} mr-4 mt-0.5`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {conf.icon}
                  </span>
                  <div className="flex flex-col gap-2 min-w-0 flex-1">
                    {m[2] ? (
                      <span className="font-headline-h3 text-headline-h3 text-on-surface">
                        {m[2]}
                      </span>
                    ) : null}
                    {[cleanedFirst, ...rest]}
                  </div>
                </div>
              );
            }
            return (
              <blockquote className="border-l-4 border-outline-variant bg-surface-container-low rounded-r-lg p-5 my-6 text-on-surface-variant italic">
                {children}
              </blockquote>
            );
          },
          table({ children }: any) {
            return (
              <div className="overflow-x-auto border border-outline-variant rounded-lg bg-surface-container-low my-6">
                <table className="w-full text-left border-collapse">{children}</table>
              </div>
            );
          },
          thead({ children }: any) {
            return (
              <thead className="border-b border-outline-variant bg-surface-container">
                {children}
              </thead>
            );
          },
          th({ children }: any) {
            return (
              <th className="p-4 font-label-caps text-label-caps text-on-surface-variant">
                {children}
              </th>
            );
          },
          td({ children }: any) {
            return (
              <td className="p-4 font-body-sm text-body-sm text-on-surface-variant align-top">
                {children}
              </td>
            );
          },
          tr({ children }: any) {
            return (
              <tr className="border-b border-outline-variant/50 hover:bg-surface-container transition-colors last:border-0">
                {children}
              </tr>
            );
          },
          h2({ children }: any) {
            return (
              <h2 className="font-headline-h2 text-headline-h2 text-on-surface mt-10 mb-4">
                {children}
              </h2>
            );
          },
          h3({ children }: any) {
            return (
              <h3 className="font-headline-h3 text-headline-h3 text-on-surface mt-8 mb-3 border-b border-outline-variant/30 pb-2">
                {children}
              </h3>
            );
          },
          p({ children }: any) {
            return (
              <p className="font-body-md text-body-md text-on-surface/90 leading-relaxed my-4">
                {children}
              </p>
            );
          },
          ul({ children }: any) {
            return (
              <ul className="list-disc pl-5 my-4 space-y-2 font-body-md text-body-md text-on-surface/90">
                {children}
              </ul>
            );
          },
          ol({ children }: any) {
            return (
              <ol className="list-decimal pl-5 my-4 space-y-2 font-body-md text-body-md text-on-surface/90">
                {children}
              </ol>
            );
          },
          a({ children, href }: any) {
            const external = /^https?:\/\//.test(href ?? "");
            return (
              <a
                href={href}
                className="text-primary hover:underline"
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {children}
              </a>
            );
          },
          strong({ children }: any) {
            return <strong className="text-on-surface font-semibold">{children}</strong>;
          },
          hr() {
            return <hr className="border-outline-variant my-10" />;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
