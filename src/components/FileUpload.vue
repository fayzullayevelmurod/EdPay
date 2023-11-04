<template>
    <div class="upload_file_wrapper">
        <input type="file" class="file" ref="file" @change="saveFile">
        <img @click="fileUpload()" src="@/assets/images/file_upload.svg" :class="`upload_image ${error ? 'hidden' : ''}`" ref="bg_img">
        <img @click="fileUpload()" src="@/assets/images/file_upload_error.svg" :class="`upload_image ${!error ? 'hidden' : ''}`">
        <div class="text_wrap">
            <div v-if="!image_file" class="text_placehold">Допустимые форматы: jpg, jpeg, png. Рекомендуемый размер изображения 640х640, размер не более 5 МВ</div>
            <div v-else class="file_name">
                <div class="name">{{file_extention}} {{file_name}}</div>
                <div class="size">({{file_size}})</div>
            </div>
            <div class="buttons">
                <Button @clicked="fileUpload()" title="Выбрать файл" />
                <Button v-if="upload_library" :light="true" @clicked="uploadLibrary()" title="Выбрать из библиотеки"/>
                <button-remove v-if="image_file" @clicked="fileRemove()" />
            </div>
        </div>
    </div>
</template>

<script>
import Button from "@/components/Button.vue"
import ButtonRemove from "@/components/ButtonRemove.vue"
import file_upload_img from "@/assets/images/file_upload.svg";

export default {
    name: "FileUpload",
    props: {
        idx: String,
        field_name: String,
        value: Object,
        upload_library: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Boolean,
            default: false,
        }
    },
    emits: ['update:value', 'check_value'],
    components: {
        Button,
        ButtonRemove,
    },
    data () {
        return {
            image_file: null,
            file_upload: file_upload_img,
        }
    },
    computed: {
        file_extention () {
            let extention = '';
            if (this.image_file) {
                extention = this.image_file.name.split('.').pop();
                extention = extention.charAt(0).toUpperCase() + extention.slice(1);
            }
            return extention;
        },
        file_name () {
            let name = "";
            if (this.image_file) {
                name = this.image_file.name.split('.').slice(0, -1).join('.');
            }
            return name;
        },
        file_size () {
            let size = "";
            if (this.image_file) {
                let totalBytes = this.image_file.size;
                if(totalBytes < 1000000){
                    size = Math.floor(totalBytes/1000) + 'Kb';
                }else{
                    size = Math.floor(totalBytes/1000000) + 'Mb';
                }
            }
            return size;
        }
    },
    methods: {
        fileUpload () {
            this.$refs.file.click();
        },
        fileRemove () {
            this.$emit('check_value', this.idx, this.field_name, true);
            this.image_file = null;
            this.$refs.bg_img.setAttribute('src', this.file_upload);
            this.$emit('update:value', null);
        },
        uploadLibrary () {},
        saveFile (e) {
            if (e.target.files[0]) {
                this.$emit('check_value', this.idx, this.field_name, false)
                this.image_file = e.target.files[0];
                let linkUrl = URL.createObjectURL(e.target.files[0]);
                this.$refs.bg_img.setAttribute('src', linkUrl);
                this.$emit('update:value', this.image_file);
            } else {
                this.fileRemove();
            }
        },
    }
}
</script>

<style>
.upload_file_wrapper input[type="file"] {
    display: none;
}

.upload_file_wrapper .upload_image {
    cursor: pointer;
    width: 200px;
    height: 200px;
    border-radius: 8px;
    object-fit: cover;
}

.upload_file_wrapper .upload_image.hidden {
    display: none;
}

.upload_file_wrapper {
    display: flex;
    align-items: stretch;
    gap: 48px;
}

.upload_file_wrapper .text_wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.text_wrap .text_placehold {
    color: #7F848A;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    max-width: 474px;
    margin-bottom: 42px;
}

.file_name .name {
    color: #444B52;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    margin-bottom: 4px;
}

.file_name .size {
    color: #7F848A;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    margin-bottom: 38px;
}

.text_wrap .buttons {
    display: flex;
    align-items: center;
    gap: 18px;
}
</style>