/* global MathJax */
export default function($html){
  $.each($html, (i, domNode) =>
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, domNode]));
}
