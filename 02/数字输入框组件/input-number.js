function isValueNumber(val) {
    return (/(^-?[0-9]+\.{1}\d+$) | (^-?[1-9][0-9]*$) | (^-?0{1}$)/).test(val + '') // 判断是否是数字
}

Vue.component('input-number', {
    props: {
        max: {
            type: Number, // 判断父组件传过来的值类型 是不是 数字类型
            default: Infinity
        },
        min: {
            type: Number, // 判断父组件传过来的值类型 是不是 数字类型
            dafault: -Infinity
        },
        value: {
            type: Number, // 判断父组件传过来的值类型 是不是 数字类型
            dafault: 0
        }
    },
    // 下面的 input 标签 内 绑定了value属性,给他赋值   还绑定了原生的change事件
    // button按钮 绑定了disabled属性  用来阻止在数据变动的过程中超出限制的范围
    template: `<div class="input-nummber">
        <input type="text" :value="currentValue" @keyup.up="handleUp" @keyup.down="handleDown" @change="handleChange"> 
        <button @click="handleDown" :disabled="currentValue <= min">-</button>
        <button @click="handleUp" :disabled="currentValue >= max">+</button>
        <button @click="handleDown10" :disabled="currentValue < 10">-10</button>
        <button @click="handleUp10" :disabled="(currentValue+10) > max">+10</button>
    </div>`,

    data: function () {
        return {
            currentValue: this.value // 用来承接父组件传过来的值
        }
    },

    watch: {
        currentValue: function (val) { // 监听子组件承接后的值得变化  并把变化的值传给自己
            this.$emit('input', val)
            this.$emit('on-change', val)
        },
        value: function (val) { // 监听父组件的值  并把值传给 自定义的事件  用以处理
            this.upDateValue(val)
        }
    },

    methods: {
        handleDown:function () {  // 减值-1
            if(this.currentValue <= this.min) return
            this.currentValue -= 1
        },
        handleUp:function () {  // 加值+1
            if(this.currentValue >= this.max) return
            this.currentValue += 1
        },
        handleDown10:function () {  // 减值-10
            if(this.currentValue < 10) return
            this.currentValue -= 10
        },
        handleUp10:function () {  // 加值+10
            if((this.currentValue + 10) > this.max) return
            this.currentValue += 10
        },
        upDateValue: function (val) { // 初始化值
            if (val > this.max) val = this.max
            if (val < this.min) val = this.min
            this.currentValue = val
        },
        handleChange:function (e) {  // 当值改变后 判断是否超出阀值 超出则给定最大值/最小值  负责原值输出
            
            var val = e.target.value.trim() // 获得input框内变动的值

            var max = this.max
            var min = this.min

            if(isValueNumber(val)){ // 判断是不是数字
                val = Number(val) // 转换类型
                this.currentValue = val // 赋值

                if(val > max){ // 超出范围的值  
                    this.currentValue = max
                }else if(val < min){
                    this.currentValue = min
                }

            }else{ // 如果不是数字  则 重置为之前的值
                e.target.value = this.currentValue
            }

        }
    },

    mounted: function () { // 初始化值 
        this.upDateValue(this.value)
    }
})