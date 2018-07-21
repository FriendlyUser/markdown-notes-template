# Boostnote Vuepress Notes Repo

Although, boostnote is good for taking notes,it lacks wiki-like and search functionality, especically for large amounts of markdown files, in order to view the notes, you must first install boostnote, so it lacks portable.

Since both boostnote and vuepress are built on top of markdown-it, transferring the exported markdown content bewteen formats is simplifer than expected. Interesting, boostnote also uses stylus files, which are available in vuepress as well.

**Summary**

1. Clone or fork the repo
2. Create Boostnote storage in root
3. Modify navbar manually

## How to use 

Obviously, one must have boostnote installed, with the storage pointed to the download directory.

Additionally, vuepress must be installed globally.

```sh
npm install --global vuepress 
```

## What does template does

Running the python script `boostNote2MdGood.py` transfers notes from boostnote into a selected directory

```sh
python boostNote2MdGood.py -s notes -o docs
```

Automatic builds via gitlab, using a two stage pipeline, one can convert boostnote notes to vuepress documentation deployed to either gitlab pages or github pages or netlify.

### Vuepress Plugins 
VuePress currently uses the following markdown-it plugins:

- markdown-it-anchor
- markdown-it-container
- markdown-it-emoji
- markdown-it-table-of-contents
Its style files (apparently in Stylus format) are probably worth looking at, too.

### Boostnote plugins
The boostnote plugins that are different are most likely
- markdown-it-task-lists
- markdown-it-katex
- markdown-it-plantuml
- markdown-it-admonitions
- markdown-it-footnotes
- markdown-it-kbd (don't know official name)

##### Limitations
The markdown-it katex plugin is a few versions behind the latest katex version.

Transfering images from boostnote to vuepress may be challenging, but we will see how it goes.

Some plugins are missing such as markdown-it-footnote and markdown-it-kbd

Boostnote snippets are not transferred, simplish to fix.

A list of tasks and links, research completed in BoostNote

Can also write about how I tried out a lot of documentation formats, but boostnote + vuepress is a good combo.


#### Markdown-it plugins

* https://github.com/markdown-it/markdown-it-footnote

#### Todo

* Add chartjs support, based on boostnote support?
* Sample project configure for IOT, and other things.
* improve python script to work with snippets
* continuous deployment with gitlab
* Think about latex integration, probably best to export to html and then convert to latex, or remove the !!! through scripting. (replace !!! note) with a environment, etc .. (using [pandoc-admonition plugin](https://github.com/chdemko/pandoc-latex-admonition/wiki) is good) as long as the header is included, see 

##### References 

https://github.com/vuejs/vuepress/issues/613

Missing components

Use the package at 

https://github.com/johannbre/markdown-it-admonition

To match the boostnote style, I should be able to use both.

Same idea as https://www.npmjs.com/package/@iktakahiro/markdown-it-katex

and https://medium.com/@jonchurch/use-github-branch-as-dependency-in-package-json-5eb609c81f1a