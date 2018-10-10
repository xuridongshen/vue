Vue.component('vList', {
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    data: function () {
        return {
            currentList:[]
        }
    },
    render:function (h) {
        var _this = this
        var list = []

        this.list.forEach(function (item,index) {
            var node  = h('div',{
                attrs:{
                    class:'list-item'
                }
            },[
                h('span',item.name+':'),
                h('div',{
                    attrs:{
                        class:'list-msg'
                    }
                },[
                    h('p',item.message),
                    h('a',{
                        attrs:{
                            class:'list-reply'
                        },
                        on:{
                            click:function () {
                                _this.handleReply(index)
                            }
                        }
                    },'回复'),
                    h('a',{
                        attrs:{
                            class:'list-reply'
                        },
                        on:{
                            click:function () {
                                // console.log(index);
                                
                                _this.deleteMsg(index)
                            }
                        }
                    },'删除')
                ])
            ])
            list.push(node)
        })
        if(this.list.length){
            return h('div',{
                attrs:{
                    class:'list'
                }
            },list)
        }else{
            return h('div',{
                attrs:{
                    class:'list-nothing'
                }
            },'留言列表为空')
        }
        
    },
    methods:{
        handleReply:function (index) {
            this.$emit('reply',index)
        },
        deleteMsg:function (index) {
            this.list.splice(index,1)
        }
    }
})