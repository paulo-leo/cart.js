/*Lib mxxxxxxxxxxxxx*/
const CART = {};
CART.name = 'x_____XXX__cart_sales_ecommerce___xx';
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
  let total = 0;
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
    item['qtd'] = item.qtd + qtd;
    delete item['amount'];
    CART.removeItem(id);
    CART.addItem(item);
  }
};
/*Modifica a quantidade de itens para mais menos, quando o tem chega a 0 ele é deletado do carrinho de compras automaticamente*/
CART.decreaseItem = function (id = null, qtd = 1) {
  let item = CART.getItem(id);
  if (item) {
    item['qtd'] = item.qtd - qtd;
    delete item['amount'];
    if (item['qtd'] === 0) {
      CART.removeItem(id);
    } else {
      CART.removeItem(id);
      CART.addItem(item);
    }
  }
};
/*Adiciona item no carrinho*/
CART.addItem = function (values) {
  let id = values.id;
  let name = values.name;
  let price = parseFloat(values.price);
  let qtd = values.qtd !== undefined ? parseInt(values.qtd) : 1;
  let discount = values.discount !== undefined ? parseFloat(values.discount) : 0;
  let taxa = values.taxa !== undefined ? parseFloat(values.taxa) : 0;
  let type = values.type !== undefined ? values.type : 1;
  let code = values.code !== undefined ? values.code : '';
  let objs = values.objs !== undefined ? values.objs : {};
  let img = values.img !== undefined ? values.img : '';
  let interval = values.interval !== undefined ? values.interval : 0;
  let address = values.address !== undefined ? values.address : '';
  let description = values.description !== undefined ? values.description : '';
  if (qtd >= 1 && !CART.checkItem(id)) {
    let amount = (price * qtd + taxa) - discount;
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
      objs: objs
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
    total += parseFloat(obj[item].amount);
    qtd += parseInt(obj[item].qtd);
    taxa += parseFloat(obj[item].taxa);
    discount += parseFloat(obj[item].discount);
    items++;
  }

  let subtotal = total;
  total - parseFloat(cupomDiscount);
  return { subtotal: subtotal, total: total, totalQtd: qtd, totalTaxa: taxa, totalDiscount: discount, totalItems: items };
};

/*Conta quantos produtos existem de um determinado tipo*/
CART.countType = function (valueType) {
  let total = 0;
  let obj = CART.getObject();
  for (let item in obj) {
    if(obj[item].type == valueType)
    {
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
//export default CART;
