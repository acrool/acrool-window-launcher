import type {Meta, StoryObj} from '@storybook/react';
import React, {createElement} from 'react';

import CaseWithUrlFail from './_cases/WithUrlFail';
import CaseWithUrlSuccess from './_cases/WithUrlSuccess';
import CaseWithHtmlSuccess from './_cases/WithHtmlSuccess';


const meta = {
    title: 'Primary/WindowLauncher',
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
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const WithUrlSuccess: Story = {
    render: function Render(args) {
        return <CaseWithUrlSuccess/>;
    },
};


export const WithUrlFail: Story = {
    render: function Render(args) {
        return <CaseWithUrlFail/>;
    },
};



export const WithHtmlSuccess: Story = {
    render: function Render(args) {
        return <CaseWithHtmlSuccess />;
    },
};

