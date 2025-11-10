import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Button from '@/components/UI/Button.vue'

describe('Button.vue', () => {
  it('renders slot content', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Click Me',
      },
      mocks: {
        $style: {
          button: 'button',
          disabled: 'disabled',
        },
      },
    })
    expect(wrapper.text()).toBe('Click Me')
  })

  it('emits click event when not disabled', async () => {
    const wrapper = shallowMount(Button, {
      mocks: {
        $style: {
          button: 'button',
          disabled: 'disabled',
        },
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(2)
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = shallowMount(Button, {
      props: { disabled: true },
      mocks: {
        $style: {
          button: 'button',
          disabled: 'disabled',
        },
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
