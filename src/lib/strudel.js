const STRUDEL_SCRIPT_URL = "https://unpkg.com/@strudel/web@1.3.0";

let initPromise = null;
let ns = null;

export async function ensureStrudelReady() {
  if (!initPromise) {
    initPromise = (async () => {
      if (!window.__chillMusicStrudelScriptLoaded) {
        await new Promise((resolve, reject) => {
          const existing = document.querySelector(
            `script[data-strudel-src="${STRUDEL_SCRIPT_URL}"]`
          );
          if (existing) {
            resolve();
            return;
          }
          const script = document.createElement("script");
          script.src = STRUDEL_SCRIPT_URL;
          script.async = true;
          script.dataset.strudelSrc = STRUDEL_SCRIPT_URL;
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error("Unable to load Strudel from the CDN."));
          document.head.appendChild(script);
        });
        window.__chillMusicStrudelScriptLoaded = true;
      }

      const namespace = window.strudel;
      if (!namespace) {
        throw new Error(
          "Strudel bundle loaded but `window.strudel` was not found."
        );
      }

      ns = namespace;

      if (!window.__chillMusicStrudelReady) {
        if (
          typeof namespace.initStrudel !== "function" ||
          typeof namespace.samples !== "function"
        ) {
          throw new Error("Strudel globals were not initialised correctly.");
        }
        await namespace.initStrudel({
          prebake: () =>
            namespace.samples("github:tidalcycles/dirt-samples"),
        });
        window.__chillMusicStrudelReady = true;
      }
    })().catch((err) => {
      initPromise = null;
      throw err;
    });
  }

  await initPromise;
  return ns;
}

export function setStrudelVolume(volume) {
  if (!ns?.getSuperdoughAudioController) return;
  const controller = ns.getSuperdoughAudioController();
  if (controller?.output?.destinationGain?.gain) {
    controller.output.destinationGain.gain.value = volume;
  }
}

export function hushStrudel() {
  if (window.__chillMusicStrudelReady && ns?.hush) {
    ns.hush();
  }
}

export function playCode(stackCode, bpm) {
  if (!ns) throw new Error("Strudel is not ready.");
  hushStrudel();
  const setcpsFn = ns.setcps ?? window.setcps;
  if (typeof setcpsFn === "function") setcpsFn(bpm / 60);
  new Function("strudel", `with (strudel) { (${stackCode}).play() }`)(ns);
}
