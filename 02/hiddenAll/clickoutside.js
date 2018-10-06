Vue.directive('clickoutside',{
    bind:function (el,binding,vnode) {
        console.log(el);
        console.log(binding);
        
        function documentHandler(e) {
            console.log(e.target);
            
            if(el.contains(e.target)){
                console.log('1');
                
                return false
            }
            if(binding.expression){
                binding.value(e)
            }
        }
        el.__vueClickOutSide__ = documentHandler 
        document.addEventListener('click',documentHandler)
    },
    unbind:function (el,binding) {        
        document.removeEventListener('click',el.__vueClickOutSide__)
        delete el.__vueClickOutSide__
    }
})