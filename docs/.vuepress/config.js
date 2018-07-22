// .vuepress/config.js
// missing markdownItAds boostnote admonitions
const fs = require('fs')
const path = require('path')
const util = require('util')



// used for testing function 
function testing() {
    const testFail = genNavBarList()

    console.log(testFail) 

    console.log('This is not of interest')

    return 2323232323232
    const dirNames = getDirectories('docs')
    console.log(dirNames)

    // navbar settings
    let navBarNames = "{ text: \'Home\', link: \'/\' }, \n"

    var numOfDirs = dirNames.length;
    for (var i = 0; i < numOfDirs; i++) {
        // not last entry
        if (i != numOfDirs -1 ) {
            navBarNames = navBarNames + "{ text : \'" + dirNames[i] + "\', " + "link: " + "\'/" + dirNames[i] + "/\'}, \n";
        }
        // last entry 
        else {
            navBarNames = navBarNames + "{ text : \'" + dirNames[i] + "\', " + "link: " + "\'/" + dirNames[i] + "/\'}, \n";
        }
        console.log(navBarNames)
    }

    fs.writeFile("docs/.vuepress/configNavbarDir.txt", navBarNames, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("navbar directory file is saved.");
    }); 

    var files = []
    // sidebar settings
    for (var i=0; i < dirNames.length; i++) {
        const relPath = path.join('docs', dirNames[i])
        fromDir(relPath,/\.md$/,function(filename){
            console.log('-- found: ',filename);
            files.push(filename)
        });
    }
        
    fs.writeFile("docs/.vuepress/configSideBarList.txt", files, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("sidebar directory file is saved.");
    }); 

    const coolTest = genSideBarConfigFolder('Title Test','Test')
    fs.writeFile("docs/.vuepress/configSideBarListTest.txt", coolTest, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("sidebar Good directory file is saved.");
    }); 
}

module.exports = {
  base: '/markdown-notes-template/',
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
    nav:  genNavBarList(),
    // consider making this sidebar generation completely automatic, but would I prefer to make some control over titling and selected folders that are displayed.   
    sidebar: { 
      '/Test/': genSideBarConfigFolder('Epic Test','/Test/'),
      '/': [
      ''
      ]
    },
    sidebarDepth: 2,
    lastUpdated: 'Last Updated', // string | boolean
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'FriendlyUser/markdown-notes-template',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',
    // Optional options for generating "Edit this page" link
    // if your docs are in a different repo from your main project:
    //docsRepo: 'FriendlyUser/markdown-notes-template',
    // if your docs are not at the root of the repo:
    //docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'gh-pages',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!'

  },
  title: 'Vuepress Notes',
  description: 'Boostnote notes converted to Vuepress wiki',
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


// Helper functions
function fromDir(startPath,filter,callback){
  
    //console.log('Starting from dir '+startPath+'/');
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter,callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    };
};

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    if (file != '.vuepress') {
        return fs.statSync(path+'/'+file).isDirectory();
    }
  });
}

function getFilesInDir(directoryName) {
    var files = []
    // sidebar settings
    const relPath = path.join('docs', directoryName)
    fromDir(relPath,/\.md$/,function(filename){
        console.log('-- found: ',filename);
        files.push(filename)
    });
    return files
}

// Base file names with removed file extensions
function getFilesInDirBase(directoryName) {
    var files = []
    // sidebar settings
    const relPath = path.join('docs', directoryName)
    fromDir(relPath,/\.md$/,function(filename){
        console.log('-- found: ',filename);
        let baseName = path.basename(filename)
        // this it will fail on files without extension, see https://stackoverflow.com/questions/4250364/how-to-trim-a-file-extension-from-a-string-in-javascript
        baseName = baseName.split('.').slice(0, -1).join('.')
        
        //console.log(baseName)
        
        // Add README as '', and everything else as standard
        if (baseName.toUpperCase() == 'README') {
            files.push('')
        }
        else {
            files.push(baseName)
        }
    });

    return files
}

// pass in the folder relative to the folder docs
function genSideBarConfigFolder (titleName,directoryName) {
    const rawFilePaths = getFilesInDirBase(directoryName)
    console.log('The file Paths are')
    console.log(rawFilePaths)
    return [
        {
            title: titleName,
            collapsable: true,
            children: rawFilePaths
        }
    ]
}

// doesn't work, fix later, can't figure out how to generate { text: link:} recursively? Or maybe have another function that returns text: link 
 function genNavBarList() {
    const dirNames = getDirectories('docs')
    // navbar settings
    let navBarNames = [
    ];
    
    navBarNames.push(genNavBarItem('Home','/'))
    console.log(navBarNames)
    var numOfDirs = dirNames.length;
    for (var i = 0; i < numOfDirs; i++) {
        // not last entry
        let stringValue = dirNames[i].toString()
        let linkValue = '/'+stringValue+'/'
        console.log(stringValue)
        
        // @todo change loop to iterate for nested directories
        if (true) {
            navBarNames.push(genNavBarItem(stringValue,linkValue))
        }
        // last entry 
        else {
            //navBarNames = navBarNames + "{ text : \'" + stringValue + "\', " + "link: " + "\'/" + stringValue + "/\'}, \n";
        }
        /** Old console log tests
        console.log(navBarNames.toString())
        console.log("testing")
        console.log(util.inspect(navBarNames, {depth: null}))
        console.log(navBarNames)
        */
    }
    fs.writeFile("docs/.vuepress/configNavbarDirAuto.txt", util.inspect(navBarNames, {depth: null}), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("navbar list directory file is saved.");
}); 
    return  navBarNames
    
}

function genNavBarItem(textValue, linkValue) {
    return {
        text: textValue,
        link: linkValue
    }
}