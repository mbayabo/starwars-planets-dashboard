import { unmountComponentAtNode } from "react-dom";

describe("App", () => {
  describe("render()", () => {
    let container = null;
    beforeEach(() => {
      // setup a DOM element as a render target
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(() => {
      // cleanup on exiting
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    });

    test("Should fail on purpose", () => {
      fail("This fails on purpose");
    });
  });
});
