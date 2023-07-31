const bcrypt = jest.createMockFromModule("bcrypt");

bcrypt.compare = jest.fn(() => Promise.resolve(true));

bcrypt.hash = jest.fn((data, saltOrRounds) => {
  const hashedValue = `${data}_${saltOrRounds}`;
  return Promise.resolve(hashedValue);
});

module.exports = bcrypt;
