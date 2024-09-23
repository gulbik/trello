import { Meta, StoryObj } from '@storybook/react';
import { AddButton } from './AddButton';
import { fn } from '@storybook/test';

const meta: Meta<typeof AddButton> = {
    title: 'Components/AddButton',
    component: AddButton,
    argTypes: {
        variant: {
            control: 'radio',
            options: ['primary', 'ghost'],
        },
    },
    args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof AddButton>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Add Item',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Add Item',
    },
};
