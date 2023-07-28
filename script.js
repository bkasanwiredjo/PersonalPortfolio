function setupTypewriter(t) {
    const preElement = t.querySelector(".typewriter-text");
    const HTML = preElement.innerHTML;
  
    preElement.innerHTML = "";
  
    let cursorPosition = 0;
    let tag = "";
    let writingTag = false;
    let tagOpen = false;
    const typeSpeed = 100;
    let tempTypeSpeed = 0;
  
    function type() {
      if (writingTag === true) {
        tag += HTML[cursorPosition];
      }
  
      if (HTML[cursorPosition] === "<") {
        tempTypeSpeed = 0;
        if (tagOpen) {
          tagOpen = false;
          writingTag = true;
        } else {
          tag = "";
          tagOpen = true;
          writingTag = true;
          tag += HTML[cursorPosition];
        }
      }
      if (!writingTag && tagOpen) {
        tag.innerHTML += HTML[cursorPosition];
      }
      if (!writingTag && !tagOpen) {
        if (HTML[cursorPosition] === " ") {
          tempTypeSpeed = 0;
        } else {
          tempTypeSpeed = Math.random() * typeSpeed + 50;
        }
        preElement.innerHTML += HTML[cursorPosition];
      }
      if (writingTag === true && HTML[cursorPosition] === ">") {
        tempTypeSpeed = Math.random() * typeSpeed + 50;
        writingTag = false;
        if (tagOpen) {
          const newSpan = document.createElement("span");
          preElement.appendChild(newSpan);
          newSpan.innerHTML = tag;
          tag = newSpan.firstChild;
        }
      }
  
      cursorPosition += 1;
      if (cursorPosition < HTML.length) {
        setTimeout(type, tempTypeSpeed);
      }
    }
  
    return {
      type: type,
    };
  }
  
  const typewriter = document.getElementById("typewriter");
  typewriter && setupTypewriter(typewriter).type();
  