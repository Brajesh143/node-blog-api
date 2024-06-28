var btn = document.querySelector("button");
var inpt1 = document.getElementById("input1");
var inpt2 = document.getElementById("input2");
function add(num1, num2) {
    return num1 + num2;
}
btn.addEventListener("click", function () {
    console.log(add(+inpt1.value, +inpt2.value));
});
