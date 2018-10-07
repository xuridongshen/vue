Vue.directive('clickoutside',{
    bind:function (el,binding,vnode) {
        // el 是指令所在的元素本身
        // binding 是指令需要传的函数
        function documentHandler(e) {            
            if(el.contains(e.target)){                
                return false
            }
            if(binding.expression){
                binding.value()// 用于执行上下文中methods中指定的函数
            }
        }
        el.__vueClickOutSide__ = documentHandler 
        // 监听全局
        document.addEventListener('click',documentHandler)
    },
    unbind:function (el,binding) {   // 移除事件监听     
        document.removeEventListener('click',el.__vueClickOutSide__)
        delete el.__vueClickOutSide__
    }
})