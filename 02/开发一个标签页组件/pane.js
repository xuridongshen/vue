Vue.component('pane-p', {
    name: 'pane',
    template: `
        <div class="pane" v-show="show">
            <slot>{{currentLabel}}</slot>
        </div>
    `,
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        },
    },
    data: function () {
        return {
            show: true,
            currentLabel : this.label
        }
    },
    methods: {
        updataNav() {
            this.$parent.updataNav()
        }
    },
    watch: {
        label() {
            this.updataNav()
        }
    },
    mounted() {
        this.updataNav()
    }
})