//Libraries
import Vuetify from "vuetify"
//Components
import HomePage from "@/pages/Home.vue"
import {VContainer} from "vuetify/lib";
//Utilities
import { mount } from "@vue/test-utils"
//Setup
const vuetify = new Vuetify()

describe('first-spec', () => {
    it("wrapper", () => {
        const wrapper = mount(HomePage, {
            vuetify
        })
        const container = wrapper.findComponent(VContainer)
        expect(container.exists()).toBe(true)
    })
})
