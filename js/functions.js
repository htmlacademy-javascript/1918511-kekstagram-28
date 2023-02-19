// 1 Функция для проверки длины строки.
const getStringLength = (string, length) => string.length - 1 <= length;
getStringLength('проверяемая строка', 10);

// 2 Функция для проверки, является ли строка палиндромом.
const isPalindrome = (string) => {
  string = string.toLowerCase();
  let backString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    backString += string[i];
  }
  return backString === string;
};
isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true

// 3 Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
const getNumbersFromString = (string) => {
  let stringNumber = '';
  string = string.replaceAll(' ', '');
  for (let i = 0; i < string.length - 1; i++) {
    if (!isNaN(+string[i])) {
      stringNumber += string[i];
    }
  }
  if (+stringNumber === 0) {
    stringNumber = NaN;
  }
  return +stringNumber;
};
getNumbersFromString('1 кефир, 0.5 батона'); // 105

/*
4 Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
возвращает исходную строку, дополненную указанными символами до заданной длины.
Символы добавляются в начало строки.
Если исходная строка превышает заданную длину, она не должна обрезаться.
Если «добивка» слишком длинная, она обрезается с конца.
*/
const editString = (string, minLength, addedSymbols) => {
  if (minLength <= string.length) {
    return `строка ${string}`;
  }
  const count = Math.trunc((minLength - string.length) / addedSymbols.length);
  let finalString = addedSymbols.repeat(count) + string;
  finalString = addedSymbols.slice(0, (minLength - finalString.length)) + finalString;
  return `строка ${finalString}`;
};
editString('1', 2, '0'); // строка 01
editString('q', 4, 'we'); // строка wweq
