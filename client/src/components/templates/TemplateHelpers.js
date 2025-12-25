import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";

/* ==========================================================================
   DATE FORMATTERS
   ========================================================================== */

export const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) {
        // Attempt to parse "YYYY-MM" manually if standard parser fails or for edge cases
        return dateStr;
    }
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export const formatDateRange = (start, end, isCurrent) => {
    const startText = formatDate(start);
    const endText = isCurrent ? "Present" : formatDate(end);
    if (!startText && !endText) return "";
    if (!startText) return endText;
    if (!endText) return startText;
    return `${startText} - ${endText}`;
};

/* ==========================================================================
   DATA PARSERS
   ========================================================================== */

// Robustly parse a list from Array or Newline-separated String or Comma-separated String
export const parseList = (input, separator = "\n") => {
    if (!input) return [];
    if (Array.isArray(input)) {
        return input.map(i => (typeof i === 'string' ? i.trim() : i)).filter(Boolean);
    }
    if (typeof input === "string") {
        // If separator is newline but clearly no newlines and has commas, maybe try split by comma?
        // For now stick to requested separator default
        return input.split(separator).map((s) => s.trim()).filter(Boolean);
    }
    return [];
};

/* ==========================================================================
   FONT HELPERS
   ========================================================================== */

export const getFontFallback = (font) => {
    const type = font?.type;
    if (type === "serif") return "serif";
    if (type === "mono" || type === "monospace") return "monospace";
    return "sans-serif";
};

/* ==========================================================================
   STYLE HELPERS
   ========================================================================== */

export const getSectionTitle = (formatting, id, defaultTitle) => {
    return formatting?.section_titles?.[id] || defaultTitle;
};

export const isSectionVisible = (formatting, id) => {
    return formatting?.section_visibility?.[id] !== false;
};

export const ensureContrastingText = (bgColor) => {
    // Simple logic: if dark bg, return white, else dark
    return "white"; // Placeholder, real logic requires hex parsing
}
