<div align="center">
  <img src="https://raw.githubusercontent.com/apostrophecms/apostrophe/main/logo.svg" alt="ApostropheCMS logo" width="80" height="80">

  <h1>Apostrophe 3 Onboarding Project</h1>
  <p>
    <a aria-label="Apostrophe logo" href="https://v3.docs.apostrophecms.org">
      <img src="https://img.shields.io/badge/MADE%20FOR%20Apostrophe%203-000000.svg?style=for-the-badge&logo=Apostrophe&labelColor=6516dd">
    </a>
    <a aria-label="Join the community on Discord" href="http://chat.apostrophecms.org">
      <img alt="" src="https://img.shields.io/discord/517772094482677790?color=5865f2&label=Join%20the%20Discord&logo=discord&logoColor=fff&labelColor=000&style=for-the-badge&logoWidth=20">
    </a>
    <a aria-label="License" href="https://github.com/apostrophecms/blog/blob/main/LICENSE.md">
      <img alt="" src="https://img.shields.io/static/v1?style=for-the-badge&labelColor=000000&label=License&message=MIT&color=3DA639">
    </a>
  </p>
</div>

This repository is a companion to the [A3 web development tutorials](https://v3.docs.apostrophecms.org/tutorials/introduction.html) available on our documentation site. The series aims to offer a strong foundation for understanding and effectively utilizing ApostropheCMS.

Throughout these tutorials, we'll incrementally build a sample website using the Apostrophe 3 (A3) Essentials starter kit. This project serves as a learning tool, it is not intended as a plug-and-play template for your individual projects.

For each tutorial in the series, a new branch will be added to this repository containing all the changes from previous tutorials. You can follow along at your own pace. To switch to the relevant branch at the start of each tutorial, you can either use `git switch <branch-name>` on your local machine or examine the branch directly on GitHub.

### Getting Started Locally
1. Clone or fork and clone this repository.
2. Run `npm install` to install the necessary dependencies.
3. Add an admin user by running `node app @apostrophecms/user:add <user-name> admin`.
4. Whenever you switch to a new branch, remember to run `npm update`.

### About the Database Backup
The main branch includes a `database-backup` folder. This contains the final project database pre-populated with pieces and pages. Use `npm run copy-db` to copy this database to your local MongoDB server. 

⚠️ **Important Note**: Doing this will overwrite any existing database for this project, wiping out all your users. You'll need to re-create an admin user afterwards. 

> ⚠️ **Special Warning**: If you're following along with the tutorial and your project is named `a3-onboarding-project`, restoring this database will overwrite it. To avoid this, you can:
  - Change the `shortname` in the `app.js` file of this project.
  - Modify the "copy-db" script in `package.json`. The existing script is `mongorestore --gzip --nsFrom=onboarding-walkthrough.* --nsTo=a3-onboarding-project.* --drop --verbose --archive=./database-backup/onboarding`. Replace `--nsTo=a3-onboarding-project.*` with your new `shortname`.
  - This can also allow you to use this database in your personal project. Just modify the "copy-db" script to replace that same `--nsTo` with the shortname of your project, making sure to add `.*` at the end.

### Images and Attachments
The `main` branch also contains all the images used in the final site, located in `public/uploads/attachments`. You may copy these to your personal project if you decide to use this repository's database. A majority of these images are sourced from [Unsplash](https://unsplash.com), and a file named `unsplash-credit.json` is included to give credit to the authors.

## Table of Contents

| Branch | Description | Link |
|--------|-------------|------|
| sec2-1b | Project initiation using `apos create a3-onboarding-project`. | [Code Organization](https://v3.docs.apostrophecms.org/tutorials/code-organization.html)|
| sec2-2-pages | Creation of pages and template changes | [Creating Pages](https://v3.docs.apostrophecms.org/tutorials/pages.html) |
| sec2-3-assets | Addition of Bootstrap framework and other assets. | [Adding CSS and JS assets](https://v3.docs.apostrophecms.org/tutorials/assets.html) |
| sec2-4-widgets | Creation of a number of widgets for layout and content presentation. | [Creating Widgets](https://v3.docs.apostrophecms.org/tutorials/widgets.html) |
| sec2-5-pieces | Creation of the main `review` piece and methods for displaying pieces. | [Creating Pieces](https://v3.docs.apostrophecms.org/tutorials/pieces.html) |
| sec2-6-navigation | Addition of different types of navigation for pages and social links. | [Building Navigation](https://v3.docs.apostrophecms.org/tutorials/navigation.html) |
| sec2-7-ui-customization | Introduction to UI personalization. | [Configuring the Admin Bar](https://v3.docs.apostrophecms.org/tutorials/admin-ui.html) |
| sec2-8-adding-extensions | Exploration of the `SEO` and `Blog` extensions. | [Adding Extensions](https://v3.docs.apostrophecms.org/tutorials/adding-extensions.html) |