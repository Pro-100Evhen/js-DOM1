const result = document.querySelector("#result"),
   num = document.querySelectorAll(".number:not(.equals)"),
   operation = document.querySelectorAll(".operation"),
   equals = document.querySelector(".equals"),
   clear = document.querySelector("#clear"),
   ce = document.querySelector("#ce");
let ex = "";
result.innerHTML = "0";

function clickN() {
   if (!ex || typeof ex === "number" || ex === "0") {
      ex = this.id;
   } else {
      ex += this.id;
   }
   result.innerHTML = ex.split(/\/|\*|\+|-|=/).pop();
   checkLength(result.innerHTML);
}

function clickO() {
   if (!ex) {
      return;
   }
   ex = ex.toString().replace(/=/, "");
   if (ex.match(/\/|\*|\+|-|=/)) {
      ex = eval(ex).toString();
   }
   ex += this.id;
   result.innerHTML = this.id;
}

Array.from(num).forEach(function (element) {
   element.addEventListener("click", clickN);
});

Array.from(operation).forEach(function (element) {
   element.addEventListener("click", clickO);
});

clear.addEventListener("click", () => {
   result.innerHTML = "0";
   ex = "";
});

ce.addEventListener("click", () => {
   if (!ex.match(/=$/)) {
      ex = doCE(ex);
      result.innerHTML = "0";

      function doCE(arg) {
         arg = arg.split(/([\/\*\+\-\=])/g);
         arg.splice(-1, 1);
         return arg.join("");
      }
   }
});

equals.addEventListener("click", () => {
   if (!ex) {
      result.innerHTML = "0";
   } else {
      ex = eval(ex);
      result.innerHTML = trim12(ex);
   }
});

function checkLength(arg) {
   if (arg.toString().length > 14) {
      result.innerHTML = "number too long".toUpperCase();
      ex = "0";
   }
}

function trim12(arg) {
   if (arg.toString().length > 14) {
      ex = parseFloat(arg.toPrecision(12));
      if (ex.toString().length > 14) {
         ex = ex.toExponential(9);
      }
      return ex;
   } else {
      return arg;
   }
}
