# Lecturer setup (delete this file before students see it, or leave it — it's harmless)

## 1. Push this repo to GitHub

Create an empty repo on GitHub (no README, no .gitignore), then from this folder:

```
git remote add origin https://github.com/YOUR-ORG/bootcamp-git-template.git
git push -u origin --all
```

`--all` matters: it pushes `main`, `dev`, `feature-a` and `feature-b`.

## 2. Make it a template

Repo → **Settings → General** → tick **Template repository**.

When students (or you, for teams) click **Use this template → Create a new
repository**, they MUST tick **Include all branches**, otherwise they only
get `main` and Tasks 3–4 won't work. Worth saying out loud, twice.

## 3. Protect main — do this on the TEMPLATE, it copies across

Repo → **Settings → Rules → Rulesets → New ruleset → New branch ruleset**:

- Name: `Protect main`
- Enforcement: **Active**
- Target branches: **Add target → Include by pattern** → `main`
- Rules to tick:
  - ✅ Restrict deletions
  - ✅ Block force pushes
  - ✅ Require a pull request before merging (leave required approvals at 0
    — you want them merging their own PRs, and free accounts can't require
    reviews on private repos anyway)
- Bypass list: **Add bypass → Repository admin** — needed so YOU can still
  push in emergencies. Also add **GitHub Actions** if you want the
  "Main moves on" workflow to work (see below).

Rulesets copy into repos made from the template. Old-style "branch
protection rules" do NOT, which is why we use rulesets.

Free-plan caveat: rulesets are only enforced on **public** repos (or any
repo in an org on Team/Enterprise). If student repos are private on free
accounts the ruleset will exist but do nothing, and Task 2's push will
succeed. Public is fine for this lab — there's nothing in it.

## 4. The "Main moves on" button (Task 5)

`.github/workflows/main-moves-on.yml` adds a line to CHANGELOG.md on `main`
when you press **Actions → Main moves on → Run workflow**.

For it to get past the ruleset you need GitHub Actions in the bypass list
(step 3), and for it to run at all in the student's copy, someone with
access to that repo has to press the button — so for individual student
repos, each student presses it themselves ("pretend a teammate did this").
For team repos under GitHub Classroom you're an admin on all of them and
can press it yourself.

If you press it twice while a student has an uncommitted or unpushed edit
to the bottom of CHANGELOG.md, they get a conflict — useful if the Task 4
one went too smoothly.

## 5. Individual vs team repos

- **Individual**: students each use the template themselves. Tasks 1–5 and
  7 work solo; Task 6 is thin (they review their own PR).
- **Team (recommended for this session)**: use **GitHub Classroom**
  (classroom.github.com, free) → New assignment → Group assignment →
  pick this template. Classroom creates one repo per team and adds every
  member as a collaborator. Task 6 then produces real conflicts between
  real teammates.

## What's planted where

| Branch      | Diff from `dev`                                           |
|-------------|-----------------------------------------------------------|
| `feature-a` | `GREETING` → "Good morning", plus a CHANGELOG line        |
| `feature-b` | `GREETING` → "Hi there" (same line → conflict in index.js only) |

Merging `feature-a` into `dev` then `dev` into `feature-b` produces exactly
one conflicted file (`index.js`), one hunk. CHANGELOG.md merges cleanly.
