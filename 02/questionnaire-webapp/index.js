var app = new Vue({
    el: '#app',
    data: {
        msg: {
            'one': {
                id: 1,
                title: '1.请问您的性别是:',
                show: true,
                list: [{
                        sex: '男',
                        status: false
                    },
                    {
                        sex: '女',
                        status: false
                    },
                    {
                        sex: '保密',
                        status: false
                    }
                ]
            },
            'two': {
                id: 2,
                title: '2.请选择您的兴趣爱好:',
                show: false,
                list: [{
                        aihao: '看书',
                        status: false
                    },
                    {
                        aihao: '游泳',
                        status: false
                    },
                    {
                        aihao: '跑步',
                        status: false
                    },
                    {
                        aihao: '看电影',
                        status: false
                    },
                    {
                        aihao: '听音乐',
                        status: false
                    },
                ]
            },
            'three': {
                id: 3,
                title: '3.请介绍一下自己:',
                content: '不少于100字',
                show: false,
            }
        },
        hear:1,
        isChooseMe:false,
        prve:false,
        nextText:'下一步',
        isFooter_active_1:true,
        isFooter_active_2:false,
    },
    methods: {
        handleChooseMe:function (index) {
            this.msg.one.list.forEach(function (item,ind) {
                if(index == ind){
                    item.status = true
                }else{
                    item.status = false
                }
            })
            this.isChooseMe = true
        },
        handleChooseCheckbox:function (index) {
            var count = 0;
            this.msg.two.list.forEach(function (item,ind) {
                if(index == ind){
                    item.status = !item.status
                }
                if(item.status) return count++
            })
            
            if(count >=2 && count <= 3){
                this.isChooseMe = true
            }else{
                this.isChooseMe = false
            }
        },
        handleNextUp:function (val) {
            if(!this.isChooseMe) return
            for (var key in this.msg) {
                var data = this.msg[key]
                data.show = false
            }

            switch (this.hear) {
                case 1:
                    this.msg.two.show = true
                    this.hear = 2
                    this.isChooseMe = false
                    this.prve = true
                    this.isFooter_active_1 = false
                    this.isFooter_active_2 = true
                    break;
                case 2:
                    this.msg.three.show = true
                    this.hear = 3
                    this.isChooseMe = false
                    this.nextText = '提交'
                    break;
            }
            
        },
        handleUpPrev:function () {
            switch (this.hear) {
                case 2:
                    this.msg.two.show = false
                    this.msg.one.show = true
                    this.hear = 1
                    this.isChooseMe = true
                    this.prve = false
                    this.isFooter_active_1 = true
                    this.isFooter_active_2 = false
                    break;
                case 3:
                    this.msg.three.show = false
                    this.msg.two.show = true
                    this.hear = 2
                    this.isChooseMe = true
                    this.nextText = '下一步'
                    break;
            }
        },
        desInput:function () {
            var textLenth = this.msg.three.content.length
            // console.log(e);
            if(textLenth >= 100){
                this.isChooseMe = true
            }
            
        }
    },
    directives: {
        on_click: {
            
        }
    }
})