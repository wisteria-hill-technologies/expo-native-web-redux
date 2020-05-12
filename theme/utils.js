import theme from "./index";

export const selectColor = (state) => {
  switch(state) {
    case "success":
      return theme.colors.success;
    case "warning":
      return theme.colors.warning;
    case "danger":
      return theme.colors.danger;
    case "info":
      return theme.colors.info;
    default:
      return "";
  }
};

