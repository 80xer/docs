# push multiple remote

```bash
$ git clone git@github.com:username/reponame.git
$ git remote -v
origin  git@github.com:username/reponame.git (fetch)
origin  git@github.com:username/reponame.git (push)
$ git config -l | grep '^remote\.'
remote.origin.url=git@github.com:username/reponame.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*

$ git remote add all git@github.com:username/reponame.git
$ git remote -v
all git@github.com:username/reponame.git (fetch)                  <-- ADDED
all git@github.com:username/reponame.git (push)                   <-- ADDED
origin  git@github.com:username/reponame.git (fetch)
origin  git@github.com:username/reponame.git (push)
$ git config -l | grep '^remote\.all'
remote.all.url=git@github.com:username/reponame.git               <-- ADDED
remote.all.fetch=+refs/heads/*:refs/remotes/all/*           <-- ADDED

$ git remote set-url --add --push all git@git.somesite.com:username/reponame.git
$ git remote -v
all git@github.com:username/reponame.git (fetch)
all git@git.somesite.com:username/reponame.git (push)                <-- CHANGED
origin  git@github.com:username/reponame.git (fetch)
origin  git@github.com:username/reponame.git (push)
$ git config -l | grep '^remote\.all'
remote.all.url=git@github.com:username/reponame.git
remote.all.fetch=+refs/heads/*:refs/remotes/all/*
remote.all.pushurl=git@git.somesite.com:username/reponame.git        <-- ADDED

$ git remote set-url --add --push all git@github.com:username/reponame.git
$ git remote -v
all git@github.com:username/reponame.git (fetch)
all git@git.somesite.com:username/reponame.git (push)
all git@github.com:username/reponame.git (push)                   <-- ADDED
origin  git@github.com:username/reponame.git (fetch)
origin  git@github.com:username/reponame.git (push)
$ git config -l | grep '^remote\.all'
remote.all.url=git@github.com:username/reponame.git
remote.all.fetch=+refs/heads/*:refs/remotes/all/*
remote.all.pushurl=git@git.somesite.com:username/reponame.git
remote.all.pushurl=git@github.com:username/reponame.git           <-- ADDED
```
