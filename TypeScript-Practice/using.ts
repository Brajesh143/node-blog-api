const btn = document.querySelector("button")! as HTMLButtonElement;
const inpt1 = document.getElementById("input1")! as HTMLInputElement;
const inpt2 = document.getElementById("input2")! as HTMLInputElement;

function add(num1: number, num2: number) {
    return num1 + num2;
}

btn.addEventListener("click", function() {
    console.log(add(+inpt1.value, +inpt2.value));
});