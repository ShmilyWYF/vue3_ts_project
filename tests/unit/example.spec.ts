import {shallowMount} from '@vue/test-utils'
import Dashboard from "@/views/Dashboard/index.vue";

/**
 * shallowMount 将会创建一个包含被挂载和渲染的 Vue 组件的 Wrapper，只存根当前组件，不包含子组件。
 * describe(name, fn) 这边是定义一个测试套件，HelloWorld.vue 是测试套件的名字，fn 是具体的可执行的函数
 * it(name, fn) 是一个测试用例，输入框初始值为空字符串 是测试用例的名字，fn 是具体的可执行函数；一个测试套件里可以保护多个测试用例。
 * expect 是 Jest 内置的断言风格，业界还存在别的断言风格比如 Should、Assert 等。
 * toBe 是 Jest 提供的断言方法，比如expect(1+1).toBe(2)，更多的可以到Jest Expect 查看具体用法。
 */

describe('Dashboard.vue', () => {
    it('测试A', () => {
        const wrapper = shallowMount((Dashboard));
        // @ts-ignore
        const ok = wrapper.vm.ok();
        expect(ok).toBe(1)
    })
})
