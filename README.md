# _Maps_

![gitlab](https://img.shields.io/gitlab/stars/gadelhati/maps-front?style=social "Gitlab")
![github](https://img.shields.io/github/stars/Instituto-Hidrografico/maps-front "Github")
![typescript](https://img.shields.io/badge/typescript-4.7-0076c6 "Typescript")
![node](https://img.shields.io/badge/node-18.8.0-75AC64 "Node")
![vscode](https://img.shields.io/badge/vscode-1.70.2-1E97E8 "Visual Studio Code")
<!-- ![java](https://img.shields.io/badge/java-18.0.2.1-0270B0 "Java JDK") -->
<!-- ![python](https://img.shields.io/badge/python-3.10.6-FFDC51 "Python") -->
<!-- ![intellij](https://img.shields.io/badge/intellij-2022.2.1-000000 "Visual Studio Code") -->

# Necessary Tech stack:

|   name            |file name version			|link for download
|:-----------------:|--------------------------:|:-----------------
|`typescript`       |                           |https://www.typescriptlang.org/
|`node`			    |node-v18.8.0-x64			|https://nodejs.org/en/
|`visual studio`	|VSCodeUserSetup-x64-1.70.2	|https://code.visualstudio.com/docs/?dv=win64user
<!-- |`intellij`         |idealC-2022.2.1            |https://download-cdn.jetbrains.com/idea/ideaIC-2022.2.1.exe -->
<!-- |`java`             |jdk-18_windows-x64_bin     |https://download.oracle.com/java/18/latest/jdk-18_windows-x64_bin.exe -->
<!-- |`python`           |python-3.10.6-amd64        |https://www.python.org/ftp/python/3.10.6/python-3.10.6-amd64.exe -->

# Description
Georeferenced information.

![Screenshot](https://github.com/gadelhati/maps-front/blob/master/screenshot.png "Screenshot")

## Roadmap
### in development
- [x] input group
- [x] extract all records in pdf
- [x] user: improve visual of add multiple roles

### in concept
- [ ] load privileges on role's form
- [ ] set combobox, turn with switch
- [ ] counter only increases by 1
- [ ] sidebar: personal icons
- [ ] context menu
- [ ] charts
- [ ] schedule
- [ ] breadcrumb
- [ ] input mask
- [ ] spinner with scrool to select number
- [ ] signature with mouse

## how to create this project
```
npm create vite@latest maps-front -- --template react-ts
```
## how to install dependencies for this project
```
npm install @types/react@latest react-router-dom @stitches/react axios react-error-boundary prop-types
npm install surge
```
## how to run this project
```
npm run dev
```
## how to build this project
```
npm run build
```

# Libraries
## visual, css in js
>[stitches](https://stitches.dev/)
## data fetching
<!-- >[react query](https://react-query.tanstack.com/) -->

>[graphql](https://graphql.org/)

<!-- >[uRQL](https://formidable.com/open-source/urql/) -->

## tests
>[testing-library](https://testing-library.com/docs/react-testing-library/intro/) : for unitary tests

>[cypress](https://www.cypress.io/)

# SVG Icons

> [SVG Icons](https://www.svgrepo.com/)

# Reference API download link

> [https://github.com/gadelhati/maps-back](https://github.com/gadelhati/maps-back)

# Reference API, running locally

> [http://localhost:8080/maps-back](http://localhost:8080/maps-back)

# Git

```
//ADD PROXY
git config --global http.proxy http://username:password@proxy:0000
//REMOVE PROXY
git config --global --unset http.proxy

//REPEAT THIS TWO COMMAND EVERY COMMIT, IF THERE ARE TROUBLE
git config --global gpg.program "C:\Users\<User_Name>\AppData\Local\GnuPG\bin\gpg.exe"
gpg --list-secret-keys --keyid-format=long

gpg --armor --export <xxxxxxxxxxxxxxxx>
git config --global user.signingkey <xxxxxxxxxxxxxxxx>


git config --global user.name "GadelhaTI"
git config --global user.email "gadelha.ti@gmail.com"

git remote add origin <>
git add archive.txt
git add .
git commit –m "comment commit"
git pull
git tag 1.1.0 <insert-commitID-here>
git push -u origin master
git diff
```
# Deploy
## Deploy in nginx
```
npx browserslist@latest --update-db
set -e
npm run build
npm run preview
service nginx stop
rm -rf /usr/share/nginx/html/<old-name>
cp /home/<user>/<application-name>.zip /usr/share/nginx/html/
unzip /usr/share/nginx/html/<application-name>.zip
chown nginx:nginx /usr/share/nginx/html/<application-name>
rm /usr/share/nginx/html/<application-name>.zip
service nginx start
```

### Edit /etc/nginx/conf.d/default.conf

Add the new code
```
location /<folder> {
    root    /usr/share/nginx/html;
    index   index.html  index.htm;
}
```
## Deploy in surge
```
surge
 >project: <path to /dist directory>
```
# Developers

> [Gadelha TI](https://github.com/gadelhati)
> [Lucas](https://github.com/lucassmartins)
> [Augusto](https://github.com/augustmat)
> [Diego](https://github.com/diegoferreirapinto)

# License

> [MIT License](https://choosealicense.com/licenses/mit/)
```
MIT License

Copyright (c) 2020 Jason Watmore

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
