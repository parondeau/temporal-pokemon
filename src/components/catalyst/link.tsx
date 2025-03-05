import * as Headless from '@headlessui/react';
import React, { forwardRef } from 'react';
import { type LinkProps, Link as ReactRouterLink } from 'react-router';

export const Link = forwardRef(function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Headless.DataInteractive>
      <ReactRouterLink {...props} ref={ref} />
    </Headless.DataInteractive>
  );
});
