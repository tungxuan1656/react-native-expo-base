export const typingAutocompleteMoney = (input: number) => {
  const multiples =
    input === 0
      ? []
      : input < 100
        ? [100, 1000, 10000, 100000]
        : input >= 100 && input < 1000000
          ? [10, 100, 1000, 10000]
          : input >= 1000000 && input < 10000000
            ? [10, 100, 1000]
            : input >= 10000000 && input < 100000000
              ? [10, 100]
              : []
  const newInputs = input === 0 ? [] : multiples.map((m) => m * input)

  return newInputs
}
