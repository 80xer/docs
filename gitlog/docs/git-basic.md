### Git 은 DVCS

![CVCS](http://i.stack.imgur.com/eqmGk.png)

![DVCS](http://i.stack.imgur.com/tRfgX.png)

### Git, Cygwin 설치

Git - [download](https://git-for-windows.github.io/)
Cygwin - [download](https://cygwin.com/install.html)

### Git 기본 사용 방법

#### git init : 리포지토리 초기화

```sh
    $ mkdir git-tutorial
    $ cd git-gutorial
    $ git init
    Initialized empty Git repository in /cygdrive/d/repos/git-tutorial/.git/
```

.git 폴더 생성됨.

#### git area

![Git area](http://i.stack.imgur.com/gmhK6.png)

#### git status : 리포지토리 상태 확인

```sh
    $ git status
    On branch master

    Initial commit

    nothing to commit (create/copy files and use "git add" to track)
```

##### README.md 파일 생성

```sh
    $ touch README.md
    $ git status
    On branch master

    Initial commit

    Untracked files:
      (use "git add <file>..." to include in what will be committed)

            README.md

    nothing added to commit but untracked files present (use "git add" to track)
```

#### git add : 스테이지 영역에 파일 추가

```sh
    $ git add README.md
    $ git status
    On branch master

    Initial commit

    Changes to be committed:
      (use "git rm --cached <file>..." to unstage)

            new file:   README.md
```

#### git commit : 리포지토리 변경 내용을 기록

```sh
    $ git commit -m "first commit"
    [master (root-commit) 87adc8d] first commit
     1 file changed, 0 insertions(+), 0 deletions(-)
     create mode 100644 README.md

     $ git status
    On branch master
    nothing to commit, working directory clean
```

#### git log : commit 확인

```sh
    $ git log
    commit 9b424bd2b773af603ea994822f7c26b8c1b4ea11
    Author: leetou <leetou@fnguide.com>
    Date:   Tue Feb 2 13:38:02 2016 +0900

        first commit

    $ git log -p
    commit 9b424bd2b773af603ea994822f7c26b8c1b4ea11
    Author: leetou <leetou@fnguide.com>
    Date:   Tue Feb 2 13:38:02 2016 +0900

        first commit

    diff --git a/README.md b/README.md
    new file mode 100644
    index 0000000..e69de29
```

#### git diff : 변경 내역 확인

README.md 파일에 입력

```markdown
# Git 튜토리얼
```

##### git diff 사용법

![](http://blog.interlinked.org/static/images/git/diff.png)

```sh
    $ git diff
    diff --git a/README.md b/README.md
    index e69de29..ac2a944 100644
    --- a/README.md
    +++ b/README.md
    @@ -0,0 +1 @@
    +# Git 튜토리얼

    $ git add .

    $ git diff --cached
    diff --git a/README.md b/README.md
    index e69de29..ac2a944 100644
    --- a/README.md
    +++ b/README.md
    @@ -0,0 +1 @@
    +# Git 튜토리얼

    $ git diff HEAD
    diff --git a/README.md b/README.md
    index e69de29..ac2a944 100644
    --- a/README.md
    +++ b/README.md
    @@ -0,0 +1 @@
    +# Git 튜토리얼

    $ git commit -m "Add index"
    [master 838fa4d] Add index
     1 file changed, 1 insertion(+)

    $ git log
    commit 838fa4dd846ef2d97a206c0875601838bec678b0
    Author: leetou <leetou@fnguide.com>
    Date:   Tue Feb 2 13:55:43 2016 +0900

        Add index

    commit 9b424bd2b773af603ea994822f7c26b8c1b4ea11
    Author: leetou <leetou@fnguide.com>
    Date:   Tue Feb 2 13:38:02 2016 +0900

        first commit
```

### Git Branch

![이런거..](https://www.tablix.org/~avian/blog/images2/2014/06/vesna_drivers_repository_branching_visualization.png)
![이런거..](https://www.tablix.org/~avian/blog/images2/2014/06/vesna_drivers_repository_branching_visualization_1.png)

![결국 이런거](http://wildlyinaccurate.com/assets/graph-branch-labels.png)

#### git branch : 브랜치 보기

```sh
    $ git branch
    * master
```

#### git checkout -b : 브랜치 생성, 변경

```sh
$ git checkout -b feature-A
Switched to a new branch 'feature-A'

$ git branch feature-A
$ git checkout feature-A

$ git branch
* feature-A
  master
```

README.md 파일 수정

```markdown
# Git 튜토리얼

* feature-A
```

```sh
$ git add README.md
$ git commit -m "add feature-A"
[feature-A 3af044f] add feature-A
 1 file changed, 1 insertion(+)

 $ git checkout master
Switched to branch 'master'

$ git checkout -
Switched to branch 'feature-A'
```

#### git merge : 브랜치 merge

```sh
$ git checkout master
$ git merge --no-ff feature-A
Merge made by the 'recursive' strategy.
 README.md | 1 +
 1 file changed, 1 insertion(+)
```

--no-ff 옵션으로 merge commit 메시지 작성을 위한 에디터가 실행된다.

```sh
$ git log --graph
*   commit 11105bdeb6d4bc091daa1bba30ef806b52a92379
|\  Merge: 838fa4d 3af044f
| | Author: leetou <leetou@fnguide.com>
| | Date:   Tue Feb 2 14:21:41 2016 +0900
| |
| |     Merge branch 'feature-A'
| |
| * commit 3af044f214d09ba4b9bd1689803fc3374614affe
|/  Author: leetou <leetou@fnguide.com>
|   Date:   Tue Feb 2 14:13:50 2016 +0900
|
|       add feature-A
|
* commit 838fa4dd846ef2d97a206c0875601838bec678b0
| Author: leetou <leetou@fnguide.com>
| Date:   Tue Feb 2 13:55:43 2016 +0900
|
|     Add index
|
* commit 9b424bd2b773af603ea994822f7c26b8c1b4ea11
  Author: leetou <leetou@fnguide.com>
  Date:   Tue Feb 2 13:38:02 2016 +0900

      first commit
```

![feature-A 브랜치 생성](https://raw.githubusercontent.com/80xer/ucert-study/master/gitlog/docs/images/1.JPG)

![feature-A 브랜치 머지](https://raw.githubusercontent.com/80xer/ucert-study/master/gitlog/docs/images/2.JPG)

![fix-B 브랜치 생성](https://raw.githubusercontent.com/80xer/ucert-study/master/gitlog/docs/images/3.JPG)

### Commit 변경하기

mege 이전으로 되돌리기

```sh
$ git reset --hard 838fa4
HEAD is now at 838fa4d Add index

$ git checkout -b fix-B
Switched to a new branch 'fix-B'
```

README.md 파일 수정

```markdown
# Git 튜토리얼

* fix-B
```

commit

```sh
$ git commit -am "fix B"
[fix-B 17be1c8] fix B
 1 file changed, 1 insertion(+)
```

merge 이후로 복원하기

```sh
$ git reflog
17be1c8 HEAD@{0}: commit: fix B
838fa4d HEAD@{1}: checkout: moving from master to fix-B
838fa4d HEAD@{2}: reset: moving to 838fa4
11105bd HEAD@{3}: merge feature-A: Merge made by the 'recursive' strategy.
838fa4d HEAD@{4}: checkout: moving from feature-A to master
3af044f HEAD@{5}: checkout: moving from master to feature-A
838fa4d HEAD@{6}: checkout: moving from feature-A to master
3af044f HEAD@{7}: checkout: moving from master to feature-A
838fa4d HEAD@{8}: checkout: moving from feature-A to master
3af044f HEAD@{9}: commit: add feature-A
838fa4d HEAD@{10}: checkout: moving from master to feature-A
838fa4d HEAD@{11}: commit: Add index
9b424bd HEAD@{12}: commit (amend): first commit
87adc8d HEAD@{13}: commit (initial): first commit

$ git reset --hard 11105bd
HEAD is now at 11105bd Merge branch 'feature-A'
```

fix-B 와 merge 하기

```sh
$ git merge --no-ff fix-B
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

README.md conflict

```
# Git 튜토리얼
<<<<<<< HEAD
 - feature-A
=======
 - fix-B
>>>>>>> fix-B
```

README.md conflict 해결

```
# Git 튜토리얼
 - feature-A
 - fix-B
```

commit

```sh
$ git commit -am "fix conflict"
[master b90c333] fix conflict
```

#### git commit --amend : commit 메시지 수정

```sh
$ git commit --amend
[master 5f1f3e2] Merge branch 'fix-B'
 Date: Tue Feb 2 15:03:12 2016 +0900

 $ git log --graph
*   commit 5f1f3e2c1f7309f417c3ee243f9ce3c13f7cc784
|\  Merge: 11105bd 17be1c8
| | Author: leetou <leetou@fnguide.com>
| | Date:   Tue Feb 2 15:03:12 2016 +0900
| |
| |     Merge branch 'fix-B'
| |
| * commit 17be1c8b3cabef49a7077d127f6027141240c7f7
| | Author: leetou <leetou@fnguide.com>
| | Date:   Tue Feb 2 14:46:56 2016 +0900
| |
| |     fix B
| |
* |   commit 11105bdeb6d4bc091daa1bba30ef806b52a92379
|\ \  Merge: 838fa4d 3af044f
| |/  Author: leetou <leetou@fnguide.com>
|/|   Date:   Tue Feb 2 14:21:41 2016 +0900
| |
| |       Merge branch 'feature-A'
| |
| * commit 3af044f214d09ba4b9bd1689803fc3374614affe
|/  Author: leetou <leetou@fnguide.com>
|   Date:   Tue Feb 2 14:13:50 2016 +0900
|
|       add feature-A
|
* commit 838fa4dd846ef2d97a206c0875601838bec678b0
| Author: leetou <leetou@fnguide.com>
| Date:   Tue Feb 2 13:55:43 2016 +0900
|
|     Add index
|
* commit 9b424bd2b773af603ea994822f7c26b8c1b4ea11
  Author: leetou <leetou@fnguide.com>
  Date:   Tue Feb 2 13:38:02 2016 +0900

      first commit
```

#### git rebase -i : commit 내역 조작

````sh
$ git checkout -b feature-C
Switched to a new branch 'feature-C'

    ```
    # Git 튜토리얼
     - feature-A
     - fix-B
     - featture-C
    ```

$ git commit -am 'add feature-C'
[feature-C 360f8bc] add feature-C
 1 file changed, 1 insertion(+)


    ```
    # Git 튜토리얼
     - feature-A
     - fix-B
     - feature-C
    ```

$ git commit -am 'fix typo'
[feature-C e5499ce] fix typo
 1 file changed, 1 insertion(+), 1 deletion(-)

$ git rebase -i HEAD~2
(Fix typo commit pick -> fixup)
[detached HEAD 62b3aae] add feature-C
 Date: Tue Feb 2 15:09:09 2016 +0900
 1 file changed, 1 insertion(+)
Successfully rebased and updated refs/heads/feature-C.

$ git checkout master
Switched to branch 'master'

$ git merge --no-ff feature-C
Merge made by the 'recursive' strategy.
 README.md | 1 +
 1 file changed, 1 insertion(+)
````

### 원격 리포지토리

#### 원격 리포지토리 생성

자체 git 서버 혹은 git 호스팅 서비스를 이용(github, gitlab, bitbucket 등)하여 원격 저장소를 생성한다.
README.md 를 생성하지 않는다.

원격저장소에 접근하기 위한 프로토콜중 https 를 이용.
로컬저장소에서 원격저장소의 https 주소를 등록한다.

```
    git remote add origin https://github.com/유저명/저장소명.git
```

#### 원격 리포지토리로 전송하기

#### 원격 리포지토리 받아오기

#### 원격 리포지토리 최신 내역 받아오기

참고 사이트
[pro git](http://git-scm.com/book/ko/v2) - 한글
[learn Branch](http://learnbranch.urigit.com/) - 한글
