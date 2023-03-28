function processData(input) {
  const a = input.split(/\s+/)
  a.shift();
  const sa = [];
  let s = "";
  while (a.length > 0) {
      const op = a.shift;
      if (op== 1) {
          sa.push(s);
          s += a.shift();
      } else if (op == 2) {
          sa.push(s);
          s = s.slice(0, -a.shift());
      } else if (op == 3) {
          process.stdout.write(s[a.shift() - 1] + '\n')
      } else {
          s = sa.pop();
      }
  }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
count = 1;
process.stdin.on("data", function (input) {
  _input += input;
  if (count++ == _input[0]) {
    processData(_input);
  }
});

process.stdin.on("end", function () {
 processData(_input);
});
