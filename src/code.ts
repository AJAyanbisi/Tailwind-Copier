import { convertNode } from "./converter";

figma.showUI(__html__, { width: 400, height: 500 });

// Listen for selection changes
figma.on("selectionchange", () => {
  handleSelection();
});

// Handle messages from UI
figma.ui.onmessage = (msg) => {
  if (msg.type === "refresh") {
    handleSelection();
  }
  if (msg.type === "copy") {
    // Notify is the only way to confirm copy in Figma plugins
    figma.notify("Classes copied to clipboard!");
  }
};

function handleSelection() {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.ui.postMessage({
      type: "no-selection",
    });
    return;
  }

  const results: Array<{
    name: string;
    type: string;
    classes: string[];
  }> = [];

  for (const node of selection) {
    const classes = convertNode(node);
    results.push({
      name: node.name,
      type: node.type,
      classes,
    });
  }

  figma.ui.postMessage({
    type: "selection",
    data: results,
  });
}

// Initial check
handleSelection();
