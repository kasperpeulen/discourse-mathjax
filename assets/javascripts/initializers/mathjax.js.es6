/* global MathJax */

import { decorateCooked } from 'discourse/lib/plugin-api';
import loadScript from 'discourse/lib/load-script';

function applyBody() {
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "topic"]);
  const previews = $('.d-editor-preview');
  if(previews.length > 0){
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, previews[0]]);
  }
}

export default {
  name: 'discourse-mathjax',
  after: 'inject-objects',

  initialize: function (container) {
    const siteSettings = container.lookup('site-settings:main');
    if (!siteSettings.enable_mathjax_plugin) { return; }

    loadScript(siteSettings.mathjax_url + '?config=' + siteSettings.mathjax_config, { scriptTag: true }).then(function () {

      MathJax.Hub.Config({
        "HTML-CSS": {
          preferredFont: "TeX",
          availableFonts: ["TeX"],
          linebreaks: {
            automatic: true
          },
          EqnChunk: (MathJax.Hub.Browser.isMobile ? 10 : 50)
        },
        tex2jax: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"]
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"]
          ],
          processEscapes: true
        },
        TeX: {
          noUndefined: {
            attributes: {
              mathcolor: "red",
              mathbackground: "#FFEEEE",
              mathsize: "90%"
            }
          },
          Macros: {
            href: "{}"
          }
        },
        messageStyle: "none"
      });

      decorateCooked(container, applyBody);
    });
  }
};
