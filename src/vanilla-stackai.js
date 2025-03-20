// Constants
const IFRAME_ID = "responsiveIframe";
const MOBILE_BREAKPOINT = 1000;
const IFRAME_WIDTH_MOBILE = "100vw";
const IFRAME_HEIGHT_MOBILE = "39rem";
const IFRAME_WIDTH_DESKTOP = "35rem";
const IFRAME_HEIGHT_DESKTOP = "39rem";

function initializeStack() {
  // Find the current script tag
  var scripts = document.getElementsByTagName("script");
  var currentScript = null;

  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src.includes("vanilla-stackai.js")) {
      currentScript = scripts[i];
      break;
    }
  }

  if (!currentScript) {
    console.error("Current script not found.");
    return;
  }

  // Get AI settings from data attributes
  var projectUrl = currentScript.getAttribute("data-project-url") || "https://your-default-ai-instance.com";
  var model = currentScript.getAttribute("data-model") || "gpt-4"; // Default: GPT-4
  var temperature = currentScript.getAttribute("data-temperature") || "0.7"; // Default: 0.7

  // Append AI settings to URL
  projectUrl += `?model=${model}&temperature=${temperature}`;

  // Create the iframe
  var iframe = document.createElement("iframe");
  iframe.id = IFRAME_ID;
  iframe.src = projectUrl;
  iframe.style.position = "fixed";
  iframe.style.zIndex = "100";
  iframe.style.overflow = "hidden";
  iframe.style.bottom = "0";
  iframe.style.right = "0";
  iframe.style.border = "none";
  iframe.style.borderRadius = "10px";
  iframe.style.width = IFRAME_WIDTH_MOBILE;
  iframe.style.height = IFRAME_HEIGHT_MOBILE;
  iframe.setAttribute("allow", "microphone");

  document.body.appendChild(iframe);

  // Handle window resizing
  function handleMessage(event) {
    var iframe = document.getElementById(IFRAME_ID);

    if (iframe && event.data.type === "chatbotStateChange") {
      if (event.data.isClosed) {
        setTimeout(() => {
          iframe.style.width = IFRAME_WIDTH_MOBILE;
          iframe.style.height = IFRAME_HEIGHT_MOBILE;
        }, 300);
      } else {
        const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

        if (isMobile) {
          iframe.style.width = IFRAME_WIDTH_MOBILE;
          iframe.style.height = IFRAME_HEIGHT_MOBILE;
        } else {
          iframe.style.width = IFRAME_WIDTH_DESKTOP;
          iframe.style.height = IFRAME_HEIGHT_DESKTOP;
        }
      }
    }
  }

  window.addEventListener("message", handleMessage);

  return function cleanup() {
    window.removeEventListener("message", handleMessage);
    document.body.removeChild(iframe);
  };
}

initializeStack();
