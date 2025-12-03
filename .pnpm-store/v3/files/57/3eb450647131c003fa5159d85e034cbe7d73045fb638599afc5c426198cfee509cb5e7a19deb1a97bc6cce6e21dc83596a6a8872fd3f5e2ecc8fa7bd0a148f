import { AlignedPlacement } from '@floating-ui/core';
import { Alignment } from '@floating-ui/core';
import { ArrowOptions } from '@floating-ui/core';
import { AutoPlacementOptions } from '@floating-ui/core';
import { Axis } from '@floating-ui/core';
import { Boundary } from '@floating-ui/core';
import { ClientRectObject } from '@floating-ui/core';
import { ComputePositionConfig } from '@floating-ui/core';
import { ComputePositionReturn } from '@floating-ui/core';
import { Coords } from '@floating-ui/core';
import { Derivable } from '@floating-ui/core';
import { detectOverflow } from '@floating-ui/core';
import { DetectOverflowOptions } from '@floating-ui/core';
import { Dimensions } from '@floating-ui/core';
import { ElementContext } from '@floating-ui/core';
import { ElementRects } from '@floating-ui/core';
import { Elements } from '@floating-ui/core';
import { FlipOptions } from '@floating-ui/core';
import { FloatingElement } from '@floating-ui/core';
import { HideOptions } from '@floating-ui/core';
import { InlineOptions } from '@floating-ui/core';
import { Length } from '@floating-ui/core';
import { LimitShiftOptions } from '@floating-ui/core';
import { Middleware } from '@floating-ui/core';
import { MiddlewareArguments } from '@floating-ui/core';
import { MiddlewareData } from '@floating-ui/core';
import { MiddlewareReturn } from '@floating-ui/core';
import { MiddlewareState } from '@floating-ui/core';
import { OffsetOptions } from '@floating-ui/core';
import { Padding } from '@floating-ui/core';
import { Placement } from '@floating-ui/core';
import { Platform } from '@floating-ui/core';
import type * as React from 'react';
import { Rect } from '@floating-ui/core';
import { ReferenceElement } from '@floating-ui/core';
import { RootBoundary } from '@floating-ui/core';
import { ShiftOptions } from '@floating-ui/core';
import { Side } from '@floating-ui/core';
import { SideObject } from '@floating-ui/core';
import { SizeOptions } from '@floating-ui/core';
import { Strategy } from '@floating-ui/core';
import { VirtualElement } from '@floating-ui/core';

export { AlignedPlacement }

export { Alignment }

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
export declare const arrow: (options: ArrowOptions | Derivable<ArrowOptions>, deps?: React.DependencyList) => Middleware;

export { ArrowOptions }

/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
export declare const autoPlacement: (options?: AutoPlacementOptions | Derivable<AutoPlacementOptions>, deps?: React.DependencyList) => Middleware;

export { AutoPlacementOptions }

export { Axis }

export { Boundary }

export { ClientRectObject }

export { ComputePositionConfig }

export { ComputePositionReturn }

export { Coords }

export { detectOverflow }

export { DetectOverflowOptions }

export { Dimensions }

export { ElementContext }

export { ElementRects }

export { Elements }

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
export declare const flip: (options?: FlipOptions | Derivable<FlipOptions>, deps?: React.DependencyList) => Middleware;

export { FlipOptions }

export { FloatingElement }

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
export declare const hide: (options?: HideOptions | Derivable<HideOptions>, deps?: React.DependencyList) => Middleware;

export { HideOptions }

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
export declare const inline: (options?: InlineOptions | Derivable<InlineOptions>, deps?: React.DependencyList) => Middleware;

export { InlineOptions }

export { Length }

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
export declare const limitShift: (options?: LimitShiftOptions | Derivable<LimitShiftOptions>, deps?: React.DependencyList) => {
    fn: (state: MiddlewareState) => Coords;
    options: any;
};

export { Middleware }

export { MiddlewareArguments }

export { MiddlewareData }

export { MiddlewareReturn }

export { MiddlewareState }

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
export declare const offset: (options?: OffsetOptions, deps?: React.DependencyList) => Middleware;

export { OffsetOptions }

export { Padding }

export { Placement }

export { Platform }

export { Rect }

export { ReferenceElement }

export { RootBoundary }

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
export declare const shift: (options?: ShiftOptions | Derivable<ShiftOptions>, deps?: React.DependencyList) => Middleware;

export { ShiftOptions }

export { Side }

export { SideObject }

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
export declare const size: (options?: SizeOptions | Derivable<SizeOptions>, deps?: React.DependencyList) => Middleware;

export { SizeOptions }

export { Strategy }

export declare function useFloating(options?: UseFloatingOptions): UseFloatingReturn;

export declare interface UseFloatingOptions {
    /**
     * Where to place the floating element relative to the reference element.
     */
    placement?: Placement;
    /**
     * Array of middleware objects to modify the positioning or provide data for
     * rendering.
     */
    middleware?: Array<Middleware | null | undefined | false>;
    sameScrollView?: boolean;
    elements?: {
        reference?: any;
        floating?: any;
        offsetParent?: any;
    };
}

export declare interface UseFloatingReturn extends ComputePositionReturn {
    /**
     * Update the position of the floating element, re-rendering the component
     * if required.
     */
    update: () => void;
    /**
     * Object containing the reference and floating refs and reactive setters.
     */
    refs: {
        /**
         * A React ref to the reference element.
         */
        reference: React.MutableRefObject<any>;
        /**
         * A React ref to the floating element.
         */
        floating: React.MutableRefObject<any>;
        offsetParent: React.MutableRefObject<any>;
        /**
         * A callback to set the reference element (reactive).
         */
        setReference: (node: any) => void;
        /**
         * A callback to set the floating element (reactive).
         */
        setFloating: (node: any) => void;
        setOffsetParent: (node: any) => void;
    };
    elements: {
        reference: any;
        floating: any;
        offsetParent: any;
    };
    /**
     * Pre-configured positioning styles to apply to the floating element.
     */
    floatingStyles: {
        position: 'absolute';
        top: number;
        left: number;
    };
    scrollProps: {
        onScroll: (event: {
            nativeEvent: {
                contentOffset: {
                    x: number;
                    y: number;
                };
            };
        }) => void;
        scrollEventThrottle: 16;
    };
}

export { VirtualElement }

export { }
