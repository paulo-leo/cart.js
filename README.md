# CartJS

O CartJS representa uma compacta biblioteca em JavaScript, concebida para a criação e administração eficiente de carrinhos de compras via a API LocalStorage. O carrinho é criptografado para restringir o acesso e a manipulação direta de itens por usuários avançados. A biblioteca adota uma abordagem descomplicada, operando com a simplicidade dos objetos JavaScript.

#### bool CART.hasCart()

Verifica se o carrinho existe.

---

#### bool CART.addItem(object values)

Adiciona um produto/item no carrinho.

Abaixo segue a tabela com os campos que devem ser passados no parâmetro "values" e que poderão ser recuperados posteriormente.

| Campo       | Tipo e padrão | Descrição                                                                                                                                                                                   |
| ----------- | ------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name        | string        | Nome do item                                                                                                                                                                                |
| price       | float         | Valor do item                                                                                                                                                                               |
| img         | string = null | Caminho da imagem do item                                                                                                                                                                   |
| qtd         | int = 1       | Quantidade de item. A biblioteca fará o cálculo automaticamente, multiplicando a "qtd" com o "price" .                                                                                      |
| discount    | float = null  | Acrescenta um valor de desconto ao item. O cálculo é automotivo.                                                                                                                            |
| taxa        | float = null  | Acrescenta um valor de taxa ao item. O cálculo é automotivo.                                                                                                                                |
| code        | string = null | Código do item.                                                                                                                                                                             |
| interval    | int = 0       | ----------------------------------------------                                                                                                                                              |
| description | string = null | Descrição do item.                                                                                                                                                                          |
| amount      | ----------    | Campo que armazena o total de itens somando a quantidade e os seus valores. Esse campo é criado automaticamente pela biblioteca e poderá ser recuperado posteriormente ao consultar o item. |
| address     | string = null | Endereço do item.                                                                                                                                                                           |
| type        | string = 1    | Armazena o tipo de item.                                                                                                                                                                    |
| objs        | object = {}   | Permite passar um objeto JavaScript personalizado no item. Você pode usar o método "CART.getItemObj()" para recuperar os itens.                                                             |

---

#### object| json CART.getCart(bool json = false)

Retorna um array com dados de todo o carrinho. Se o parâmetro for igual a true, o tipo de retorno será JSON ao invés do objeto do JavaScript.

---

#### bool | object CART.checkItem(string id = null)

Verifica se o item existe por meio do ID do item. Caso não seja informado um id no parâmetro da função será retornado um objeto JavaScript dos itens.

---

#### void CART.increaseItem(string id, int qtd = 1)

Modifica a quantidade do itens para mais.

id = identificador do item.

qtd = quantidade a ser adicionada.

---

#### void CART.decreaseItem(string id, qtd = 1)

Modifica a quantidade de itens para menos, porém quando o item chega a um total de 0 ele será deletado do carrinho de compras automaticamente.

id = identificador do item.

qtd = quantidade a ser removida.

---

#### object CART.getItemObj(string id, key = null)

Retorna os objetos criados no campo "objs" na adição de um item.

id = identificado do item.

key = campo a ser recuperado, caso não informado será retornado todos os campos.

---

#### object | bool = false CART.getItem(string id)

Retorna os dados de um item do carrinho de compras por meio de seu ID.

---

#### object CART.total()

Retorna um objeto com dados de somatório de todo o carrinho.

Campos recuperados:

total = total do montante geral

qtd = total de quantidade de itens

taxa = total de taxa

discount = total de desconto

---

#### int CART.countType(string type)

Conta quantos produtos existem de um determinado tipo

---

#### void | object CART.removeItem(string id)

Remove um item do carrinho pelo seu ID. Retorna os dados do item removido.

---

#### void CART.removeCart ()

Remove todo o carrinho de compras do LocalStorage.

---

### void CART.discount (float amount, int type = 1, [{}] arr = [])

Aplica um um desconto do valor de **amount** no carrinho.

**type:** 1 || 2

Se **type** for igual a **1** é aplicado um desconto de **amount%** no valor total.

Se for igual a **2** é aplicado um desconto do valor de **amount** no total.

**arr**

É um array onde o usuario pode inserir objetos contendo o **id** de produtos **especificos** aos quais ele queira aplicar um desconto.

Ex: [{ id: 1 }, {id: 2}, {id: 3}...]
