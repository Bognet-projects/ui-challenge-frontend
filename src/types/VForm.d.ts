import {Vue} from "vue-property-decorator";

export type VForm  = Vue & {
    validate: () => boolean;
    resetValidation: () => boolean;
    reset: () => void;
}
