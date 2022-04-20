//Libraries
import Vuetify from "vuetify"
//Components
import HomeView from "@/views/HomeView.vue"
import {VContainer} from "vuetify/lib";
//Utilities
import { mount } from "@vue/test-utils"
//Setup
const vuetify = new Vuetify()

describe('first-spec', () => {
    it("wrapper", () => {
        const wrapper = mount(HomeView, {
            vuetify
        })
        const container = wrapper.findComponent(VContainer)
        expect(container.exists()).toBe(true)
    })
})
