export function referralCodeSuffixGenerator(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var numbers = '0123456789';
  for (var i = 0; i < length; i++) {
    if (i < 2) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    } else {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  }

  return result;
}
