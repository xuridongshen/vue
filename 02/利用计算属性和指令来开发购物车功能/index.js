var app = new Vue({
  el: '#app',
  data: {
    list: [
      {
        id: 1,
        name: 'iPhone 7',
        price: 6188,
        count: 1
      },
      {
        id: 1,
        name: 'iPhone 8',
        price: 7188,
        count: 1
      },
      {
        id: 1,
        name: 'iPhone 9',
        price: 8188,
        count: 1
      },
      {
        id: 1,
        name: 'iPhone 10',
        price: 9188,
        count: 1
      },
      {
        id: 1,
        name: 'iPhone 11',
        price: 10188,
        count: 1
      }
    ]
  },
  computed: {
    totalPrice: function() {
      var total = 0
      for (var i = 0; i < this.list.length; i++) {
        var item = this.list[i]
        total += item.price * item.count
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    }
  },
  methods: {
    handleReduce: function(index) {
      if(this.list[index].count === 1) return
      this.list[index].count--
    },
    handleAdd: function(index) {
      this.list[index].count++
    },
    handleRemove: function(index) {
      this.list.splice(index,1)
    }
  }
})
