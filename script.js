const Counter = {
    data() {
      return {
        validate:false,
        name:'',
        price:'',
        qtd:1,
        items:CART.getCart(),
        total:CART.total().total,
        itensQtd:CART.total().qtd
      }
    },
    methods:{
       addItem: function(){
             
         if(this.name.trim() != '' && this.price != ''){
          this.validate = false;
            CART.addItem({
                id:this.items.length,
                name:this.name,
                price:this.price,
                qtd:this.qtd
            });
            this.items = CART.getCart();
            this.total = CART.total().total; 

            this.name = '';
            this.price = '';
            this.qtd = 1;
            this.itensQtd = CART.total().qtd;

         }else{
           this.validate = true;
         }
       },
       removeItem:function(id){
        CART.removeItem(id);
        this.items = CART.getCart();
        this.total = CART.total().total;
       },
       removeCart:function(){
          CART.removeCart();
          this.items = CART.getCart();
          this.total = CART.total().total;
          this.itensQtd = CART.total().qtd;
       },
       somar:function(id){
           CART.increaseItem(id);
           this.items = CART.getCart();
           this.total = CART.total().total;
           this.itensQtd = CART.total().qtd;
       },
       diminuir:function(id){
           CART.decreaseItem(id);
           this.items = CART.getCart();
           this.total = CART.total().total;
           this.itensQtd = CART.total().qtd;
       }
    }
  }
  
  
  
  const app = Vue.createApp(Counter);

/*
  app.component('teste', {
    props:['value'],
    data() {
      return {
        count: 0
      }
    },
    template: '<div><button @click="count+=100" class="btn btn-primary">{{value}} - {{count}}</button></div>'
  });
*/

app.mount('#app');

  
