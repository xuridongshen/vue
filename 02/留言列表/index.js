var app = new Vue({
    el: '#app',
    data: {
        username: '',
        message: '',
        list: []
    },
    methods: {
        handleUpData: function () {
            this.list.push({
                name: this.username,
                message: this.message
            })
            this.username = ''
            this.message = ''
        },
        handleReply: function (index) {
            var name = this.list[index].name
            this.message = '回复@' + name + ':'
            this.$refs.message.focus()
        }
    }
})