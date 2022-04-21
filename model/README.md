# Instructions to push the local repository to Github
echo "# MLOps_app4" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/oscarzapi/MLOps_app4.git
git push -u origin main