const contacts = require('./contacts');

const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      try {
        const contactList = await contacts.listContacts();
        console.table(contactList);
      } catch (error) {
        console.log(error);
      }
      break;

    case 'get':
      try {
        const contact = await contacts.getContactById(id);
        console.log(contact);
      } catch (error) {
        console.log(error);
      }
      break;

    case 'add':
      try {
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
      } catch (error) {
        console.log(error);
      }
      break;

    case 'remove':
      try {
        await contacts.removeContact(id);
        console.log('Contact has been removed successfully');
      } catch (error) {
        console.log(error);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
