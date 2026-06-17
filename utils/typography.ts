import React from 'react';
import { Text, TextInput } from 'react-native';

const defaultTextStyle = {
  fontFamily: 'Pretendard',
  fontWeight: '500' as const,
};

const defaultInputStyle = {
  fontFamily: 'Pretendard',
  fontWeight: '500' as const,
};

function patchTextComponent(Component: unknown, defaultStyle: typeof defaultTextStyle) {
  const target = Component as {
    render?: (...args: unknown[]) => React.ReactElement;
    __myboogiPretendardPatched?: boolean;
  };

  if (!target.render || target.__myboogiPretendardPatched) return;

  const originalRender = target.render;
  target.render = function renderWithPretendard(...args: unknown[]) {
    const element = originalRender.apply(this, args);
    const props = element.props as { style?: unknown };
    return React.cloneElement(element as React.ReactElement<{ style?: unknown }>, {
      style: [defaultStyle, props.style],
    });
  };
  target.__myboogiPretendardPatched = true;
}

export function configurePretendardTypography() {
  patchTextComponent(Text, defaultTextStyle);
  patchTextComponent(TextInput, defaultInputStyle);
}
