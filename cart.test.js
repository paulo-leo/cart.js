const CART = require("./cart");
const { item1, item2, item3 } = require("./mock");

CART.addItem(item1);
CART.addItem(item2);
CART.addItem(item3);

test("Descontar valor do total", () => {
  const previousTotal = CART.total().total;
  const discount = 10;

  CART.discount(discount, 2);

  const newTotal = CART.total().total;

  expect(newTotal).toBe(previousTotal - discount);
});

test("Descontar porcentagem do total", () => {
  const previousTotal = CART.total().total;
  const amount = 50;

  CART.discount(amount);

  const newTotal = CART.total().total;

  expect(newTotal).toBe(previousTotal - previousTotal * (amount / 100));
});

test("teste Descontar valor de produtos especificos", () => {
  const oldObj = { ...CART.getObject() };
  const discount = 50;
  const ids = [{ id: "aaa-0" }, { id: "aaa-2" }];

  CART.discount(50, 2, ids);

  const newObj = CART.getObject();

  for (let { id } of ids) {
    expect(
      newObj[id].amount === oldObj[id].amount - discount ||
        newObj[id].amount === 0
    ).toBeTruthy();
  }
});

test("teste Descontar porcentagem de produtos especificos", () => {
  const oldObj = { ...CART.getObject() };
  const discount = 50;
  const ids = [{ id: "aaa-0" }, { id: "aaa-2" }];

  CART.discount(50, 1, ids);

  const newObj = CART.getObject();

  console.log("Old: ");
  console.log(oldObj);
  console.log("New: ");
  console.log(newObj);

  for (let { id } of ids) {
    expect(
      newObj[id].amount ===
        oldObj[id].amount - oldObj[id].amount * (discount / 100)
    ).toBeTruthy();
  }
});
