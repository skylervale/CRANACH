# Contributing
Thank you for considering contributing to this project. It will help to make this project more valuable for the community.

We value any feedback and contributions whether it's a bug report, bugfix, additional feature or documentation. Please read this document, the [Pull Request Template][pullrequest] and the [LICENSE.md](/LICENSE.md) before submitting an issue or pull request to ensure that your contributions can be handled effectively.

## Code of Conduct

This Code of Conduct is adapted from the [Contributor Covenant][CoC], version 2.0, available at https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.

Community Impact Guidelines were inspired by [Mozilla's code of conduct enforcement ladder][mozilla]

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

### Our Standards

Examples of behavior that contributes to a positive environment for our community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience
* Focusing on what is best not just for us as individuals, but for the overall community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email address, without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a professional setting

### Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

Community leaders have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, and will communicate reasons for moderation decisions when appropriate.

### Scope

This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces. Examples of representing our community include using an official e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement at info@example.com. All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the reporter of any incident.

### Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct:

#### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing clarity around the nature of the violation and an explanation of why the behavior was inappropriate. A public apology may be requested.

#### 2. Warning

**Community Impact**: A violation through a single incident or series of actions.

**Consequence**: A warning with consequences for continued behavior. No interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, for a specified period of time. This includes avoiding interactions in community spaces as well as external channels like social media. Violating these terms may lead to a temporary or permanent ban.

#### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public communication with the community for a specified period of time. No public or private interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, is allowed during this period. Violating these terms may lead to a permanent ban.

#### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community standards, including sustained inappropriate behavior,  harassment of an individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within the community.

## Coding Conventions
The following conventions are mandatory for this project. Every code review and pull request must be checked to follow these conventions.

### Documentation
Each technology must be justified by an [ADR][adr] which also must be reviewed and discussed. This is needed to ensure that technologies are first evaluated before they will be used. Further documentation (if needed) should be placed at repository root level or - even better - integrated into the [README.md][readme]. Documentation must be written in Markdown to have a consistent documentation language.

### Commit messages
Please use the following template for commit messages which is derived from [template of the git project][commit]:

```
Short (50 chars or less) summary of changes

More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.  In some contexts, the first
line is treated as the subject of an email and the rest of
the text as the body.  The blank line separating the
summary from the body is critical (unless you omit the body
entirely); tools like rebase can get confused if you run
the two together.

Write your commit message in the imperative: "Fix bug" and not "Fixed bug"
or "Fixes bug."  This convention matches up with commit messages generated
by commands like git merge and git revert.

Further paragraphs come after blank lines.

- Bullet points are okay, too

- Typically a hyphen or asterisk is used for the bullet, followed by a
  single space, with blank lines in between, but conventions vary here
```

### Source Code
This project is a Node.js application and follows the [W3 Schools JavaScript Style Guide] [w3]. Any other language integrations must follow a widely acknowledged langauge convention or styleguide.

## Project folder structure

### /dev
Provides a frontend development container which uses the API and provides it's own buildchain.

### /docs
Artifacts and documents for Github, such as ADR in Markdown. 

### /files
Storage for persisted files when not using Docker. Although the Docker container uses it's own volume, to use the server without Docker the files folder is mandatory. The files are sorted in own folders by their size. The identifier is their name, which won't change.

### /modules
Contains server logic, separated as own files and modules, such as the colormapping.

### /node_modules
Just the typical node_modules folder, used by the server enviroment.

### /route
Contains the separate HTTP routes, for the API as well as the frontend.

### /scaffold
Source for images which can be used in the server enviroment with `npm run scaffold`. Images are loaded in from this folder.

### /view
Contains .ejs templates which are used for dynamic content.

### /web
Contains CSS/JS frontend files and can be used with a static route.

## Git Workflow
This project is following the Gitflow template. It's important to use the branches  dev, feature, hotfix and master properly. This project won't use a release branch since there is no difference between the dev system and the production system.

![Gitflow][gitflow]

### Merging and Pull Requests
Every merge in this project needs a pull request to be reviewed by at least another developer. Merge request should be used to check code quality and to learn about new features. Pull request should refer an issue if possible. For more information please view the [Pull Request Template][pullrequest].

## Issues
To be in line with the general convention of issues, please use the [Issue template][issue].

[gitflow]: https://nvie.com/img/git-model@2x.png
[CoC]: https://www.contributor-covenant.org/version/2/0/code_of_conduct/
[mozilla]: https://github.com/mozilla/diversity
[pullrequest]: /.github/pull_request_template.md
[issue]: /.github/ISSUE_TEMPLATE
[adr]: https://github.com/joelparkerhenderson/architecture_decision_record
[readme]: /README.md
[commit]: https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project
[w3]: https://www.w3schools.com/js/js_conventions.asp
