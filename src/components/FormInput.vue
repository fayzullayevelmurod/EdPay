<template>
    <div class="input_wrapper">
        <label>{{label}}</label>
        <input
            v-model="default_value"
            @input="updateValue()"
            :class="`${isValue ? 'error' : ''} ${hidden_valid ? 'hidden-error' : ''}`" 
            :type="type" 
            @blur="checkValue()"
        >
        <input type="text">
        <span :class="!isValue ? 'hidden' : ''">{{error_title}}</span>
    </div>
</template>

<script>
export default {
    name: "FormInput",
    props: {
        idx: String,
        field_name: String,
        value: String,
        hidden_valid: {
            type: Boolean,
            defaul: false,
        },
        type: {
            type: String,
            defaul: 'text'
        },
        label: {
            type: String,
            defaul: "",
        },
        error_title: {
            type: String,
            defaul: "",
        },
        error: {
            type: Boolean,
            defaul: false,
        }
    },
    emits: ['update:value', 'check_value'],
    data () {
        return {
            isValue: false,
            default_value: '',
        }
    },
    watch: {
        value () {
            this.checkValue();
        }
    },
    methods: {
        checkValue () {
            if (this.default_value.length) {
                this.isValue = false;
                this.$emit('check_value', this.idx, this.field_name, false);
            } else {
                this.$emit('check_value', this.idx, this.field_name, true);
                this.isValue = true;
            }
        },
        updateValue () {
            this.$emit('update:value', this.default_value)
            this.checkValue();
        }
    }
}
</script>

<style>
.input_wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
}

.input_wrapper label {
    color: #7F848A;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.input_wrapper input {
    border-radius: 6px;
    border: 1px solid #F4F3F3;
    background: #F6F6F6;
    padding: 12px;
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    border: none;
    outline: none;
}

.input_wrapper input.error {
    border: 1px solid #FF5C65;
    background: rgba(255, 92, 101, 0.10);
}

.input_wrapper input.hidden-error {
    border: 1px solid #F4F3F3;
    background: #F6F6F6;
}

.input_wrapper span {
    color: #FF4D4F;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.input_wrapper span.hidden {
    opacity: 0;
}
</style>