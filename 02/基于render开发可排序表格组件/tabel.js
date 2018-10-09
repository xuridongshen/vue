Vue.component('v-table',{
    props:{
        columns:{
            type:Array,
            default:[]
        },
        data:{
            type:Array,
            default:[]
        }
    },
    data:function () {
        return {
            currentColumns:[],
            currentData:[]
        }
    },
    render:function (h) {
        var _this = this
        var ths = []
        this.currentColumns.forEach(function (col,index) {
            if(col.sortable){
                ths.push(h('th',[
                    h('span',col.title),
                    h('a',{
                        class:{
                            on:col._sortType === 'asc'
                        },
                        on:{
                            click:function () {
                                _this.handleSort(index,'asc')
                            }
                        }
                    },'↑'),
                    h('a',{
                        class:{
                            on:col._sortType === 'desc'
                        },
                        on:{
                            click(){
                                _this.handleSort(index,'desc')
                            }
                        }
                    },'↓')
                ]))
            }else{
                ths.push(h('th',col.title))
            }
        })
        var trs = []
        this.currentData.forEach(function (row,index) {
            var tds = []
            _this.currentColumns.forEach(function (cell) {
                tds.push(h('td',row[cell.key]))
            })
            trs.push(h('tr',tds))
        })
        return h('table',[
            h('thead',[
                h('tr',ths)
            ]),
            h('tbody',trs)
        ])

    },
    methods:{
        makeColumns:function () {
            this.currentColumns = this.columns.map(function (col,index) {
                col._sortType = 'normal'
                // 给当前的字段加一个索引
                col._index = index 
                return col
            })
        },
        makeData:function () {
            this.currentData = this.data.map(function (row,index) {
                // 给当前的字段加一个索引
                row._index = index
                return row
            }) 
        },
        handleSort:function (index,val) {
            var key = this.currentColumns[index].key
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal'
            })
            this.currentColumns[index]._sortType = val

            this.currentData.sort(function (a,b) {
                if(val === 'asc'){
                    return a[key] > b[key] ? 1 : -1
                }else if(val === 'desc'){
                    return a[key] < b[key] ? 1 : -1
                }
            })

        },
    },
    watch:{
        data:function () {
            
            this.makeData()
            
            var sortedColumn = this.currentColumns.filter(function (col) {
                return col._sortType !== 'normal'
            })
            
            
            if(sortedColumn.length > 0){
                
                if(sortedColumn[0]._sortType === 'asc'){
                    this.handleSort(sortedColumn[0]._index,'asc')
                }else{
                    this.handleSort(sortedColumn[0]._index,'desc')
                }
            }
            
        }
    },
    mounted:function() {
        // v-table 初始化
        this.makeColumns()
        this.makeData()
    },
})