// Need to figure out how to make this https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/yaml.min.js
// work with the example here https://github.com/speced/respec/wiki/pre-and-code-elements

var respecConfig = {
  // preProcess: [loadYaml],
  // isPreview: true,
  format: "markdown",
  // maxTocLevel: 3,
  latestVersion: "https://oai.github.io/sig-moonwalk/moonwalk.html",
  edDraftURI:
    "https://github.com/OAI/sig-moonwalk/blob/main/specification/moonwalk-source.md",
  subtitle: "Version 4.0.0-draft",
  // publishDate: "yyyy-mm-dd",
  logos: [
    {
      src: "https://raw.githubusercontent.com/OAI/OpenAPI-Style-Guide/master/graphics/bitmap/OpenAPI_Logo_Pantone.png",
      alt: "OpenAPI Initiative",
      height: 48,
      url: "https://openapis.org/",
    },
  ],
  specStatus: "unofficial", // Use "unofficial" for unofficial drafts, "base" for official versions
  shortName: "moonwalk-draft", // This should become part of the latestVersion URL
  editors: [
    {
      name: "TBD",
    },
  ],
  otherLinks: [
    {
      key: "Participate",
      data: [
        {
          value: "GitHub Moonwalk",
          href: "https://github.com/OAI/sig-moonwalk/",
        },
        {
          value: "File a bug",
          href: "https://github.com/OAI/sig-moonwalk/issues",
        },
        {
          value: "Commit history",
          href: "https://github.com/OAI/sig-moonwalk/commits/main/specification/moonwalk-source.md",
        },
        {
          value: "Pull requests",
          href: "https://github.com/OAI/sig-moonwalk/pulls",
        },
      ],
    },
  ],
  localBiblio: {
    CommonMark: {
      title: "CommonMark syntax",
      href: "https://spec.commonmark.org/",
      status: "Living Standard",
      publisher: "John MacFarlane",
    },
  },
};
