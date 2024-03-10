// функция, исправляющая окончания в зависимости от количества
export const declineWord = (
    number: number,
    one: string,
    few: string,
    many: string
) => {
    const absNumber = Math.abs(number);
    const lastTwoDigits = absNumber % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return many;
    }

    const lastDigit = absNumber % 10;

    if (lastDigit === 1) {
        return one;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return few;
    }

    return many;
};
