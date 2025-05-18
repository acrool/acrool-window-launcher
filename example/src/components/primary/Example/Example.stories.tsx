import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';

import Example from './Example';


const meta = {
    title: 'Primary/Example',
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Custom skeleton by component'
            },
        },
    },
    // tags: ['autodocs'],
    argTypes: {},
    args: {},
    render: function Render(args) {
        return <Example/>;
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const WithSuccess: Story = {
    args: {
    },
};

