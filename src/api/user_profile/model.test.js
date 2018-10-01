import { UserProfile } from ".";
import { User } from "../user";

let user, userProfile;

beforeEach(async () => {
  user = await User.create({ email: "a@a.com", password: "123456" });
  userProfile = await UserProfile.create({ createdBy: user });
});

describe("view", () => {
  it("returns simple view", () => {
    const view = userProfile.view();
    expect(typeof view).toBe("object");
    expect(view.id).toBe(userProfile.id);
    expect(typeof view.createdBy).toBe("object");
    expect(view.createdBy.id).toBe(user.id);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it("returns full view", () => {
    const view = userProfile.view(true);
    expect(typeof view).toBe("object");
    expect(view.id).toBe(userProfile.id);
    expect(typeof view.createdBy).toBe("object");
    expect(view.createdBy.id).toBe(user.id);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
