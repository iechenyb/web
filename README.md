1 create a new repository on the command line
echo "# BackServer" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:iechenyb/BackServer.git
git push -u origin master

2 push an existing repository from the command line
git remote add origin git@github.com:iechenyb/BackServer.git
git push -u origin master

3 import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.
