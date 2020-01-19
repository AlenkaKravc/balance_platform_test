import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import ownerDocument from '../utils/ownerDocument';
import { useForkRef } from '../utils/reactHelpers';
import useEventCallback from '../utils/useEventCallback';

const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};

const mapEventPropToEvent = eventProp => eventProp.substring(2).toLowerCase();

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */

const ClickAwayListener = (props) => {
  const { children, onClickAway } = props;
  const props$mouseEvent = props.mouseEvent;
  const mouseEvent = props$mouseEvent === undefined ? 'onClick' : props$mouseEvent;
  const props$touchEvent = props.touchEvent;
  const touchEvent = props$touchEvent === undefined ? 'onTouchEnd' : props$touchEvent;
  const mountedRef = useMountedRef();
  const movedRef = useRef(false);
  const nodeRef = useRef(null); // can be removed once we drop support for non ref forwarding class components

  const handleOwnRef = useCallback(instance => {
    // #StrictMode ready
    nodeRef.current = ReactDOM.findDOMNode(instance);
  }, []);

  const handleRef = useForkRef(children.ref, handleOwnRef);
  const handleClickAway = useEventCallback(event => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    } // IE 11 support, which trigger the handleClickAway even after the unbind

    if (!mountedRef.current) {
      return;
    } // Do not act if user performed touchmove

    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    const node = nodeRef.current; // The child might render null.

    if (!node) {
      return;
    }

    const doc = ownerDocument(node);

    if (doc.documentElement && doc.documentElement.contains(event.target) && !node.contains(event.target)) {
      onClickAway(event);
    }
  });

  const handleTouchMove = useCallback(() => {
    movedRef.current = true;
  }, []);

  useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      document.addEventListener(mappedTouchEvent, handleClickAway);
      document.addEventListener('touchmove', handleTouchMove);
      return () => {
        document.removeEventListener(mappedTouchEvent, handleClickAway);
        document.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [handleClickAway, handleTouchMove, touchEvent]);

  useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      document.addEventListener(mappedMouseEvent, handleClickAway);
      return () => {
        document.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }

    return undefined;
  }, [handleClickAway, mouseEvent]);

  return React.createElement(
    React.Fragment,
    null,
    React.cloneElement(children, {
      ref: handleRef,
    }),
  );
};

export default ClickAwayListener;
