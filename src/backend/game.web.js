import { coupons } from "wix-marketing.v2";
import { webMethod, Permissions } from "wix-web-module";
import { elevate } from "wix-auth";

function createRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result.toUpperCase();
}

const elevatedGetCoupon = elevate(coupons.getCoupon);
const elevatedcreateCoupon = elevate(coupons.createCoupon);

export const generateCoupon = webMethod(Permissions.Anyone, async () => {
  const nowTs = Date.now();

  let specification = {
    name: "20% OFF for Game Winner",
    code: `WINNER${createRandomString(6)}20`,
    startTime: `${nowTs}`,
    expirationTime: `${nowTs + 86400000}`, // expire in 24 hours
    usageLimit: 1,
    limitPerCustomer: 1,
    limitedToOneItem: true,
    appliesToSubscriptions: false,
    active: true,
    scope: {
      namespace: "stores",
    },
    percentOffRate: 20,
  };

  const coupon = await elevatedcreateCoupon(specification);
  const _id = coupon._id;
  return await elevatedGetCoupon(_id);
});
