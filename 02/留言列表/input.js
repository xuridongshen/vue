Vue.component('vInput', {
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    data: function () {
        return {
            currentInputValue: ''
        }
    },
    render: function (h) {
        var _this = this
        return h('div', {
            class: {
                mesUserName: true
            }
        }, [
            h('span', '昵称:'),
            h('input', {
                attrs: {
                    type: 'text'
                },
                domProps: {
                    value: this.currentInputValue
                },
                on: {
                    input: function (e) {
                        _this.currentInputValue = e.target.value
                        _this.$emit('input', e.target.value)
                    }
                }
            })
        ])
    },
    methods: {
        init: function () {
            this.currentInputValue = this.value
        }
    },
    watch: {
        value: function () {
            this.init()
        }
    },
    mounted() {
        this.init()
    },
})
Vue.component('vTextare', {
    props:{
        value:{
            type:String,
            default:''
        }
    },
    data: function () {
        return {
            currentTextValue: ''
        }
    },
    render: function (h) {
        var _this = this
        return h('div', {
            class: {
                msgTextArea: true
            }
        }, [
            h('span', '留言内容:'),
            h('textarea', {
                domProps: {
                    value: this.currentTextValue
                },
                attrs: {
                    placeholder: '请输入留言内容',
                },
                ref:'message',
                on: {
                    input: function (e) {
                        _this.currentTextValue = e.target.value
                        _this.$emit('input', e.target.value)

                    }
                }
            })
        ])
    },
    methods: {
        init: function () {
            this.currentTextValue = this.value
        },
        focus: function () {
            this.$refs.message.focus()
        }
    },
    watch:{
        value:function () {  
            this.init()
        }
    },
    mounted() {
        this.init()
    },
})