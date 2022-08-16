/*Biblioteca JavaScript para criação de carrinho de compras criptografado no lado do cliente*/
const CART = {};
CART.name = "x_____XXX__cart_sales_ecommerce___xx";
CART.utf8_to_b64 = function (str) {
  return window.btoa(unescape(encodeURIComponent(str)));
};
CART.b64_to_utf8 = function (str) {
  return decodeURIComponent(escape(window.atob(str)));
};
CART.setCart = function (cart) {
  let save = JSON.stringify(cart);
  save = CART.utf8_to_b64(save);
  localStorage.removeItem(CART.name);
  localStorage.setItem(CART.name, save);
};
/*Verifica se o carrinho existe*/
CART.hasCart = function () {
  return localStorage.getItem(CART.name) ? true : false;
};
CART.getObject = function () {
  let obj = {};
  if (CART.hasCart()) {
    obj = localStorage.getItem(CART.name);
    obj = JSON.parse(CART.b64_to_utf8(obj));
  }
  return obj;
};
/*Retona um array com dados de todo o carrinho*/
CART.getCart = function (json = false) {
  let obj = CART.getObject();
  let obj2 = [];
  for (let item in obj) {
    obj2.push(obj[item]);
  }
  return json ? JSON.stringify(obj2) : obj2;
};
/*Verifica se o item existe*/
CART.checkItem = function (id = null) {
  let obj = CART.getObject();
  if (id != null) {
    return obj[id] !== undefined ? true : false;
  } else {
    return obj;
  }
};
/*Modifica a quantidade de itens para mais*/
CART.increaseItem = function (id = null, qtd = 1) {
  let item = CART.getItem(id);
  if (item) {
    item["qtd"] = item.qtd + qtd;
    delete item["amount"];
    CART.removeItem(id);
    CART.addItem(item);
    CART.removeDiscountAll();
  }
};
/*Modifica a quantidade de itens para mais menos, quando o tem chega a 0 ele é deletado do carrinho de compras automaticamente*/
CART.decreaseItem = function (id = null, qtd = 1) {
  let item = CART.getItem(id);
  if (item) {
    item["qtd"] = item.qtd - qtd;
    delete item["amount"];
    if (item["qtd"] === 0) {
      CART.removeItem(id);
    } else {
      CART.removeItem(id);
      CART.addItem(item);
    }

    CART.removeDiscountAll();
  }
};
/*Adiciona item no carrinho*/
CART.addItem = function (values) {
  CART.removeDiscountAll();
  let id = values.id;
  let name = values.name;
  let price = parseFloat(values.price);
  let qtd = values.qtd !== undefined ? parseInt(values.qtd) : 1;
  let discount =
    values.discount !== undefined ? parseFloat(values.discount) : 0;
  let taxa = values.taxa !== undefined ? parseFloat(values.taxa) : 0;
  let type = values.type !== undefined ? values.type : 1;
  let code = values.code !== undefined ? values.code : "";
  let objs = values.objs !== undefined ? values.objs : {};
  let img = values.img !== undefined ? values.img : "";
  let interval = values.interval !== undefined ? values.interval : 0;
  let address = values.address !== undefined ? values.address : "";
  let description = values.description !== undefined ? values.description : "";
  if (qtd >= 1 && !CART.checkItem(id)) {
    let amount = price * qtd + taxa;
    let obj = CART.getObject();
    obj[id] = {
      id: id,
      name: name,
      price: price,
      img: img,
      qtd: qtd,
      discount: discount,
      taxa: taxa,
      code: code,
      interval: interval,
      description: description,
      amount: amount,
      address: address,
      type: type,
      objs: objs,
    };
    CART.setCart(obj);
    return true;
  } else {
    return false;
  }
};
/*Retona um array com dados de todo o carrinho*/
CART.total = function (cupomDiscount = 0) {
  let total = 0;
  let items = 0;
  let qtd = 0;
  let taxa = 0;
  let discount = 0;
  let obj = CART.getObject();
  for (let item in obj) {
    total += parseFloat(obj[item].amount); //adiciona total de cada pedido
    qtd += parseInt(obj[item].qtd);
    taxa += parseFloat(obj[item].taxa);
    discount += parseFloat(obj[item].discount);
    items++;
  }

  let subtotal = total;
  total = total - parseFloat(cupomDiscount);
  return {
    subtotal: subtotal,
    total: total,
    totalQtd: qtd,
    totalTaxa: taxa,
    totalDiscount: discount,
    totalItems: items,
  };
};

/*Conta quantos produtos existem de um determinado tipo*/
CART.countType = function (valueType) {
  let total = 0;
  let obj = CART.getObject();
  for (let item in obj) {
    if (obj[item].type === valueType) {
      total++;
    }
  }
  return total;
};

/*Remove um item do carrinho pelo seu ID. Retorna os dados do item removido*/
CART.removeItem = function (id) {
  if (CART.checkItem(id)) {
    let obj = CART.checkItem();
    delete obj[id];
    CART.setCart(obj);
  }
};
/*Retorna um item do carrinho de compras*/
CART.getItem = function (id) {
  if (CART.checkItem(id)) {
    let obj = CART.checkItem();
    return obj[id];
  } else {
    return false;
  }
};
/*Retorna os objetos criados no array*/
CART.getItemObj = function (id, key = undefined) {
  let item = CART.getItem(id);
  let r = 0;
  if (item) {
    if (key !== undefined) {
      r = item.objs[key] !== undefined ? item.objs[key] : 0;
    } else {
      r = item.objs;
    }
  } else {
    r = 0;
  }
  return r;
};
/*Remove todo o carrinho de compras*/
CART.removeCart = function () {
  CART.setCart({});
};

CART.getItemIndex = function (id) {
  return CART.getCart().findIndex((e) => e.id === id);
};
// Aplica desconto no carrinho ou apenas em itens especificos
// itens especificos devem ser informados em um array no terceiro parametro da função
// o formato do array é: [{id: x}, {id: y}, {id: z}...]
// o comportamento padrão da função é de dividir o desconto entre todos os itens do carrinho
// porém se um array de itens é informado o valor é aplicado apenas nos itens especificos
CART.discount = function (amount, type = 1, arr = []) {
  const cart = CART.getCart();
  const obj = CART.getObject();
  const total = CART.total().subtotal;
  let discount = 0;

  if (type !== 1 && type !== 2)
    return console.error("O valor de type deve ser 1 ou 2");

  if (type === 1) discount = total * (amount / 100);
  else discount = amount;

  if (arr.length === 0) {
    for (let item of cart) {
      let discountOnItem = 0;
      if (discount > 0 && item.amount > 0) {
        discountOnItem = CART.discountOnItem(discount, item.amount);
        item.amount -= discountOnItem;
        item.discount += discountOnItem;
        discount -= discountOnItem;
      }

      if (item.amount < 0) item.amount = 0;

      obj[item.id] = item;
    }
  } else {
    for (let item of arr) {
      const index = CART.getItemIndex(item.id);

      if (index !== -1) {
        if (type === 1) discount = cart[index].amount * (amount / 100);
        const discountOnItem = CART.discountOnItem(
          discount,
          cart[index].amount
        );
        cart[index].amount -= discountOnItem;
        cart[index].discount += discountOnItem;
        if (cart[index].amount < 0) cart[index].amount = 0;
        obj[cart[index].id] = cart[index];
      }
    }
  }

  CART.setCart(obj);
};
// Calcula o valor do desconto que será aplicado em um item
CART.discountOnItem = function (discount, amount) {
  return discount <= amount ? discount : amount;
};
// Remove o desconto de todos os itens
CART.removeDiscountAll = function () {
  const cart = CART.getObject();

  for (let key in cart) {
    cart[key].amount = cart[key].price * cart[key].qtd + cart[key].taxa;
    cart[key].discount = 0;
  }

  CART.setCart(cart);
};
// Aplica desconto a partir de informações de um JSON codificado em Base64
CART.discountFromB64 = function (base64_str) {
  if (typeof base64_str !== "string")
    console.error("O valor informado deve ser uma string");

  const obj = JSON.parse(atob(base64_str));
  const { type, amount, arr } = obj;

  if (isNaN(amount))
    return console.error("O valor de amount deve ser um número");

  if (isNaN(type) && type !== 1 && type !== 2)
    return console.error("O valor de type deve ser 1 ou 2");

  if (arr && !Array.isArray(arr))
    return console.error("O valor de arr deve ser um array");

  CART.discount(Number(amount), Number(type), arr);
};

//Comente a última linha caso o uso não seja diretamente na web sem exportação.
// export default CART;
module.exports = CART;
