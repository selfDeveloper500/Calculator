"use strict";

// Блок кода для кнопок цифр при нажати происходит запись в дисплей
function addNumber(num) {
  if (display.value == 0 && (num == "0" || num == "00")) {
    display.value = 0;
  } else {
    if (display.value == 0 && display.value.length == 1) display.value = "";
    display.value += num;
  }
}

// Блок кода для кнопок символов при нажати происходит запись в дисплей
function addSymbol(symbol) {
  // Если символ - точка, добавляем "." или "0." в зависимости от содержания выражения
  if (symbol == "." && display.value == 0) {
    display.value = "0.";
    return;
  } else if (symbol == "." && display.value.includes(".")) {
    return;
  } else if (symbol == "-" && display.value == 0) {
    display.value = "-";
    return;
  }

  if (isOperator(display.value.slice(-1))) {
    // если последний символ оператор, то заменить его на введенный оператор
    display.value =
      display.value.substring(0, display.value.length - 1) + symbol;
  } else {
    // иначе добавляем оператор как обычно
    display.value += symbol;
  }
}

function isOperator(symbol) {
  return ["+", "-", "*", "/", "%"].includes(symbol);
}

// блок кода произволит вычесление при нажатии на кнопку =
function answer() {
  // если последний символ - оператор, то удаляем его
  if (isOperator(display.value.slice(-1))) {
    display.value = display.value.substring(0, display.value.length - 1);
  }
  display.value = eval(display.value);
}

// функция обнуления введенныъ данных в дисплей
function clean() {
  display.value = 0;
}

//Блок кода стирает значения и символы в дисплее по одному
function back() {
  display.value = display.value.substring(0, display.value.length - 1);
  if (display.value == "") display.value = 0;
}

// Блок кода выполняет возведение в степень ( Я придумал функцию которая понимает что написано на дисплее делит ее на до ** и после.)
//  Возводит в стеень того значение которое напиано после знака **, а по факту нужно было посто добавить в дисплей символ **
// И при нажатии на кнопку + отрабатывает код answer и считает все через eval ( eval  сам возводит в степень) Пиздец... Тупонул жестко
function power() {
  if (display.value.includes("**")) {
    let parts = display.value.split("**"); // Разделяем строку по опеатору **
    let base = parseFloat(parts[0]); // Первый операнд(основание)
    let power = parseFloat(parts[1]); // Второй операнд (степень)
    let result = Math.pow(base, power); // Выполняем возведение в степень
    display.value = result;
  }
}
// display.value = eval(display.value **= 2);

// Блок кода выполняет расчет Pi
function pi() {
  if (display.value == 0 && display.value.length == 1) {
    display.value = eval(Math.PI);
  } else if (!isOperator(display.value.slice(-1))) {
    display.value += "*" + Math.PI;
  } else {
    display.value += Math.PI;
  }
}

// display.value += eval(Math.PI);

function e() {
  if (display.value == 0 && display.value.length == 1) {
    display.value = eval(Math.E);
  } else if (!isOperator(display.value.slice(-1))) {
    display.value += "*" + Math.E;
  } else {
    display.value += Math.E;
  }
}

// Блок кода выполняет расчет факториала
function factorialClick() {
  display.value = factorial(display.value);
}

function factorial(x) {
  if (x === 0) {
    return 1;
  }
  return x * factorial(x - 1);
}

// ниже приведенный код позволяет вводить значения и операторы через клавиатуру, а также стирать и выводить ответ
function enterKey() {
  const inputKey = document.getElementById("display");
  inputKey.addEventListener("keydown", function (event) {
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ".",
      "-",
      "+",
      "/",
      "*",
      "Backspace",
      "Enter",
    ];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    } else {
      if (event.key === "Backspace") inputKey.value.slice(0, -1);
      else if (event.key === "Enter") {
        inputKey.value = eval(inputKey.value);
      }
    }
  });
}
