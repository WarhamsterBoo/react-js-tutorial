import { boolean, number, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { ImageLocal } from "./ImageLocal";
import { ImageRandom } from "./ImageRandom";
import { ImageServer } from "./ImageServer";

storiesOf("Images", module)
  .addDecorator(withKnobs)
  .lokiSkip("RandomImages", () => (
    <ImageRandom
      key="jsx"
      interval={number("interval", 1000)}
      isActive={boolean("is active", true)}
    />
  ))
  .lokiSkip("LocallyCreatedURL", () => (
    <ImageLocal key="jsx" id={number("id", 3)} />
  ))
  .lokiSkip("RemotelyCreatedURL", () => (
    <ImageServer key="jsx" id={number("id", 7)} />
  ));
