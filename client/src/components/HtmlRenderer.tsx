import DOMPurify from "dompurify";
import "./HtmlRenderer.css";

interface HtmlRendererProps {
  content: string;
  className?: string;
}

export default function HtmlRenderer({ content, className = "" }: HtmlRendererProps) {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "a",
      "img",
      "hr",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class"],
  });

  return (
    <div
      className={`html-content prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
