<template>
    <div class="input_wrapper">
        <label v-html="label"></label>
        <input
            v-if="type !== 'phone' && type != 'textarea' && type != 'money'"
            v-model="default_value"
            @input="updateValue()"
            :class="`${isValue ? 'error' : ''} ${error ? 'error' : ''} ${hidden_valid ? 'hidden-error' : ''}`" 
            :type="type" 
            @blur="checkValue()"
            :placeholder="placeholder"
        >
        <textarea 
            v-if="type == 'textarea'"
            v-model="default_value"
            @input="updateValue()"
            :class="`${isValue ? 'error' : ''} ${error ? 'error' : ''} ${hidden_valid ? 'hidden-error' : ''}`" 
            :type="type" 
            @blur="checkValue()"
            :placeholder="placeholder"
        ></textarea>
        <input
            v-if="type === 'phone'"
            v-model="maskedValue"
            v-maska="bindedObject"
            data-maska="+7(###)###-##-##"
            @blur="checkValue()"
            @maska="updateValue()"
            :placeholder="placeholder"
            :class="`${isValue ? 'error' : ''} ${error ? 'error' : ''} ${hidden_valid ? 'hidden-error' : ''}`" 
        />
        <input
            v-if="type === 'money'"
            v-model="maskedValue"
            v-maska="bindedObject"
            data-maska="9 99#.##"
            data-maska-tokens="9:[0-9]:repeated"
            data-maska-reversed
            @maska="updateValue()"
            @blur="checkValue()"
            :placeholder="placeholder"
            :class="`${isValue ? 'error' : ''} ${error ? 'error' : ''} ${hidden_valid ? 'hidden-error' : ''}`" 
        >
        <span :class="`${!isValue ? 'hidden' : ''} ${error ? 'error' : ''}`">{{error_title}}</span>
    </div>
</template>

<script>
import { vMaska } from "maska";

export default {
    name: "FormInput",
    directives: { maska: vMaska },
    props: {
        idx: String,
        field_name: String,
        value: [String, Number],
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
        },
        placeholder: {
            type: String,
            defaul: ''
        }
    },
    emits: ['update:value', 'check_value'],
    data () {
        return {
            maskedValue: this.value,
            bindedObject: {
                masked: "",
                unmasked: "",
                completed: false,
            },
            isValue: false,
            default_value: this.value,
        }
    },
    methods: {
        checkValue () {
            if (this.default_value && this.default_value.length) {
                if (this.type === 'email') {
                    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.default_value)) {
                        this.$emit('check_value', this.idx, this.field_name, true);
                        this.isValue = true
                    } else {
                        this.$emit('check_value', this.idx, this.field_name, false);
                        this.isValue = false;
                    }
                } else {
                    this.isValue = false;
                    this.$emit('check_value', this.idx, this.field_name, false);
                }
            } else {
                if (typeof this.default_value == 'number') {
                    if (!String(this.default_value).length) {
                        this.isValue = true;
                        this.$emit('check_value', this.idx, this.field_name, true);
                    }
                    if (String(this.default_value).length == 1) {
                        this.isValue = false;
                        this.$emit('check_value', this.idx, this.field_name, false);
                    }
                } else {
                    this.isValue = true;
                    this.$emit('check_value', this.idx, this.field_name, true);
                }
            }
        },
        updateValue () {
            if (this.type == 'phone' || this.type == 'money') {
                this.default_value = this.bindedObject.unmasked;
            }
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
    border: 1px solid transparent;
}

.input_wrapper input::placeholder {
    color: #BEC1C5;
}

.input_wrapper textarea {
    border-radius: 6px;
    border: 1px solid #F4F3F3;
    background: #F6F6F6;
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    outline: none;
    padding: 12px;
    min-height: 149px;
    resize: vertical;
}

.input_wrapper input.error,
.input_wrapper textarea.error {
    border: 1px solid #FF5C65;
    background: rgba(255, 92, 101, 0.10);
}

.input_wrapper input.hidden-error,
.input_wrapper textarea.hidden-error {
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

.input_wrapper span.error {
    opacity: 1 !important;
    display: block !important;
}
</style>