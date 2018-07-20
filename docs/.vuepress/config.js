// .vuepress/config.js
// missing markdownItAds boostnote admonitions
const fs = require('fs')

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}

const test = getDirectories('docs')
console.log(test)

var test2 = ['.vuepress','AI', 'blockchain']
let test5 = "{ text: \'Home\', link: \'/\' }, \n"

var arrayLength = test2.length;
for (var i = 0; i < arrayLength; i++) {
    test5 = test5 + "{ text : \'" + test2[i] + "\', " + "link: " + "\'/" + test2[i] + "/\'}, \n";
    //+ " \" " + ", link:" +  " \" " + test2[i] + " \" } \n";
    //var objCool = JSON.parse(test5)
    console.log(test5)
    //alert(myStringArray[i]);
    //Do something
}
fs.writeFile("docs/.vuepress/configNavbarDir.txt", test5, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("directory file is saved.");
}); 

module.exports = {
  base: '',
  //theme: 'cool',
  //dest: 'dist',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }]
  ],
  themeConfig: {
    //logo: './myAvatar.png',
    sidebar: true,
    sidebarDepth: 2,
    displayAllHeaders: true, // Default: false
    nav: [
     { text: 'Home', link: '/' },
     { text : '.vuepress', link: '/.vuepress/'},
     { text : 'AI', link: '/AI/'},
     { text : 'blockchain', link: '/blockchain/'},
    ],
    lastUpdated: 'Last Updated', // string | boolean
      // Assumes GitHub. Can also be a full GitLab url.
    repo: 'FriendlyUser/ENGRYear4BNotes',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'FriendlyUser/ENGRYear4BNotes',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!'

  },
  title: 'ENGR Year 4B (UVIC)',
  description: 'Selected computer engineering courses.',
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': '../img'
      }
    }
  },
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: true },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2,3, 4] },
    config: md => {
      // use more markdown-it plugins!
      md.set({html: true})
      md.use(require("markdown-it-katex"));
      md.use(require("markdown-it-task-lists"));
      md.use(require("markdown-it-plantuml"));
      md.use(require("markdown-it-admonition"));
      // use for easy syntax mermaid diagrams
 
    }
  }
}

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'Jan2019',
        'Feb2019',
        'Mar2019',
        'Apr2019'
      ]
    }
  ]
}