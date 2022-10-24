import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react-native";

import { AppProvider } from "../../../../contexts/app";
import { Button } from "./";

import { Row } from "@atoms/Row";
import { Spacer } from "@atoms/Spacer";
import styled from "styled-components/native";
import { View } from "react-native";
const AppDecorator = (storyFn) => {
  return <AppProvider>{storyFn()}</AppProvider>;
};

export default {
  title: "Button",
  component: Button,
  args: {
    text: "Button",
  },
  decorators: [AppDecorator],
} as ComponentMeta<typeof Button>;

const TemplateAll: ComponentStory<typeof Button> = (args) => (
  <>
    <StyledGroup>
      <Row align="center">
        <Button {...args} text="" big icon="x" />
        <Button {...args} text="" icon="x" />
        <Button {...args} text="" small icon="x" />
      </Row>
      <Spacer medium />
      <Row align="center">
        <Button {...args} big />
        <Button {...args} />
        <Button {...args} small />
      </Row>
      <Spacer medium />
      <Row align="center">
        <Button {...args} big icon="x" />
        <Button {...args} icon="x" />
        <Button {...args} small icon="x" />
      </Row>
    </StyledGroup>
    <StyledGroup>
      <Row align="center">
        <Button {...args} text="" big stroke icon="x" />
        <Button {...args} text="" stroke icon="x" />
        <Button {...args} text="" stroke small icon="x" />
      </Row>
      <Spacer medium />
      <Row align="center">
        <Button {...args} stroke />
        <Button {...args} white stroke />
        <Button {...args} primary stroke />
      </Row>
      <Spacer medium />
      <Row align="center">
        <Button {...args} stroke icon="x" />
        <Button {...args} white stroke icon="x" />
        <Button {...args} primary stroke icon="x" />
      </Row>
    </StyledGroup>
    <StyledGroup>
      <Row align="center">
        <Button {...args} white big icon="x" text="" />
        <Button {...args} white icon="x" text="" />
        <Button {...args} white small icon="x" text="" />
      </Row>
      <Spacer medium />
      <Row align="center">
        <Button {...args} white big />
        <Button {...args} white />
        <Button {...args} white small />
      </Row>
      <Spacer medium />
      <Row align="center">
        <Button {...args} white big icon="x" />
        <Button {...args} white icon="x" />
        <Button {...args} white small icon="x" />
      </Row>
    </StyledGroup>
    <StyledGroup>
      <Row align="center">
        <Button {...args} primary big icon="x" text="" />
        <Button {...args} primary icon="x" text="" />
        <Button {...args} primary small icon="x" text="" />
      </Row>
      <Spacer medium />
      <Row align="center">
        <Button {...args} primary big />
        <Button {...args} primary />
        <Button {...args} primary small />
      </Row>
      <Spacer medium />
      <Row align="center">
        <Button {...args} primary big icon="x" />
        <Button {...args} primary icon="x" />
        <Button {...args} primary small icon="x" />
      </Row>
    </StyledGroup>
  </>
);
TemplateAll.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/HTfXzq7MpAEQ9zPrzuUCC8/FinTrack?node-id=102%3A1559",
  },
};

export const All = TemplateAll.bind({});
All.args = {};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
Template.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/HTfXzq7MpAEQ9zPrzuUCC8/FinTrack?node-id=102%3A1559",
  },
};

export const Default = Template.bind({});
Default.args = {};

export const IconOnly = Template.bind({});
IconOnly.args = {
  icon: "x",
  text: "",
};
IconOnly.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/HTfXzq7MpAEQ9zPrzuUCC8/FinTrack?node-id=102%3A1559",
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: "x",
};

export const WithIconRight = Template.bind({});
WithIconRight.args = {
  icon: "x",
  iconRight: true,
};

const StyledGroup = styled(View)`
  padding: 40px 0;
`;
