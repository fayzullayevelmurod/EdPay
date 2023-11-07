<template>
    <div class="upload_file_wrapper">
        <input type="file" class="file" ref="file" @change="saveFile">
        <img v-if="typeof image_file == 'string'" @click="fileUpload()" :src="require(`@/assets/images/${image_file}`)" :class="`upload_image ${error ? 'hidden' : ''}`">
        <img @click="fileUpload()" src="@/assets/images/file_upload.svg" :class="`upload_image upload_image_main ${error ? 'hidden' : ''}`" ref="bg_img" :style="typeof image_file == 'string' ? 'display: none;' : ''">
        <img @click="fileUpload()" src="@/assets/images/file_upload_error.svg" :class="`upload_image ${!error ? 'hidden' : ''}`">
        <div class="text_wrap">
            <div v-if="!image_file" class="text_placehold">Допустимые форматы: jpg, jpeg, png. Рекомендуемый размер изображения 640х640, размер не более 5 МВ</div>
            <div v-else class="file_name">
                <div class="name">{{file_extention}} {{file_name}}</div>
                <div class="size">{{file_size}}</div>
            </div>
            <div class="buttons">
                <Button @clicked="fileUpload()" title="Выбрать файл" />
                <Button v-if="upload_library" :light="true" @clicked="openLibraray()" title="Выбрать из библиотеки"/>
                <button-remove v-if="image_file" @clicked="fileRemove()" />
            </div>
        </div>

        <!-- Choose photo library -->
        <modal-style v-if="open_library_modal" content_class="choose_photo" @modalClose="closeLibraryModal">
            <div class="title">Выберите фото</div>
            <div class="images">
                <div 
                    v-for="(image, img_idx) in library_images" 
                    :key="img_idx"
                    @click="checked_image_library = image"
                    :class="`image ${image == checked_image_library ? 'checked' : ''}`" 
                >
                    <img class="checkbox" src="@/assets/images/checkbox_icon.svg" alt="">
                    <img class="main_image" :src="require(`@/assets/images/${image}`)" alt="">
                </div>
            </div>
            <img src="@/assets/images/border_line.png" alt="" class="border_line">
            <Button :disabled="!checked_image_library" @clicked="selectLibraryPhoto()" title="Применить фото" />
        </modal-style>
    </div>
</template>

<script>
import Button from "@/components/Button.vue"
import ButtonRemove from "@/components/ButtonRemove.vue"
import file_upload_img from "@/assets/images/file_upload.svg";
import modalStyle from '@/components/ModalStyle.vue'

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
        modalStyle
    },
    data () {
        return {
            image_file: this.value,
            file_upload: file_upload_img,
            open_library_modal: false,
            library_images: [
                'library_image_1.png',
                'library_image_2.png',
                'library_image_3.png',
                'library_image_4.png',
                'library_image_5.png',
                'library_image_6.png',
                'library_image_7.png',
                'library_image_8.png',
            ],
            checked_image_library: null,
        }
    },
    watch: {
        open_library_modal () {
            if (this.open_library_modal) {
                $('body').css({
                    overflow: 'hidden',
                    marginRight: '21px',
                });
            } else {
                $('body').css({
                    overflow: 'auto',
                    marginRight: '0',
                });
            }
        }
    },
    computed: {
        file_extention () {
            let extention = '';
            if (this.image_file) {
                if (typeof this.image_file == 'string') {
                    extention = this.image_file.split('.').pop();
                    extention = extention.charAt(0).toUpperCase() + extention.slice(1);
                } else {
                    extention = this.image_file.name.split('.').pop();
                    extention = extention.charAt(0).toUpperCase() + extention.slice(1);
                }
            }
            return extention;
        },
        file_name () {
            let name = "";
            if (this.image_file) {
                if (typeof this.image_file == 'string') {
                    name = this.image_file.split('.')[0]
                } else {
                    name = this.image_file.name.split('.').slice(0, -1).join('.');
                }
            }
            return name;
        },
        file_size () {
            let size = "";
            if (this.image_file && typeof this.image_file != 'string') {
                let totalBytes = this.image_file.size;
                if(totalBytes < 1000000){
                    size = Math.floor(totalBytes/1000) + 'Kb';
                }else{
                    size = Math.floor(totalBytes/1000000) + 'Mb';
                }
                return '(' + size + ')';
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
        saveFile (e) {
            this.checked_image_library = null;
            if (e.target.files[0]) {
                this.image_file = e.target.files[0];
                let linkUrl = URL.createObjectURL(e.target.files[0]);
                this.$refs.bg_img.setAttribute('src', linkUrl);
                this.$emit('check_value', this.idx, this.field_name, false)
                this.$emit('update:value', this.image_file);
            } else {
                this.fileRemove();
            }
        },
        openLibraray () {
            this.open_library_modal = true;
        },
        closeLibraryModal () {
            this.open_library_modal = false;
        },
        selectLibraryPhoto () {
            this.image_file = this.checked_image_library;
            this.$emit('check_value', this.idx, this.field_name, false)
            this.$emit('update:value', this.image_file);
            this.open_library_modal = false;
        }
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