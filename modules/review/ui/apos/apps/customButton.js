export default () => {
  apos.bus.$on('admin-menu-click', async (name) => {

    console.log('admin-menu-click received for button named: ', name);
    // Make sure it is the button we care about, leave others to their own handlers
    if (name !== 'customButton') {
      return;
    }
    // Add the code that needs to run when the button is clicked here
    console.log('The custom button was clicked!');
  });
};
