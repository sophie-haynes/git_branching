# Team Git Lab

Last week you made a repository on your own and pushed commits to it. This
week you'll work the way real teams do: **nobody edits `main` directly**.
Instead, work happens on branches and gets merged in through pull requests.

```
main   ──●────────────────────────────────●──   (releases only — protected)
          \                              /
dev        ●──────●──────────●──────────●       (the team's working copy)
                   \        /
feature-a           ●──●──●                     (one person, one job)
```

This repository comes with three branches already made for you:

| Branch      | What it's for                                         |
|-------------|-------------------------------------------------------|
| `main`      | The "released" version. You can't push to it directly. |
| `dev`       | Where the team's finished features are collected.      |
| `feature-a` | A finished feature, waiting to be merged into `dev`.   |
| `feature-b` | Another finished feature. It clashes with `feature-a`. |

Work through the tasks in order. Tick each one off as you go.

---

## Task 1 — Clone and look around

1. In VS Code: **Ctrl+Shift+P → Git: Clone → Clone from GitHub**, pick this
   repository, put it in your bootcamp folder, open it.
2. Open a terminal (**Ctrl+`**) and run:

   ```
   git branch -a
   ```

   You'll see `main` plus some `remotes/origin/...` branches. Those live on
   GitHub; you haven't got a local copy of them yet.

3. Run `node index.js` so you know what the project does.

**Think:** why does `git branch -a` show `origin/dev` but not just `dev`?

## Task 2 — Prove that main is protected

Try to break the rule. First, add a hello world console log to `index.js` then:
```
git add index.js
git commit -m "Editing main directly"
git push
```

GitHub should refuse the push. Read the error — it tells you why.

Now undo that commit so your `main` matches GitHub again:

```
git reset --hard origin/main
```

**Think:** why might a team *want* git to refuse that push?

## Task 3 — Get feature-a merged into dev

1. Switch to the finished feature:

   ```
   git checkout feature-a
   ```

   (git notices `origin/feature-a` exists and makes you a local copy.)

2. Open `index.js`. Look at what changed compared to `main`:

   ```
   git diff main
   ```

3. On GitHub, open a **Pull request**: base `dev` ← compare `feature-a`.
   Fill in the template. Merge it.

4. Back in VS Code, bring the merge down to your machine:

   ```
   git checkout dev
   git pull
   node index.js
   ```

## Task 4 — Your first merge conflict

`feature-b` changed the **same line** of `index.js` as `feature-a`. Git can't
guess which one you meant, so it will stop and ask you.

1. Switch to it: `git checkout feature-b`
2. Before opening a PR, a good habit is to pull `dev` into your branch so
   the PR is up to date:

   ```
   git merge dev
   ```

   You'll get `CONFLICT (content): Merge conflict in index.js`.

3. Run `git status`. It lists the file(s) that need fixing.
4. Open `index.js` in VS Code. Click **Resolve in Merge Editor**. You'll see
   *Incoming* (from `dev`) and *Current* (your branch). Decide what the final
   code should be — you can accept one side, or both, or hand-edit the
   *Result* pane. When it's right, click **Complete Merge**.

   If you'd rather do it by hand, the file looks like this:

   ```
   <<<<<<< HEAD
   your branch's version
   =======
   dev's version
   >>>>>>> dev
   ```

   Delete the markers and keep what you want.

5. Finish the merge:

   ```
   node index.js          # make sure it still runs!
   git add index.js
   git commit             # VS Code opens — save and close to accept the message
   git push
   ```

6. Now open a PR: base `dev` ← compare `feature-b`. GitHub will say it can
   be merged cleanly, because you already resolved the clash. Merge it.

**Think:** what would have happened if you'd opened the PR *without* merging
`dev` first?

## Task 5 — Main moves on without you

Real projects don't wait. Your lecturer will press a button that makes a new
commit appear on `main`. Your job is to notice, and bring it into `dev`:

```
git checkout dev
git fetch                 # ask GitHub what's new (changes nothing locally)
git log --oneline dev..origin/main    # commits on main that dev doesn't have
git merge origin/main
git push
```

`fetch` then `merge` is what `git pull` does in one go. Doing it in two steps
lets you look before you leap.

## Task 6 — Your own feature, start to finish

Now do the whole loop yourself, from scratch:

1. `git checkout dev` then `git pull` — always start from up-to-date `dev`.
2. `git checkout -b feature-yourname` — make and switch to a new branch.
3. Add yourself to the `team` array in `index.js`. Add a line to
   `CHANGELOG.md`.
4. Commit, then push. The first push needs to tell GitHub about the new
   branch:

   ```
   git push -u origin feature-yourname
   ```

5. Open a PR into `dev`. Get a teammate to review it. Merge.
6. Everyone: `git checkout dev && git pull`. Run `node index.js`. Is everyone
   on the list?

If two of you added yourselves on the same line, someone gets a conflict.
You know what to do now.

## Task 7 — Release

When `dev` is ready, it goes to `main` — through a PR, like everything else.

Open a PR: base `main` ← compare `dev`. Merge it. `main` has moved, and
nobody pushed to it directly.

---

## Cheat sheet

| I want to…                              | Command                              |
|-----------------------------------------|--------------------------------------|
| See my branches                         | `git branch` (`-a` includes remote)  |
| Switch branch                           | `git checkout name`                    |
| Make a new branch and switch to it      | `git checkout -b name`                 |
| See what's new on GitHub (no changes)   | `git fetch`                          |
| Bring another branch's commits into mine| `git merge other-branch`             |
| Fetch + merge in one                    | `git pull`                           |
| Push a brand-new branch                 | `git push -u origin name`            |
| Abandon a merge that's gone wrong       | `git merge --abort`                  |
| See which files are conflicted          | `git status`                         |
