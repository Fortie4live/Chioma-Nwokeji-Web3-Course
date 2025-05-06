function countChar(str, ch) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === ch) count++;
    }
    return count;
  }
  
  function countBs(str) {
    return countChar(str, 'B');
  }
  
  console.log(countBs("BOB"));
  // → 2
  console.log(countChar("kakkerlak", "k"));
  // → 4