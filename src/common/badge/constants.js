import { ITEM_TYPE } from "@common/constants";

const BADGE_COLORS = {
  GRAY: "gray",
  PRIMARY: "primary",
  ERROR: "error",
  WARNING: "warning",
  SUCCESS: "success",
};

const BADGE_ICON_TYPE = [
  ITEM_TYPE.DEFAULT,
  ITEM_TYPE.ICON_LEADING,
  ITEM_TYPE.ICON_TRAILING,
  ITEM_TYPE.DOT,
  ITEM_TYPE.AVATAR,
  ITEM_TYPE.X_CLOSE,
  ITEM_TYPE.ONLY,
];

export { BADGE_COLORS, BADGE_ICON_TYPE };
