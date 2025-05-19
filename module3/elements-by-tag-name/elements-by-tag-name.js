function byTagName(node, tagName) {
    let results = [];
  
    function explore(node) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === tagName.toLowerCase()) {
        results.push(node);
      }
      for (let child of node.childNodes) {
        explore(child);
      }
    }
  
    explore(node);
    return results;
  }
  
  // Testing:
  console.log(byTagName(document.body, "p").length);       // → 2
  console.log(byTagName(document.body, "strong").length);  // → 1