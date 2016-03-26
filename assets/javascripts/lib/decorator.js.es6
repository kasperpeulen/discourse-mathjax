export default function () {
  if(window.MathJax != null){
    window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, "topic"]);
    const previews = $('.d-editor-preview');
    if(previews.length > 0){
      window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, previews[0]]);
    }
  }
}
