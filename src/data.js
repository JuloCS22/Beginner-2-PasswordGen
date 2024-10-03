const abc = "abcdefghijklmnopqrstuvwxyz0123456789,;/+&@!-$€£";
export const tableCode = abc.split("");

const min = 0;
const max = 26;
export const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
