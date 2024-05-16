// Locate the header
const header = document.getElementsByClassName("diffbar")[0]

// Create a button element
const button = document.createElement('button');
button.innerHTML = `<span id="content-ai-bttn">
    <p>Review with AI</p>
    <svg id="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
</span>`;
button.id = 'analyze-pr';

// Agrego el botón al header
header.appendChild(button);

// Le agrego la funcionalidad al botón
button.addEventListener('click', analyzePR);

function analyzePR() {
    //conseguir el html de la pagina
    const codeSnippet = document.querySelectorAll('copilot-diff-entry[data-file-path]');

    const tBody = codeSnippet[0].getElementsByClassName("blob-code-inner")
    
    let code = ""
    
    for (let i = 0; i < tBody.length; i++) {
        console.log(tBody[i])
        const dataCodeMarker = tBody[i].getAttribute('data-code-marker');
        if(dataCodeMarker !== "-") code += "\n" + tBody[i].innerHTML;
    }

    const codeRemoveSpans = removeSpansAndKeepText(code)
    const finalCode = codeRemoveSpans.replaceAll("[null]","").replaceAll("<br>","").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&amp;", "&").replaceAll("&quot;", "\"").replaceAll("&apos;", "'")
    console.log(finalCode)

};

function removeSpansAndKeepText(html) {
    // Crear un elemento temporal para manipular el HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
  
    // Seleccionar todos los elementos span dentro del contenido
    const spans = tempDiv.querySelectorAll('span');
  
    // Remover cada span, pero mantener su contenido de texto
    spans.forEach(span => {
      const parent = span.parentNode;
      while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
      }
      parent.removeChild(span);
    });
  
    // Devolver el HTML modificado como una cadena
    return tempDiv.innerHTML;
  }
