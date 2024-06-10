// Need to figure out how to make this https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/yaml.min.js
// work with the example here https://github.com/speced/respec/wiki/pre-and-code-elements

var respecConfig = {
    //preProcess: [loadYaml],
 //   isPreview: true,
    format: "markdown",
    noTOC: false,
    maxTocLevel: 3,
//    additionalCopyrightHolders: "the Linux Foundation",
//    includePermalinks: true,
    latestVersion: "https://spec.openapis.org/oas/v3.1.0",
    github: {
        repoURL: "https://github.com/OAI/sig-moonwalk/",
        branch: "main"
    },
    logos:[{src:"https://raw.githubusercontent.com/OAI/OpenAPI-Style-Guide/master/graphics/bitmap/OpenAPI_Logo_Pantone.png",alt:"OpenAPI Initiative",height:48,url:"https://openapis.org/"}],
    specStatus: "unofficial", //Use "unofficial" for unofficial drafts
    shortName: "moonwalk-draft",  // This should become part of the latestVersion URL
    editors: [
      {
        name: "TBD"
      }
    ],
    localBiblio: {
        "CommonMark": {
            "title": "CommonMark syntax",
            "href": "https://spec.commonmark.org/",
            "status": "Living Standard",
            "publisher": "John MacFarlane"
        }
    }

  }
  