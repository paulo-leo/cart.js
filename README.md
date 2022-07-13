# CartJS

O CartJS é uma pequena biblioteca desenvolvida em JavaScript com o objetivo de criar e gerenciar um carrinho de compras  utilizando a API LocalStorage. O carrinho é armazenada de forma criptografada para dificultar o acesso e manipulação direta dos itens por meio de um usuário mais avançado.  A biblioteca tem um jeito muito simples de ser utilizada, pois o seu funcionamento se baseia no conceito de objetos do javaScript. 



#### bool CART.hasCart()

Verifica  se o carrinho existe.  

------



#### bool CART.addItem(object values)

Adiciona um produto/item no carrinho.

Abaixo segue a tabela com os campos que devem ser passados no parâmetro "values" e que poderão ser recuperados posteriormente. 

| Campo       | Tipo e padrão | Descrição                                                    |
| ----------- | ------------- | :----------------------------------------------------------- |
| name        | string        | Nome do item                                                 |
| price       | float         | Valor do item                                                |
| img         | string = null | Caminho da imagem do item                                    |
| qtd         | int = 1       | Quantidade de item. A biblioteca fará o cálculo automaticamente, multiplicando a "qtd" com o "price" . |
| discount    | float = null  | Acrescenta um valor de desconto ao item. O cálculo é automotivo. |
| taxa        | float = null  | Acrescenta um valor de taxa ao item. O cálculo é automotivo. |
| code        | string = null | Código do item.                                              |
| interval    | int = 0       | ----------------------------------------------               |
| description | string = null | Descrição do item.                                           |
| amount      | ----------    | Campo que armazena o total de itens somando a quantidade e os seus valores. Esse campo é criado automaticamente pela biblioteca e poderá ser recuperado posteriormente ao consultar o item. |
| address     | string = null | Endereço do item.                                            |
| type        | string = 1    | Armazena o tipo de item.                                     |
| objs        | object = {}   | Permite passar um objeto JavaScript personalizado no item.  Você pode usar o método  "CART.getItemObj()" para recuperar os itens. |



------



#### object| json CART.getCart(bool json =  false)

Retorna um array com dados de todo o carrinho. Se o parâmetro for igual a true, o tipo de retorno será JSON ao invés do objeto do JavaScript.



------



#### bool | object CART.checkItem(string id = null)

Verifica se o item existe por meio do ID do item. Caso não seja informado um id no parâmetro da função será retornado um objeto JavaScript dos itens. 



------



#### void CART.increaseItem(string id, int qtd = 1)

Modifica a quantidade do itens para mais. 

id  =  identificador do item.

qtd = quantidade a ser adicionada. 



------



#### void CART.decreaseItem(string id, qtd = 1)

Modifica a quantidade de itens para menos, porém quando o item chega a um total de 0 ele será deletado do carrinho de compras automaticamente.

id  =  identificador do item.

qtd = quantidade a ser removida. 



------



#### object  CART.getItemObj(string id, key = null) 

Retorna os objetos criados no campo "objs" na adição de um item. 

id = identificado do item.

key = campo a ser recuperado, caso não informado será retornado todos os campos. 





------



#### object | bool = false CART.getItem(string id) 

Retorna os dados de um item do carrinho de compras por meio de seu ID.



------



#### object CART.total() 

Retorna um objeto com dados de somatório de todo o carrinho. 

Campos recuperados: 

total = total do montante geral 

qtd = total de  quantidade  de itens

taxa = total de taxa

discount = total de desconto



------



#### int CART.countType(string type)

Conta quantos produtos existem de um determinado tipo



------



#### void | object CART.removeItem(string id)

Remove um item do carrinho pelo seu ID. Retorna os dados do item removido.



------



#### void CART.removeCart () 

Remove todo o carrinho de compras do LocalStorage.

