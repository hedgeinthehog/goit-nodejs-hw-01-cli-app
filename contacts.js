const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      const contacts = JSON.parse(data);

      return contacts;
  } catch (error) {
      error.message = "Couldn't get contacts"
      throw error;
  }
}

async function getContactById(contactId) {
  try {
		const contacts = await listContacts();
		const contact = contacts.find(contact => {
			const contactIdStringified = contact.id.toString();
			
			return contactIdStringified === contactId;
		});

    if (!contact) {
        throw new Error("No contact with such id")
    }

	  return contact;
  } catch (error) {
    throw(error)
  }
};

async function removeContact(contactId) {
	try {
		const contacts = await listContacts();

		const contactExists = contacts.find(contact => {
			const contactIdStringified = contact.id.toString();
			return contactIdStringified === contactId;
		});
	  if (!contactExists) {
      throw new Error("No contact with such id")
	  }

		const updatedContacts = contacts.filter(contact => {
			const contactIdStringified = contact.id.toString();
			return contactIdStringified !== contactId;
		});

	  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))
  } catch (error) {
	  throw error;
  }
}

async function addContact(name, email, phone) {
	const id = uuidv4();
	const newContact = { id, name, email, phone }
	
	try {
		const contacts = await listContacts();
		const updatedContacts = contacts.concat(newContact)

		await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))

		return newContact;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
}