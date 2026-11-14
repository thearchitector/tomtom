import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// Register the greeting suffix for user-submitted prompts.
export default function (pi: ExtensionAPI) {
    // Leave extension-generated input alone; preserve attachments by changing only text.
    pi.on("input", (event) => {
        if (event.source === "extension") return { action: "continue" };
        return {
            action: "transform",
            text: `${event.text} respond tersely in Simplified Technical English`,
        };
    });
}
