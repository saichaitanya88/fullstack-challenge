describe("BrowserTypeService.js", function () {
    it("tests Firefox userAgent");
    it("useragent should be firefox if seamonkey is not found in the string");
    it("useragent should be firefox if both firefox and seamonkey are found");
    it("tests chrome useragent");
    it("tests chromium useragent");
    it("tests safari useragent");
    it("tests IE user agent");
    it("tests seamonkey user agent");
    it("tests opera user agent")
});


describe("WebGLService.js", () => {
    it("isWebGLEnables is false if canvas cannot get webgl context");
    // mock or spy on document.createElement
    // then return canvas which is mocked to return null
    // in turn tests gl and responds with false

    // similarly mock positive scenario if needed.
});

describe("ZipCode Directive", () => {
    it("zip defaults to `N/A` when cityrecord.zip is null");
    it("zip is truthy if cityrecord.zip is also truthy");
});
describe("UserAgent Directive", () => {
    it("ua is truthy if cityrecord.userAgent is truthy");
    it("ua is falsy if cityrecord.userAgent is falsy");
    // actual results would be tested in "BrowserTypeService.js"
});