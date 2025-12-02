import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import { createContext, useCallback, useContext, useId, useSyncExternalStore } from "react";
import { getConfig } from "../config.mjs";
import { MISSING_THEME_MESSAGE } from "../constants/constants.mjs";
const ThemeStateContext = createContext(""),
  allListeners = /* @__PURE__ */new Map(),
  listenersByParent = {},
  HasRenderedOnce = /* @__PURE__ */new WeakMap(),
  HadTheme = /* @__PURE__ */new WeakMap(),
  PendingUpdate = /* @__PURE__ */new Map(),
  states = /* @__PURE__ */new Map(),
  localStates = /* @__PURE__ */new Map();
let shouldForce = !1;
const forceUpdateThemes = () => {
    cacheVersion++, shouldForce = !0, allListeners.forEach(cb => cb());
  },
  getThemeState = id => states.get(id);
let cacheVersion = 0,
  themes = null,
  rootThemeState = null;
const getRootThemeState = () => rootThemeState,
  useThemeState = (props, isRoot = !1, keys) => {
    const {
        disable
      } = props,
      parentId = useContext(ThemeStateContext);
    if (!parentId && !isRoot) throw new Error(MISSING_THEME_MESSAGE);
    if (disable) return states.get(parentId) || {
      id: "",
      name: "light",
      theme: getConfig().themes.light,
      inverses: 0
    };
    const id = useId(),
      subscribe = useCallback(cb => (listenersByParent[parentId] ||= /* @__PURE__ */new Set(), listenersByParent[parentId].add(id), allListeners.set(id, () => {
        PendingUpdate.set(id, shouldForce ? "force" : !0), cb();
      }), () => {
        allListeners.delete(id), listenersByParent[parentId].delete(id), localStates.delete(id), states.delete(id), PendingUpdate.delete(id);
      }), [id, parentId]),
      propsKey = getPropsKey(props),
      getSnapshot = () => {
        let local = localStates.get(id);
        const needsUpdate = props.passThrough ? !1 : isRoot || props.name === "light" || props.name === "dark" || props.name === null ? !0 : HasRenderedOnce.get(keys) ? keys?.current?.size ? !0 : props.needsUpdate?.() : !0,
          [rerender, next] = getNextState(local, props, propsKey, isRoot, id, parentId, needsUpdate, PendingUpdate.get(id));
        return PendingUpdate.delete(id), (!local || rerender) && (local = {
          ...next
        }, localStates.set(id, local)), process.env.NODE_ENV === "development" && props.debug === "verbose" && (console.groupCollapsed(` ${id} getSnapshot ${rerender}`, local.name, ">", next.name), console.info({
          props,
          propsKey,
          isRoot,
          parentId,
          local,
          next,
          needsUpdate
        }), console.groupEnd()), Object.assign(local, next), local.id = id, states.set(id, next), local;
      };
    process.env.NODE_ENV === "development" && globalThis.time && globalThis.time`theme-prep-uses`;
    const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    return useIsomorphicLayoutEffect(() => {
      if (!HasRenderedOnce.get(keys)) {
        HasRenderedOnce.set(keys, !0);
        return;
      }
      if (!propsKey) {
        HadTheme.get(keys) && scheduleUpdate(id), HadTheme.set(keys, !1);
        return;
      }
      process.env.NODE_ENV === "development" && props.debug === "verbose" && console.warn(` \xB7 useTheme(${id}) scheduleUpdate`, propsKey, states.get(id)?.name), scheduleUpdate(id), HadTheme.set(keys, !0);
    }, [keys, propsKey]), state;
  },
  getNextState = (lastState, props, propsKey, isRoot = !1, id, parentId, needsUpdate, pendingUpdate) => {
    const {
        debug
      } = props,
      parentState = states.get(parentId);
    if (props.passThrough) return [!1, lastState || parentState || {
      name: ""
    }];
    themes || (themes = getConfig().themes);
    const name = !propsKey && (!lastState || !lastState?.isNew) ? null : getNewThemeName(parentState?.name, props, pendingUpdate === "force" ? !0 : !!needsUpdate),
      isSameAsParent = parentState && (!name || name === parentState.name),
      shouldRerender = !!(needsUpdate && (pendingUpdate || lastState?.name !== parentState?.name));
    if (process.env.NODE_ENV === "development" && debug === "verbose") {
      const message = ` \xB7 useTheme(${id}) getNextState => ${name} needsUpdate ${needsUpdate} shouldRerender ${shouldRerender}`;
      console.groupCollapsed(message), console.trace({
        name,
        lastState,
        parentState,
        props,
        propsKey,
        id,
        isSameAsParent
      }), console.groupEnd();
    }
    if (isSameAsParent) return [shouldRerender, {
      ...parentState,
      isNew: !1
    }];
    if (!name) {
      const next = lastState ?? parentState;
      if (!next) throw new Error(MISSING_THEME_MESSAGE);
      return shouldRerender ? [!0, {
        ...(parentState || lastState)
      }] : [!1, next];
    }
    const scheme = getScheme(name),
      parentInverses = parentState?.inverses ?? 0,
      isInverse = parentState && scheme !== parentState.scheme,
      inverses = parentInverses + (isInverse ? 1 : 0),
      nextState = {
        id,
        name,
        theme: themes[name],
        scheme,
        parentId,
        parentName: parentState?.name,
        inverses,
        isInverse,
        isNew: !0
      };
    if (isRoot && (rootThemeState = nextState), pendingUpdate !== "force" && lastState && lastState.name === name) return [!1, nextState];
    const shouldAvoidRerender = pendingUpdate !== "force" && lastState && !needsUpdate && nextState.name === lastState.name;
    return process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed(` \xB7 useTheme(${id}) \u23ED\uFE0F ${name} shouldAvoidRerender: ${shouldAvoidRerender}`), console.info({
      lastState,
      needsUpdate,
      nextState,
      pendingUpdate
    }), console.groupEnd()), shouldAvoidRerender ? [!1, nextState] : [!0, nextState];
  };
function scheduleUpdate(id) {
  const queue = [id],
    visited = /* @__PURE__ */new Set();
  for (; queue.length;) {
    const parent = queue.shift(),
      children = listenersByParent[parent];
    if (children) for (const childId of children) visited.has(childId) || (visited.add(childId), queue.push(childId));
  }
  visited.forEach(childId => {
    allListeners.get(childId)?.();
  });
}
const validSchemes = {
  light: "light",
  dark: "dark"
};
function getScheme(name) {
  return validSchemes[name.split("_")[0]];
}
function getNewThemeName(parentName = "", {
  name,
  reset,
  componentName,
  inverse,
  debug
}, forceUpdate = !1) {
  if (name && reset) throw new Error(process.env.NODE_ENV === "production" ? "\u274C004" : "Cannot reset and set a new name at the same time.");
  const {
    themes: themes2
  } = getConfig();
  if (reset) {
    if (parentName === "light" || parentName === "dark") return parentName === "light" ? "dark" : "light";
    const lastPartIndex = parentName.lastIndexOf("_"),
      name2 = lastPartIndex <= 0 ? parentName : parentName.slice(lastPartIndex),
      scheme = parentName.slice(0, lastPartIndex);
    return themes2[name2] ? name2 : scheme;
  }
  const parentParts = parentName.split("_"),
    lastName = parentParts[parentParts.length - 1];
  lastName && lastName[0].toLowerCase() !== lastName[0] && parentParts.pop();
  const subNames = [name && componentName ? `${name}_${componentName}` : void 0, name, componentName].filter(Boolean);
  let found = null;
  if (name) {
    const nameHasScheme = getScheme(name);
    if (nameHasScheme) {
      for (const subName of subNames) if (subName in themes2) {
        found = subName;
        break;
      }
    }
    if (!found && !nameHasScheme) {
      const parentScheme = getScheme(parentName);
      if (parentScheme) {
        const parentBase = parentParts.join("_"),
          withScheme = [componentName ? `${parentBase}_${name}_${componentName}` : void 0, `${parentBase}_${name}`, componentName ? `${parentScheme}_${name}_${componentName}` : void 0, `${parentScheme}_${name}`].filter(Boolean);
        for (const potential of withScheme) if (potential in themes2) {
          found = potential;
          break;
        }
      }
    }
  }
  if (!found) if (!name && componentName) {
    const potential = `${parentParts.join("_")}_${componentName}`;
    potential in themes2 && (found = potential);
  } else {
    const max = parentParts.length;
    for (let i = 0; i <= max; i++) {
      const base = (i === 0 ? parentParts : parentParts.slice(0, -i)).join("_");
      for (const subName of subNames) {
        const potential = base ? `${base}_${subName}` : subName;
        if (potential in themes2) {
          found = potential;
          break;
        }
      }
      if (found) break;
    }
  }
  if (inverse) {
    found ||= parentName;
    const scheme = found.split("_")[0];
    found = found.replace(new RegExp(`^${scheme}`), scheme === "light" ? "dark" : "light");
  }
  return !forceUpdate && found === parentName &&
  // if its a scheme only sub-theme, we always consider it "new" because it likely inverses
  // and we want to avoid reparenting
  !validSchemes[found] ? null : found;
}
const getPropsKey = ({
    name,
    reset,
    inverse,
    forceClassName,
    componentName
  }) => `${name || ""}${inverse || ""}${reset || ""}${forceClassName || ""}${componentName || ""}`,
  hasThemeUpdatingProps = props => "inverse" in props || "name" in props || "reset" in props || "forceClassName" in props;
export { ThemeStateContext, forceUpdateThemes, getRootThemeState, getThemeState, hasThemeUpdatingProps, useThemeState };
//# sourceMappingURL=useThemeState.mjs.map
