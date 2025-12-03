import { jsx as _jsx } from "react/jsx-runtime";
import { Stack, View, styled } from "@tamagui/core";
import { createContextScope } from "@tamagui/create-context";
import { composeEventHandlers, withStaticProperties } from "@tamagui/helpers";
var FORM_NAME = "Form",
  FormFrame = styled(Stack, {
    name: FORM_NAME,
    tag: "form"
  }),
  [createFormContext] = createContextScope(FORM_NAME),
  [FormProvider, useFormContext] = createFormContext(FORM_NAME),
  TRIGGER_NAME = "FormTrigger",
  FormTriggerFrame = styled(View, {
    name: TRIGGER_NAME
  }),
  FormTrigger = FormTriggerFrame.styleable(function (props, forwardedRef) {
    var {
        __scopeForm,
        children,
        onPress,
        ...triggerProps
      } = props,
      context = useFormContext(TRIGGER_NAME, __scopeForm);
    return /* @__PURE__ */_jsx(FormTriggerFrame, {
      tag: "button",
      ...triggerProps,
      ref: forwardedRef,
      onPress: composeEventHandlers(onPress, context.onSubmit),
      children
    });
  }),
  FormComponent = FormFrame.extractable(function (param) {
    var {
      onSubmit,
      ...props
    } = param;
    return /* @__PURE__ */_jsx(FormProvider, {
      scope: props.__scopeForm,
      onSubmit,
      children: /* @__PURE__ */_jsx(FormFrame, {
        ...props,
        onSubmit: function (e) {
          return e.preventDefault();
        }
      })
    });
  }),
  Form2 = withStaticProperties(FormComponent, {
    Trigger: FormTrigger
  });
export { Form2 as Form, FormFrame, FormProvider, FormTrigger, useFormContext };
//# sourceMappingURL=Form.native.js.map
